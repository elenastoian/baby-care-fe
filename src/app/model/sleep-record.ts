import { BabyCareTracker } from "./baby-tracker";

export class SleepRecord {
    id: number;
    sleepStart: Date;
    sleepEnd: Date;
    sleepDuration: number; // Duration in milliseconds
    tracker: BabyCareTracker;

    constructor(id: number, sleepStart: Date, sleepEnd: Date, sleepDuration: number, tracker: BabyCareTracker) {
        this.id = id;
        this.sleepStart = sleepStart;
        this.sleepEnd = sleepEnd;
        this.sleepDuration = sleepDuration;
        this.tracker = tracker;
    }
}