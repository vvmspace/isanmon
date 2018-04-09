class Ionic{

    constructor(host = null){
        this.socket = io(Ionic.getHost(host));
        this.booms = [];
        this.socket.on('data', (data) => {this.receiver(data) });
    }

    static getHost(host){

        if(host)
            return host;

        let loc = new URL(window.location);
        if(loc.port)
            return 'http://' + loc.host;
        else
            return 'http://' + loc.host + ':7070';
    }

    receiver(data){
        if(typeof this.booms[data.event] === 'function'){
            let boom = this.booms[data.event];
            boom(data.data);
        }
    }

    boom(event, callback){
        this.booms[event] = callback;
    }

    impulse(event, data){
        this.socket.emit('data', {
            event: event,
            data: data
        });
    }

}