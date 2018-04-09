class BG {

    constructor(){
        this.count = 0;
        this.timestart = Math.floor(Date.now() / 1000);
        this.avg_min = 0;
    }

    snitch(){
        this.count++;
        this.avg_min = Math.floor((60 * this.count / (Math.floor(Date.now() / 1000) - this.timestart)) * 100) / 100;
        this.interval = Math.floor(((Math.floor(Date.now() / 1000) - this.timestart) / this.count) * 100) / 100;
        chrome.browserAction.setBadgeText({
            text: this.interval.toString()
        });
        chrome.browserAction.setBadgeBackgroundColor({
            color: 'green'
        });
    }

    tick(){
        this.count = 0;
        this.timestart = Math.floor(Date.now() / 1000);
        this.avg_min = 0;
    }

    static init(){
        let bg = new BG();
        let ionic = new Ionic('http://n.isan.pro:7070');
        ionic.boom('snitch_open', () => {bg.snitch();});
        setInterval(() => {bg.tick();}, 5 * 60 * 1000)
    }
}

$(function () {
   BG.init();
});