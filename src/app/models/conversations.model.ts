export class Conversation {
    title: string;
    description: string;
    status : number;
    constructor(title: string, description: string, status: number){
        this.title = title;
        this.description = description;
        this.status = status;
    }
}