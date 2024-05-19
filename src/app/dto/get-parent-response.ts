import { SexEnum } from "../model/sex-senum";

export class GetParentResponse {
    id: number;
    name: string;
    dateOfBirth: Date;
    age: number;
    sex: SexEnum;
    location: string;

    constructor(id: number, name: string, dateOfBirth: Date, sex: SexEnum, location: string){
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.age = this.age;
        this.sex = sex;
        this.location = location;
    }
}