import { SexEnum } from "../model/sex-senum";

export class SaveParentResponse {
    id: number;
    name: string;
    dateOfBirth: Date;
    age: number;
    sex: SexEnum;
    location: string;
}