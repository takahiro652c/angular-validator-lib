import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { validatorAllOrNotAny, validatorAny, validatorEqual, validatorSumMax, validatorSumMin } from './group-validator';

@Component({
  selector: 'app-group-validator',
  template: `
    <form [formGroup]="forms">
      <h2>GroupValidator</h2>
      .valid: {{ forms.valid | json }}<br>
      .errors: {{ forms.errors | json }}<br>
      <hr>
      <div formGroupName="form1">
        <h3>validatorEqual</h3>
        .valid: {{ forms.controls.form1.valid | json }}<br>.errors: {{ forms.controls.form1.errors | json }}<br>
        <input formControlName="form1">
        <input formControlName="form2">
        <input formControlName="form3">
      </div>
      <hr>
      <div formGroupName="form2">
        <h3>validatorAny</h3>
        .valid: {{ forms.controls.form2.valid | json }}<br>.errors: {{ forms.controls.form2.errors | json }}<br>
        <input formControlName="form1">
        <input formControlName="form2">
        <input formControlName="form3">
      </div>
      <hr>
      <div formGroupName="form3">
        <h3>validatorAllOrNotAny</h3>
        .valid: {{ forms.controls.form3.valid | json }}<br>.errors: {{ forms.controls.form3.errors | json }}<br>
        <input formControlName="form1">
        <input formControlName="form2">
        <input formControlName="form3">
      </div>
      <hr>
      <div formGroupName="form4">
        <h3>validatorSumMin(5)</h3>
        .valid: {{ forms.controls.form4.valid | json }}<br>.errors: {{ forms.controls.form4.errors | json }}<br>
        <input formControlName="form1" type="number">
        <input formControlName="form2" type="number">
        <input formControlName="form3" type="number">
      </div>
      <hr>
      <div formGroupName="form5">
        <h3>validatorSumMax(10)</h3>
        .valid: {{ forms.controls.form5.valid | json }}<br>.errors: {{ forms.controls.form5.errors | json }}<br>
        <input formControlName="form1" type="number">
        <input formControlName="form2" type="number">
        <input formControlName="form3" type="number">
      </div>
      <hr>
      <div formGroupName="form6">
        <h3>validatorSumMin(5) & validatorSumMax(10)</h3>
        .valid: {{ forms.controls.form6.valid | json }}<br>.errors: {{ forms.controls.form6.errors | json }}<br>
        <input formControlName="form1" type="number">
        <input formControlName="form2" type="number">
        <input formControlName="form3" type="number">
      </div>
      <hr>
    </form>
  `,
  styleUrls: []
})
export class GroupValidatorComponent {
  forms = new FormGroup({
    form1: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, validatorEqual),
    form2: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, validatorAny),
    form3: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, validatorAllOrNotAny),
    form4: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, validatorSumMin(5)),
    form5: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, validatorSumMax(10)),
    form6: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, Validators.compose([validatorSumMin(5), validatorSumMax(10)])),
  });
}
