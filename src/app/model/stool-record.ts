import { BabyCareTracker } from "./baby-tracker";
import { StoolConsistency } from "./stool-consistency-enum";

export class StoolRecord {
    id: number;
    stoolTime: Date;
    consistency: StoolConsistency;
    comments: string;
    tracker: BabyCareTracker;

    constructor(id: number, stoolTime: Date, consistency: StoolConsistency, comments: string, tracker: BabyCareTracker) {
        this.id = id;
        this.stoolTime = stoolTime;
        this.consistency = consistency;
        this.comments = comments;
        this.tracker = tracker;
    }
}