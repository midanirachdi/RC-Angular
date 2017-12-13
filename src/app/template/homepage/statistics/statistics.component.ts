import { Component, OnInit } from '@angular/core';
import { RefugeesService } from '../../../services/refugees.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  height: string;
  width: string;

  constructor(private refugeesService: RefugeesService) { }

  FemaleRefugees: number;
  MaleRefugees: number;
  data: any;
  options: any;
  ngOnInit() {
    let a,b;
    this.refugeesService.getRefugeesPerGender('Male').subscribe((res: number) => (this.MaleRefugees = res , a = this.MaleRefugees, console.log(this.MaleRefugees),
    this.refugeesService.getRefugeesPerGender('Female').subscribe((r: number) => (this.FemaleRefugees = r , console.log(this.FemaleRefugees),   this.data = {
      labels: ['Males', 'Females'],
      datasets: [
          {
              data: [this.MaleRefugees, this.FemaleRefugees],
              backgroundColor: [
                  "#FF6384",
                  "#00bcd4"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#00bcd4"
              ]
          }]
      }
    ) )));

    this.options = {
      title: {
          display: true,
          text: 'Refugees/Gender',
          fontSize: 16
      },
      legend: {
          position: 'top'
      }
  };
  this.width = '900';
  this.height = '280';
  }

}
