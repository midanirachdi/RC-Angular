import {User,Admin,CampChef,DistrictChef,Volunteer} from '../entities/User'


export function UserMapper(jsonUser:string):User{
    jsonUser=jsonUser.substr(1,jsonUser.length -2);
    let type=jsonUser.substr(0,jsonUser.indexOf(':'));
    let user:User=UserFactory(type);
    jsonUser=jsonUser.substr(jsonUser.indexOf(':')+1);
    let userImg=JSON.parse(jsonUser);
    user=JSON.parse(jsonUser);


 
    return user;
}

function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
    obj[key] = value;
}

function UserFactory(typ:string):User{

    switch(typ)
    {
        case "Admin": return new Admin();
        case "CampChef": return new CampChef();
        case "DistrictChef": return new DistrictChef();
        case "Volunteer": return new Volunteer();
        default : return null;
    }

}


export function userWrapper(typ:string,json:any){
    let jsonStr=JSON.stringify(json);
  return "{\""+typ+"\":"+jsonStr+"}";
   
}