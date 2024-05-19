export class UserInfo{

    id: number;
    email: string;
    isAutheticated: boolean;

    constructor(id:number, email: string, isAutheticated: boolean){
        this.id = id;
        this.email = email;
        this.isAutheticated = isAutheticated;
    }
}