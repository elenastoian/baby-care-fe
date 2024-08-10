import { ParentModel } from "./parent";
import { SexEnum } from "./sex-senum";
import { SleepRecord } from "./sleep-record";
import { TypeOfBirthEnum } from "./type-of-birth-enum";

export class BabyModel {
    id: number;
    name: string;
    dateOfBirth: Date;
    age: string;
    sex: SexEnum;
    weight: number;
    height: number;
    typeOfBirth: TypeOfBirthEnum;
    birthWeight: number;
    comments: string;
    parent: ParentModel;
    sleepRecord: SleepRecord[];

    constructor(id:number, name:string, dateOfBirth: Date, age: string, sex: SexEnum, weight: number, height: number, typeOfBirth: TypeOfBirthEnum, birthWeight: number, comments: string, parent: ParentModel) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.sex = sex;
        this.weight = weight;
        this.height = height;
        this.typeOfBirth = typeOfBirth;
        this.birthWeight = birthWeight;
        this.comments = comments;
        this.parent = parent;
    }
}