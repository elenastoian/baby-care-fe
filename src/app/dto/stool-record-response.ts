import { StoolConsistency } from "../model/stool-consistency-enum";

export class StoolRecordResponse {
    id: number;
    stoolTime: Date;
    consistency: StoolConsistency;
    comments: string;

    constructor(id: number, stoolTime: Date, consistency: StoolConsistency, comments: string) {
        this.id = id;
        this.stoolTime = stoolTime;
        this.consistency = consistency;
        this.comments = comments;
    }
}