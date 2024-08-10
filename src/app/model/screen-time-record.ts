
export class ScreenTimeRecord {
    id: number;
    creationDate: Date;
    screenTimeStart: Date;
    screenTimeEnd: Date;
    screenTimeDuration: string;
    comments: string;

    constructor(id: number, creationDate: Date, screenTimeStart: Date, screenTimeEnd: Date, screenTimeDuration: string, comments: string) {
        this.id = id;
        this.creationDate = creationDate;
        this.screenTimeStart = screenTimeStart;
        this.screenTimeEnd = screenTimeEnd;
        this.screenTimeDuration = screenTimeDuration;
        this.comments = comments;
    }
}