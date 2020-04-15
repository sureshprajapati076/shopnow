import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 5, completeWords = false, ellipsis = '...') {
    if (completeWords == null || completeWords == undefined) return '';
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    return (value.length > limit) ? `${value.substr(0, limit)}${ellipsis}` : `${value.substr(0, limit)}`;
  }

}
