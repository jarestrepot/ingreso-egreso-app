import { Pipe, PipeTransform } from '@angular/core';
import { IcomeEgress } from '@models/ingreso-egreso.model';


@Pipe({
  name: 'orderIcome',
  pure: true
})
export class OrderIcomePipe implements PipeTransform {

  transform(items: IcomeEgress[], property: keyof IcomeEgress, sortedReversed: boolean):IcomeEgress[] {
    const newItems = [...items];
    let response = newItems.sort((itemA, itemB) => {
      if( !property ){
        if (itemA.type === 'Egress') return -1;
        return 1;
      }else{
        const valueA = itemA[property];
        const valueB = itemB[property];

        if (valueA === null || valueA === undefined) return 1;
        if (valueB === null || valueB === undefined) return -1;

        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 1
      }
    });
    return sortedReversed ? ( response.reverse() ) : ( response );
  }

}
