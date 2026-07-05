import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  onSnapshot, 
  setDoc
} from "firebase/firestore";
import { AppStore } from "./store";

const DEFAULT_FIREBASE_CONFIG = {
  projectId: "armazemfacil-b2292",
  appId: "1:688234941301:web:153e2ad3f634379fe3213c",
  apiKey: "AIzaSyA_ykhJGRklDbPuDNYooMlVvB2DeVzp2VE",
  authDomain: "armazemfacil-b2292.firebaseapp.com",
  firestoreDatabaseId: "(default)",
  storageBucket: "armazemfacil-b2292.appspot.com",
  messagingSenderId: "688234941301",
  measurementId: "G-6HFDEKWVDB"
};

let appInstance: any = null;
let firestoreInstance: any = null;
let lastUsedConfigStr = "";

export function getFirebaseClient() {
  const config = AppStore.getFirebaseConfig() || DEFAULT_FIREBASE_CONFIG;
  const configStr = JSON.stringify(config);

  if (firestoreInstance && lastUsedConfigStr === configStr) {
    return firestoreInstance;
  }

  try {
    console.log("[FirebaseClient] Inicializando ou atualizando cliente Firebase...");
    
    // Se a configuração mudou, limpamos a instância anterior para forçar recarga
    if (lastUsedConfigStr && lastUsedConfigStr !== configStr) {
      console.log("[FirebaseClient] Configuração do Firebase mudou. Limpando aplicativos antigos...");
      const apps = getApps();
      for (const app of apps) {
        deleteApp(app).catch(err => console.warn("[FirebaseClient] Erro ao deletar app antigo:", err));
      }
      appInstance = null;
      firestoreInstance = null;
    }

    const apps = getApps();
    if (apps.length > 0 && !appInstance) {
      appInstance = getApp();
    } else if (!appInstance) {
      appInstance = initializeApp({
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId
      });
    }

    // Crucial: Passar o firestoreDatabaseId para o getFirestore para que o cliente use a mesma base personalizada do servidor
    const dbId = config.firestoreDatabaseId || "(default)";
    firestoreInstance = getFirestore(appInstance, dbId);
    lastUsedConfigStr = configStr;
    return firestoreInstance;
  } catch (err) {
    console.error("Erro ao inicializar Firebase no cliente:", err);
    return null;
  }
}

export function subscribeToFirestore(
  onUpdate: (key: string, data: any[]) => void
): () => void {
  const db = getFirebaseClient();
  if (!db) {
    throw new Error("Firestore client not available");
  }

  const keys = [
    "users", "drivers", "vehicles", "products", "activeAssets", 
    "audits", "vales", "returnForecasts", "fiscalAlerts", 
    "importedRoutes", "audit_logs"
  ];

  const unsubscribes = keys.map((key) => {
    const docRef = doc(db, "app_state", key);
    return onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const payload = snap.data();
        if (payload && Array.isArray(payload.data)) {
          onUpdate(key, payload.data);
        }
      }
    }, (err) => {
      console.warn(`Erro no listener real-time do Firestore para a chave '${key}':`, err);
    });
  });

  return () => {
    unsubscribes.forEach((unsub) => unsub());
  };
}

export async function writeToFirestoreDirectly(key: string, data: any[]): Promise<boolean> {
  const db = getFirebaseClient();
  if (!db) return false;

  try {
    if (!Array.isArray(data)) {
      console.warn(`Ignorando escrita direta do Firestore para '${key}' pois os dados não são um array.`);
      return false;
    }
    const docRef = doc(db, "app_state", key);
    await setDoc(docRef, { data });
    return true;
  } catch (err) {
    console.error(`Erro ao salvar diretamente no Firestore para a chave '${key}':`, err);
    return false;
  }
}
