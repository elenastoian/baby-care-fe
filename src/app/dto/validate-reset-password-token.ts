export class ValidatePasswordTokenRequest{
    id: number;
    token: string;
    result: boolean;

    constructor(id: number, token: string, result: boolean){
        this.id = id;
        this.token = token;
        this.result = result;
    }
}