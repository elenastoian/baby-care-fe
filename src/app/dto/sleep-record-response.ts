export class SleepRecordResponse {
    id: number;
    sleepStart: Date; 
    sleepEnd: Date; 
    sleepDuration: string; 

    constructor(id: number, sleepStart: Date, sleepEnd: Date, sleepDuration: string) {
        this.id = id;
        this.sleepStart = sleepStart;
        this.sleepEnd = sleepEnd;
        this.sleepDuration = sleepDuration;
    }
}