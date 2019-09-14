import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forcasts'
})
export class ForcastsPipe implements PipeTransform {

  transform(value: any,isMetric): any {
    if (!value || !value.Value) {
      return null;
    }
    if(isMetric) {
      let v = Math.floor((value.Value-32)*5/9);
      return v;
    }
    return value.Value;
  
  }

}
