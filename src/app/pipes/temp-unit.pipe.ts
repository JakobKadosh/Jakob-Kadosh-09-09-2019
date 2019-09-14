import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempUnit'
})
export class TempUnitPipe implements PipeTransform {

  transform(value: any, isMetric,): any {
    if (!value || !value.Temperature) {
      return null;
    } 
    if (isMetric) {
      let v = value.Temperature.Metric.Unit;
      return v;
    }
    let v = value.Temperature.Imperial.Unit
    return v;
  
  }

}
