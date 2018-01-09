import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resume'
})
export class ResumePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.substring(0,10)+' ...';
  }

}
