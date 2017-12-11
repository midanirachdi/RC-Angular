import { Component, OnInit } from '@angular/core';
import { RefugeesService } from '../../../services/refugees.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private refugeesService: RefugeesService) { }

  FemaleRefugees: number;
  MaleRefugees: number;
  data: any;
  ngOnInit() {
    let a,b;
    this.refugeesService.getRefugeesPerGender('homme').subscribe((res: number) => (this.MaleRefugees = res , a = this.MaleRefugees, console.log(this.MaleRefugees),
    this.refugeesService.getRefugeesPerGender('femme').subscribe((r: number) => (this.FemaleRefugees = r , console.log(this.FemaleRefugees),   this.data = {
      labels: ['Male', 'Female'],
      datasets: [
          {
              data: [this.MaleRefugees, this.FemaleRefugees],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB"
              ]
          }]
      }
    ) )));
  }

}
