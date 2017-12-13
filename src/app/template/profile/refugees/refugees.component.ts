import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { Refugee } from '../../../entities/refugee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RefugeesService } from '../../../services/refugees.service';

@Component({
  selector: 'app-refugees',
  templateUrl: './refugees.component.html',
  styleUrls: ['./refugees.component.css']
})
export class RefugeesComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  display: boolean = false;
  data: any;
  yearFilter: number;
  yearTimeout: any;
  sexe: SelectItem[];
  FemaleRefugees: number;
  MaleRefugees: number;
  idCurrentRefugee: number;
  name: string;
  refugees: Refugee[]= [];
  filtredRefugees: Refugee[]= [];
  refugee: Refugee = { 'firstname': null , 'lastName': null ,
                       'sex': null, 'dateOfBirth': null , 'nationality': null,
                       'frenchlanguageLevel': null , 'englishlanguageLevel': null,
                       'highestDegree': null , 'yearsOfExperience': 3 , 'email': null,
                       'fieldOfWork': null, 'adress' : null, 'phoneNumber': null, 'fiche' : null
                      };
  // Refugee Reactive form
  RefugeeAddForm= new FormGroup({
    firstname : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    sex : new FormControl('', Validators.required),
    dateOfBirth : new FormControl('', Validators.required),
    nationality : new FormControl('', Validators.required),
    phoneNumber : new FormControl('', [Validators.required , Validators.min(10000000), Validators.max(99999999999)]),
    email : new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private refugeesService: RefugeesService) {

  }

  ngOnInit() {
    let a;
    this.refugeesService.GetAllRefugees().subscribe((resp) => {console.log(resp); this.refugees = resp; this.filtredRefugees = resp; } );
  }

  DoAddRefugee() {
    this.refugee.firstname = this.RefugeeAddForm.value.firstname;
    this.refugee.lastName = this.RefugeeAddForm.value.lastName;
    this.refugee.sex = this.RefugeeAddForm.value.sex;
    this.refugee.dateOfBirth = this.RefugeeAddForm.value.dateOfBirth;
    this.refugee.phoneNumber = this.RefugeeAddForm.value.phoneNumber;
    this.refugee.nationality = this.RefugeeAddForm.value.nationality;
    this.refugee.email = this.RefugeeAddForm.value.email;
    this.refugeesService.AddRefugee(this.refugee).subscribe(
      () =>  {     this.refugees.push(Object.assign({}, this.refugee)); this.filtredRefugees.push(this.refugee);
      this.refugee = {'id': null , 'firstname': null , 'lastName': null , 'sex': null, 'dateOfBirth': null ,
        'nationality': null, 'frenchlanguageLevel': null , 'englishlanguageLevel': null, 'highestDegree': null ,
         'yearsOfExperience': 3 , 'email': null, 'fieldOfWork': null, 'adress' : null, 'phoneNumber': null, 'fiche' : null  };
    });
  }

  DoDeleteRefugee(r: Refugee) {
    this.refugeesService.delete(r).subscribe(
      (res) => { this.refugees = this.refugees.filter(x => x.id !== r.id); this.filtredRefugees = this.filtredRefugees.filter(x => x.id !== r.id);
      });
  }

  showDialog(r: Refugee) {
    this.display = true;
    this.idCurrentRefugee = r.id;
    this.RefugeeAddForm.setValue({
      'firstname' : r.firstname,
      'lastName' : r.lastName,
      'sex' : r.sex,
      'dateOfBirth' : r.dateOfBirth,
      'phoneNumber' : r.phoneNumber,
      'nationality' : r.nationality,
      'email' : r.email
    });
}

  DoUpdateRefugee(r: Refugee) {
    this.refugee.id = this.idCurrentRefugee;
    this.refugee.firstname = this.RefugeeAddForm.value.firstname;
    this.refugee.lastName = this.RefugeeAddForm.value.lastName;
    this.refugee.sex = this.RefugeeAddForm.value.sex;
    this.refugee.dateOfBirth = this.RefugeeAddForm.value.dateOfBirth;
    this.refugee.phoneNumber = this.RefugeeAddForm.value.phoneNumber;
    this.refugee.nationality = this.RefugeeAddForm.value.nationality;
    this.refugee.email = this.RefugeeAddForm.value.email;
    this.refugeesService.updateRefugee(this.refugee).subscribe();
    this.refugeesService.GetAllRefugees().subscribe((resp) => {this.refugees = resp; this.filtredRefugees = resp; } );
  }

  findRefugeesByName(event: any) {
    this.filtredRefugees = this.refugees.filter(x => x.firstname.toUpperCase().startsWith(event.target.value.toUpperCase()));
  }

}
