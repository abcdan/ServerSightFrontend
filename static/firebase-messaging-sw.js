importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.2/firebase-messaging.js');
importScripts('./firebaseConfig.json');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
        .then(function(registration) {
            console.log('Registration successful, scope is:', registration.scope);
            // initInSw()
        }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
    });
}

firebase.initializeApp({
    apiKey: "AIzaSyD9-rDXwOVcD51EJvGebzZTXBxx16vfzj8",
    authDomain: "serversight-3f3c1.firebaseapp.com",
    projectId: "serversight-3f3c1",
    storageBucket: "serversight-3f3c1.appspot.com",
    messagingSenderId: "985131116272",
    appId: "1:985131116272:web:d1b5043b8b9cb170134435"
});

const messaging = firebase.messaging();

function displayNotification(payload) {
    self.registration.showNotification(payload.notification.title, {
        ...payload.notification,
        icon: '/favicon.png'
    });
}

messaging.onBackgroundMessage((payload) => {
    displayNotification(payload)
});
