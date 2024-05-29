import { SexEnum } from "../model/sex-senum";
import { TypeOfBirthEnum } from "../model/type-of-birth-enum";

export class GetAllBabiesResponse {
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
}