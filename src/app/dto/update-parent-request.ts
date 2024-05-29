import { SexEnum } from "../model/sex-senum";

export class UpdateParentRequest {
    name: string;
    dateOfBirth: Date;
    sex: SexEnum;
    location: string;

    constructor(name: string, dateOfBirth: Date, sex: SexEnum, location: string) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.sex = sex;
        this.location = location;
    }
}