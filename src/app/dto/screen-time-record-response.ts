export class ScreenTimeRecordResponse {
    id: number;
    screenTimeStart: Date;
    screenTimeEnd: Date;
    screenTimeDuration: string;
    comments: string;

    constructor(id: number, screenTimeStart: Date, screenTimeEnd: Date, screenTimeDuration: string, comments: string) {
        this.id = id;
        this.screenTimeStart = screenTimeStart;
        this.screenTimeEnd = screenTimeEnd;
        this.screenTimeDuration = screenTimeDuration;
        this.comments = comments;
    }
}