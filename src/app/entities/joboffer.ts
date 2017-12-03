

import {CampChef, DistrictChef} from "./User";

export class Joboffer {
  constructor(
              public description: string,
              public begindate: string,
              public enddate: string,
              public contactnumber: number,
              public fieldOfWork: string,
              public salaryEstimate: number,
              public companyName: string,
              public companyAdress: string,
              public contactEmail: string,
              public contactName: string,
              public title: string,
              public districtchef?: DistrictChef,
              public campchef?: CampChef,
              public id?:number) {
  }
}
