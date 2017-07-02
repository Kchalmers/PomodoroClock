function Clock() {
    const self = this;
    this.minutesDom = $('#minutes');
    this.secondsDom = $('#seconds');
    this.mins = $('.mins');
    this.secs = $('.secs');
    let minutes = 0;
    let seconds = 0;
    let started = false;

    this.init = function () {
        $('.start').click(function(){
            self.start.apply(self);
        });
        $('.reset').click(function(){
            self.reset(parseInt(self.mins.val()), parseInt(self.secs.val()), false);
            self.updateDom();
        });
        $('.stop').click(function(){
            self.stop.apply(self);
        });
        self.minutesDom.append(self.mins.val());
        self.secondsDom.append(self.secs.val());
    };

    this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
        }, 1000);
    this.reset = function(mins, secs, status){
        minutes = mins;
        seconds = secs;
        started = status;
    };
    this.start = function() {
        if(self.minutesDom[0].innerHTML === self.mins.val()) {
            this.reset(parseInt(this.mins.val()), parseInt(this.secs.val()), true);
        }
        else {
            this.reset(minutes, seconds, true);
        }
    };
    this.stop = function(){
        this.reset(minutes, seconds, false);
        this.updateDom();
    };
    this.toDoubleDigit = function(num){
        if(num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    };
    this.updateDom = function(){
        this.minutesDom.text(this.toDoubleDigit(minutes));
        this.secondsDom.text(this.toDoubleDigit(seconds));
    };
    this.intervalCallback = function(){
        if(!started) return false;
        if(seconds === 0) {
            if(minutes === 0) {
                this.timerComplete();
                return;
            }
            seconds = 59;
            minutes--;
        } else {
            seconds--;
        }
        this.updateDom();
    };
    this.timerComplete = function(){
        started = false;
    }
}

$(document).ready(function() {
    timer = new Clock();
    timer.init();
});