import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlSlice'
})
export class HtmlSlicePipe implements PipeTransform {

  transform(value: any, args?: any): any {
   let ind=value.indexOf("<hr>");
    if(ind==-1){
      return value;
    }
    let x = value.split("<hr>");
    value=x[0];

    return value;
  }

}
