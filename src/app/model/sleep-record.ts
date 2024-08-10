export class SleepRecord {
    id: number;
    creationDate: Date;
    sleepStart: Date;
    sleepEnd: Date;
    sleepDuration: number; // Duration in milliseconds

    constructor(id: number, creationDate: Date, sleepStart: Date, sleepEnd: Date, sleepDuration: number) {
        this.id = id;
        this.creationDate = creationDate;
        this.sleepStart = sleepStart;
        this.sleepEnd = sleepEnd;
        this.sleepDuration = sleepDuration;
    }
}