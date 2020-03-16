'use strict'

const publicVapidKey = "BP2QcLHZ6Enm6rYIIOS0ljex2106s8Zy822duCMVYz_3aV8iE2z0fYrIG5Y6zaE7DHH67Ti11bfFFq3AAoDWkUY";
const triggerPushBtn = document.querySelector(".trigger-push");
var isRegisteredPushNotification = false;


// var triggerPushNotification = async function () {
//     if ('serviceWorker' in navigator) {
//         navigator.serviceWorker.register('./service-worker.js', {
//             scope: '/'
//         })
//         .then((register) => {
//             console.log('register: ', register)
//             register = register.serviceWorker;
//                 register.pushManager.subscribe({
//                     userVisibleOnly: true,
//                     applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//                 })
//         }).then((subscription) => {
//             if (subscription) {
//                 isRegisteredPushNotification = true;
//             }
//             fetch('/subscribe', {
//                 method: "POST",
//                 body: JSON.stringify(subscription),
//                 headers: {
//                     "Content-Type": "application/json"
//                 }

//             })
//         })
//         .catch((e) => {
//             console.log('Subscribing error: ', e)
//         })
//         // .catch((e) => {
//         //     console.log('Register error: ', e)
//         // })
//     } else {
//         console.log('SW not supported')
//     }
// }
// var triggerSubscribe = async function (subscription) {
//     await fetch('/subscribe', {
//         method: "POST",
//         body: JSON.stringify(subscription),
//         headers: {
//             "content-type": "application/json"
//         }
//     }).catch((e) => {
//         console.log('Subscribing error: ', e)
//     })
//     isSubscribed = true;
// }
// var triggerUnsubscribe = async function (subscription) {
//     return await subscription.unsubscribe().catch((e) => {
//         console.log('Unsubscribing error ', e);
//     })
// }
// triggerPushBtn.addEventListener('click', () => {
//     // var subscription = register.pushManager.getSubscription();
//     // if(!subscription){
//     triggerPushNotification().then((response) => {
//         if (response)
//             console.log('Server response on click', response)
//     }).catch((error) => {
//         console.log(error)
//     })
//     // }else{
//     //      triggerUnsubscribe();
//     // }

// });


async function triggerPushNotification() {
    if ('serviceWorker' in navigator) {
      const register = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.error('Service workers are not supported in this browser');
    }
  }

  triggerPushBtn.addEventListener('click', () => {
    triggerPushNotification().catch(error => console.log(error));
  });

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}