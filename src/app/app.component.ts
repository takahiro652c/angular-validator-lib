import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { validatorEqual } from './validator/equal.validator';
import { validatorAny } from './validator/any.validator';
import { validatorAllOrNotAny } from './validator/all-or-not-any.validator';
import { validatorSumMin, validatorSumMax } from "app/validator/sum.validator";

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form">
      <h2>Wrapper</h2>
      .valid: {{ form.valid | json }}<br>
      .errors: {{ form.errors | json }}<br>
      <hr>
      <div formGroupName="form1">
        <h3>validatorEqual</h3>
        .valid: {{ form.controls.form1.valid | json }}<br>.errors: {{ form.controls.form1.errors | json }}<br>
        <input formControlName="form1">
        <input formControlName="form2">
        <input formControlName="form3">
      </div>
      <hr>
      <div formGroupName="form2">
        <h3>validatorAny</h3>
        .valid: {{ form.controls.form2.valid | json }}<br>.errors: {{ form.controls.form2.errors | json }}<br>
        <input formControlName="form1">
        <input formControlName="form2">
        <input formControlName="form3">
      </div>
      <hr>
      <div formGroupName="form3">
        <h3>validatorAllOrNotAny</h3>
        .valid: {{ form.controls.form3.valid | json }}<br>.errors: {{ form.controls.form3.errors | json }}<br>
        <input formControlName="form1">
        <input formControlName="form2">
        <input formControlName="form3">
      </div>
      <hr>
      <div formGroupName="form4">
        <h3>validatorSumMin(5)</h3>
        .valid: {{ form.controls.form4.valid | json }}<br>.errors: {{ form.controls.form4.errors | json }}<br>
        <input formControlName="form1" type="number">
        <input formControlName="form2" type="number">
        <input formControlName="form3" type="number">
      </div>
      <hr>
      <div formGroupName="form5">
        <h3>validatorSumMax(10)</h3>
        .valid: {{ form.controls.form5.valid | json }}<br>.errors: {{ form.controls.form5.errors | json }}<br>
        <input formControlName="form1" type="number">
        <input formControlName="form2" type="number">
        <input formControlName="form3" type="number">
      </div>
      <hr>
      <div formGroupName="form6">
        <h3>validatorSumMin(5) & validatorSumMax(10)</h3>
        .valid: {{ form.controls.form6.valid | json }}<br>.errors: {{ form.controls.form6.errors | json }}<br>
        <input formControlName="form1" type="number">
        <input formControlName="form2" type="number">
        <input formControlName="form3" type="number">
      </div>
      <hr>
    </form>
  `,
  styleUrls: []
})
export class AppComponent {
  form = new FormGroup({
    form1: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, Validators.compose([validatorEqual])),
    form2: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, Validators.compose([validatorAny])),
    form3: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, Validators.compose([validatorAllOrNotAny])),
    form4: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, Validators.compose([validatorSumMin(5)])),
    form5: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, Validators.compose([validatorSumMax(10)])),
    form6: new FormGroup({
      form1: new FormControl(),
      form2: new FormControl(),
      form3: new FormControl(),
    }, Validators.compose([validatorSumMin(5), validatorSumMax(10)])),
  });
}
