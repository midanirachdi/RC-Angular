import { Component, OnInit } from '@angular/core';
import { RefugeesService } from '../../../services/refugees.service';

@Component({
  selector: 'app-statistics-age',
  templateUrl: './statistics-age.component.html',
  styleUrls: ['./statistics-age.component.css']
})
export class StatisticsAgeComponent implements OnInit {
  bebe: number; enfant: number; ado: number; adulte: number; agee: number;
  data: any;
  options: any;
  constructor(private refugeesService: RefugeesService) { }

  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.refugeesService.getRefugeesPerAge().subscribe((res) => ( console.log(res), this.bebe = res[0], this.enfant = res[1], this.ado = res[2], this.adulte = res[3], this.agee = res[4],
      this.data = {
        labels: ['bebe', 'enfant', 'ado', 'adulte', 'agee'],
        datasets: [
            {
                data: [
                  this.bebe,
                  this.enfant,
                  this.ado,
                  this.adulte,
                  this.agee],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#00bcd4',
                    '#322B4E'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#00bcd4',
                    '#322B4E'
                ]
            }]
  }));
  this.options = {
    title: {
        display: true,
        text: 'Refugees/Age',
        fontSize: 16
    },
    legend: {
        position: 'top'
    }
};
}

}
