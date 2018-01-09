import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../services/course.service";
import {Course} from "../../../entities/course";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [DatePipe]

})
export class CoursesComponent implements OnInit {

  courses:Course[];
  courFound: Course = null;

  error = '';
  etat2 = false;

  courseForm = new FormGroup({
    nam: new FormControl('', Validators.required),
    descriptio: new FormControl('', Validators.required),
    startdat: new FormControl('', Validators.required),
    enddat: new FormControl('', Validators.required),

  });

  constructor(private cs:CourseService,private datePipe: DatePipe) { }

   ngOnInit() {
     this.cs.getAll().subscribe(
       (courses : Course[]) => {
         console.log(courses);
         this.courses = courses;
       },
       (error) => {
         this.error = error
       },
     );
   }

  getAllCourses() {
    this.cs.getAll().subscribe(
      (courses : Course[]) => {
         console.log(courses);
        this.courses = courses;
      },
      (error) => {
        this.error = error
      },
    );
  }

  onSubmit(){
    const newCourse = new Course(
      this.courseForm.value.nam,
      this.courseForm.value.descriptio,
      this.datePipe.transform(this.courseForm.value.startdat, 'yyyy-MM-dd'),
      this.datePipe.transform(this.courseForm.value.enddat, 'yyyy-MM-dd'));

    console.log(newCourse);
    if(this.courFound === null){
      console.log('triple');
      this.cs.add(newCourse).subscribe();
    }
    else{
      newCourse.id=this.courFound.id;
      this.cs.update(newCourse).subscribe();

    }

  }

  showUpdate(co: Course) {
    this.cs.getCourseById(co.id).subscribe(
      (course: Course) => {
        this.courFound = course;
         this.etat2 = !this.etat2;
        this.courseForm.setValue({
          'descriptio': this.courFound.description,
          'startdat': this.courFound.startdate,
          'enddat':this.courFound.enddate,
          'nam':this.courFound.name

        });
      }
    );
    console.log(this.courFound);
  }

  deleteCourse(c:Course){
    this.cs.delete(c).subscribe(
      resp=>this.courses=this.courses.filter(x => x.id !== c.id)
    )
  }

}
