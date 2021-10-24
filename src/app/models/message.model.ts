export class message
{
    userID?: string;
    channelID?: string;
    author: string;
    content: string;
    date_time: string;
    files: string;
    is_video: boolean
    constructor(author: string, content: string, date_time: string, userID?:string, channelID?: string, file?: string, is_video?: boolean)
    {
        this.author = author;
        this.content = content;
        this.date_time = date_time;
        this.userID = userID;
        this.channelID = channelID;
        this.files = file;
        this.is_video = is_video;
    }
}