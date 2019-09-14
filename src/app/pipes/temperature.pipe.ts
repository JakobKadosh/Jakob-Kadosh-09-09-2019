import { Pipe, PipeTransform } from '@angular/core';
import { CrudService } from 'src/shared/services/crud.service';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
constructor(private service:CrudService){}

  transform(value: any, isMetric): any {
    if (!value || !value.Temperature) {
      return null;
    }
    if (isMetric) {
      let v = value.Temperature.Metric.Value;
      return v;
    }
    let v = value.Temperature.Imperial.Value
    return v;
  }

}
