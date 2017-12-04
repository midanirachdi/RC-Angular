


export class Task{
    
    }
    
export class Topic{}

export class Comment{}

export class User{
    public id:number=0;
    public firstName:string="";
    public lastName:string="";
    public email:string="";
    public password:string="";
    public disable:boolean=false;
    public facebookId:string="";
    public birthDay:Date=null;
    public googleId:string=""
    public tasks?:Task[]=[];
    public comments?:Comment[]=[];
    public topics?:Topic[]=[];

    constructor(){

    }

    public setLastName(str:string){
        this.lastName=str;
    }

    public setFirstName(str:string){
        this.firstName=str;
    }

    public setId(i:number){
        this.id=i;
    }

    public setEmail(str:string){
        this.email=str;
    }
    public setFacebookId(str:string){
        this.facebookId=str;
    }

    public setPassword(str:string)
    {
        this.password=str;
    }

    public setDisable(o:boolean){
        this.disable=o;
    }


    public setGoogleId(str:string){
        this.googleId=str;
    }
    public getFullName():string{
        return this.firstName+' '+this.lastName;
    }

    public setBirthday(d:Date){
        this.birthDay=d;
    }

    public setTasks(t:Task[]){
        this.tasks=t;
    }

    public setComments(c:Comment[]){
        this.comments=c;
    }

    public setTopics(t:Topic[]){
        this.topics=t;
    }
}


export class Admin extends User{


}

export class DistrictChef extends User{
    
}

export class CampChef extends User{
    
}

export class Volunteer extends User{

}