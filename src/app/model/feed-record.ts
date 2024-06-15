import { BabyCareTracker } from "./baby-tracker";
import { TypeOfFood } from "./type-of-food-enum";

export class FeedRecord {
    id: number;
    feedTime: Date;
    typeOfFood: TypeOfFood;
    comments: string;
    tracker: BabyCareTracker;

    constructor(id: number, feedTime: Date, typeOfFood: TypeOfFood, comments: string, tracker: BabyCareTracker) {
        this.id = id;
        this.feedTime = feedTime;
        this.typeOfFood = typeOfFood;
        this.comments = comments;
        this.tracker = tracker;
    }
}