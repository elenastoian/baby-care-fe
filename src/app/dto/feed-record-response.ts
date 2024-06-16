import { TypeOfFood } from "../model/type-of-food-enum";

export class FeedRecordResponse {
    id: number;
    feedTime: Date;
    typeOfFood: TypeOfFood;
    comments: string;

    constructor(id: number, feedTime: Date, typeOfFood: TypeOfFood, comments: string) {
        this.id = id;
        this.feedTime = feedTime;
        this.typeOfFood = typeOfFood;
        this.comments = comments;
    }
}