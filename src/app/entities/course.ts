import {DistrictChef} from "./User";

export class Course{

  constructor(
                public name :string,
               public description :string,
               public startdate :string,
               public enddate :string,
                public districtchef?: DistrictChef,
                public id?:number
  // public userId?:number
  ){}

}

