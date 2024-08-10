
import { TypeOfFood } from "./type-of-food-enum";

export class FeedRecord {
    id: number;
    creationDate: Date;
    feedTime: Date;
    typeOfFood: TypeOfFood;
    comments: string;

    constructor(id: number, creationDate: Date, feedTime: Date, typeOfFood: TypeOfFood, comments: string) {
        this.id = id;
        this.creationDate = creationDate;
        this.feedTime = feedTime;
        this.typeOfFood = typeOfFood;
        this.comments = comments;
    }
}