import { ParentModel } from "./parent";
import { SexEnum } from "./sex-senum";
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
}