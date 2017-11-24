import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { valueEqualCheckFn, valueEqualToCheckFn } from 'app/check-function';

import { returnErrorValidator, validatorsEnableIf, validatorsEnableIfRef } from './validator-enable-if';

@Component({
  selector: 'app-validator-enable-if',
  template: `
    <form [formGroup]="forms">
      <h2>ValidatorEnableIf</h2>
      .valid: {{ forms.valid | json }}<br>
      .errors: {{ forms.errors | json }}<br>
      <hr>
      <div>
        <h3>validatorsEnableIf([returnErrorValidator()], valueEqualCheckFn((string))('1'))</h3>
        .valid: {{ forms.controls.form1.valid | json }}<br>.errors: {{ forms.controls.form1.errors | json }}<br>
        <input formControlName="form1">
      </div>
      <hr>
      <div>
        <h3> validatorsEnableIfRef([Validators.email], valueEqualToCheckFn())([this.form1]))</h3>
        .valid: {{ forms.controls.form2.valid | json }}<br>.errors: {{ forms.controls.form2.errors | json }}<br>
        <input formControlName="form2" type="email">
      </div>
      <hr>
    </form>
  `,
  styleUrls: []
})
export class ValidatorEnableIfComponent {
  form1 = new FormControl(null, validatorsEnableIf([returnErrorValidator()], valueEqualCheckFn<string>('1')));
  forms = new FormGroup({
    form1: this.form1,
    form2: new FormControl(null, validatorsEnableIfRef([Validators.email], valueEqualToCheckFn())([this.form1])),
  });
}
