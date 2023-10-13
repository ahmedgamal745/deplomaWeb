import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  addDiploma = new FormGroup({
    'diplomaName': new FormControl()
  })


onSubmit()
{
  console.log(this.addDiploma.value)
}
}
