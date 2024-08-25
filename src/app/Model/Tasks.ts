export class Tasks {
    public Id: number;
    public name : string;
    public description : string;
    public completed : boolean;
    public UserName : string;
    public UserId : string;

    constructor(){
        this.Id = 0;
        this.name =""
        this.description = "";
        this.completed = false;
        this.UserName = "";
        this.UserId = ""
    }
}