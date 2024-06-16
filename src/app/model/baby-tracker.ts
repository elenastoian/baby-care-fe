import { BabyModel } from "./baby";
import { FeedRecord } from "./feed-record";
import { SleepRecord } from "./sleep-record";
import { StoolRecord } from "./stool-record";

export class BabyCareTracker {
    id: number;
    date: Date;
    sleepRecords: SleepRecord[] = [];
    stoolRecords: StoolRecord[] = [];
    feedRecords: FeedRecord[] = [];
    baby: BabyModel;

    constructor(id: number, date: Date, sleepRecords: SleepRecord[], stoolRecords: StoolRecord[], feedRecords: FeedRecord[], baby: BabyModel) {
        this.id = id;
        this.date= date;
        this.sleepRecords = sleepRecords;
        this.stoolRecords = stoolRecords;
        this.feedRecords = feedRecords;
        this.baby = baby;
    }
}