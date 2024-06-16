import { FeedRecordResponse } from "./feed-record-response";
import { SleepRecordResponse } from "./sleep-record-response";
import { StoolRecordResponse } from "./stool-record-response";

export class BabyCareTrackerResponse {
    id: number;
    date: Date;
    sleepRecords: SleepRecordResponse[] = [];
    stoolRecords: StoolRecordResponse[] = [];
    feedRecords: FeedRecordResponse[] = [];
}