class Timer{
    constructor(){
        this.timer = 0;
        this.lastTimeStamp = 0;
    }

    TimeSplit(timeStamp){
        let timeSplit = timeStamp - this.lastTimeStamp;
        this.lastTimeStamp = timeStamp;
        this.timer += timeSplit;
        return timeSplit;
    }

    Time(){
        return this.timer;
    }

    TimeInSeconds(){
        return this.timer / 1000;
    }

    Reset(){
        this.timer = 0;
    }
}