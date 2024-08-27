import { initializeApp } from "firebase/app";
import {
  getMessaging,
  onMessage,
  isSupported,
  getToken,
} from "firebase/messaging";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAbHVc_q_iC7-FQ21ftPVyMQ1UJeIeSG20",
  authDomain: "droply-b7488.firebaseapp.com",
  projectId: "droply-b7488",
  storageBucket: "droply-b7488.appspot.com",
  messagingSenderId: "277833598128",
  appId: "1:277833598128:web:9127791e69fe87105d6775",
  measurementId: "G-TYFB99RYLL",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function getFirebaseToken(): Promise<string | undefined> {
  if (await isSupported()) {
    return await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
  }
}

onMessage(messaging, (payload) => {
  toast.info(payload.notification?.body || "");
});

export { app, messaging, getFirebaseToken };
