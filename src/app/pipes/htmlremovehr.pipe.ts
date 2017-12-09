import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlremovehr'
})
export class HtmlremovehrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let ind=value.indexOf("<hr>");
    if(ind==-1){
      return value;
    }
    let x = value.split("<hr>");
    value=x.join(" ");

    return value;

  }

}
