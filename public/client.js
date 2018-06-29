const publicVapidKey = 'BNK3SAHxzZeNn9UrGmMTj5hgEKN9Tltc2CVTyVWHf_bh-yAHHo3FUCeK_TJpS1z8u_FjLnqITYEvub-9h7fBgUc';

if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

//Register SW,register push,send push
async function send() {

    //Register SW

    console.log('Registering SERVICE WORKER..');
    const register = await navigator.serviceWorker.register('worker.js',{
        scope:'/'
    });

    console.log('Service Worker Registered');


    //Register push
    console.log('Registering Push')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey:urlBase64ToUint8Array(publicVapidKey)
    })
   console.log('Push Registered');


   //sending push notification
   console.log('Sending Push...');
   await fetch('/notification',{
       method:'POST',
       body:JSON.stringify(subscription),
       headers:{
           'content-type':'application/json'
       }
   });
   console.log('PUSH SET...')
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
