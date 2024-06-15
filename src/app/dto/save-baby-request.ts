import { SexEnum } from "../model/sex-senum";
import { TypeOfBirthEnum } from "../model/type-of-birth-enum";

export class SaveBabyRequest {
    name: string;
    dateOfBirth: Date;
    sex: SexEnum;
    weight: number;
    height: number;
    typeOfBirth: TypeOfBirthEnum;
    birthWeight: number;
    comments: string;

    constructor (name: string, dateOfBirth: Date, sex: SexEnum, 
        weight: number, height: number, typeOfBirth: TypeOfBirthEnum,
        birthWeight: number, comments: string
    ) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.weight = weight;
        this.height = height;
        this.typeOfBirth = typeOfBirth;
        this.birthWeight = birthWeight;
        this.comments = comments;
    }
}