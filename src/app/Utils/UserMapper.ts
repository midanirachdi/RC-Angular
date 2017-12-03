import {User,Admin,CampChef,DistrictChef,Volunteer} from '../entities/User'


export function UserMapper(jsonUser:string):User{
    jsonUser=jsonUser.substr(1,jsonUser.length -2);
    let type=jsonUser.substr(0,jsonUser.indexOf(':'));
    let user:User=UserFactory(type);
    jsonUser=jsonUser.substr(jsonUser.indexOf(':')+1);
    user=JSON.parse(jsonUser);
    return user;
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