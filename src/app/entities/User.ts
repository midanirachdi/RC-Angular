


export class Task{
    
    }
    
export class Topic{}

export class Comment{}

export class User{
    public id:number;
    public firstName:string;
    public lastName:string;
    public email:string;
    public password:string;
    public facebookId:string;
    public googleId:string
    public tasks:Task[];
    public comments:Comment[];
    public topics:Topic[];

    constructor(){}
    public getFullName():string{
        return this.firstName+' '+this.lastName;
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