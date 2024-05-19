export class ResendConfirmationEmailRequest {

    email: string;
    result: boolean;

    constructor(email: string, result: boolean) {
        this.email = email;
        this.result = result;
    }
}