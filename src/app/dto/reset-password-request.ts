export class ResetPasswordRequest{

    userId: number;
    token: string;
    newPassword: string;
    result: boolean;

    constructor(userId: number, token: string, newPassword: string, result: boolean){
        this.userId = userId;
        this.token = token;
        this.newPassword = newPassword;
        this.result = result;
    }
}