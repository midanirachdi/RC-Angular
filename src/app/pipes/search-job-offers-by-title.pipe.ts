import { Pipe, PipeTransform } from '@angular/core';
import {Joboffer} from "../entities/joboffer";

@Pipe({
  name: 'searchJobOffersByTitle'
})
export class SearchJobOffersByTitlePipe implements PipeTransform {

  transform(value: Joboffer[], titleToSearch: string): any {
    if (titleToSearch == null)
      return value;

    return value.filter(
      obj =>
        obj.title.toLowerCase().indexOf(titleToSearch.toLowerCase()) !== -1
    );
  }

}
