import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusText'
})
export class StatusTextPipe implements PipeTransform {

  transform(status: string) :string {
    switch (status) {
      case 'pending':
        return 'تحت المراجعه';
      case 'reviewed':
        return '  تمت المراجعه';
      case 'first acceptance':
        return '  قبول مبدئي';
      case 'final acceptance':
        return ' قبول نهائي';
      default:
        return ''
    }
  }

}
