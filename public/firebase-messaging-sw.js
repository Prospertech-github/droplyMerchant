importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAbHVc_q_iC7-FQ21ftPVyMQ1UJeIeSG20",
  authDomain: "droply-b7488.firebaseapp.com",
  projectId: "droply-b7488",
  storageBucket: "droply-b7488.appspot.com",
  messagingSenderId: "277833598128",
  appId: "1:277833598128:web:9127791e69fe87105d6775",
  measurementId: "G-TYFB99RYLL",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
