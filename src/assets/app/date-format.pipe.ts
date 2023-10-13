import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string): string {
      const date = new Date(value); // Convert the input string to a Date object
      const day = date.getDate().toString().padStart(2, '0'); // Get the day with leading zero
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month with leading zero
      const year = date.getFullYear();
      
      return `${day}/${month}/${year}`; // Format the date as "dd/MM/yyyy"
    }
  }