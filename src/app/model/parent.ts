import { BabyModel } from "./baby";
import { SexEnum } from "./sex-senum";

export class ParentModel {

    id: number;
    name: string;
    dateOfBirth: Date;
    age: number;
    sex: SexEnum;
    location: string;
    userId: number;
    baby: BabyModel;

    constructor(
         id: number,
         name: string,
         dateOfBirth: Date,
         age: number,
         sex: SexEnum,
         location: string,
         userId: number,
         baby: BabyModel
      ) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.sex = sex;
        this.location = location;
        this.userId = userId;
        this.baby = baby;
      }
}