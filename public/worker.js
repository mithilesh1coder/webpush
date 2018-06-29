console.log('SERVICE WORKER LOADED...');

self.addEventListener('push', e => {
    const data = e.data.json();

    console.log('Push RECIEVED');
    self.registration.showNotification(data.title,{
        body:'Notified By Mithilesh',
        icon:'https://cdn3.iconfinder.com/data/icons/brain-games/1042/Puzzle.png'
    });
})