import { SexEnum } from "./sex-senum";

export class  ParentRegistrationForm {
    name: string;
    dateOfBirth: Date;
    sex: SexEnum;
    location: string;

    constructor(name: string,
        dateOfBirth: Date,
        sex: SexEnum,
        location: string
    ) {
        this.name = name,
        this.dateOfBirth = dateOfBirth,
        this.sex = sex,
        this.location = location
    }
}