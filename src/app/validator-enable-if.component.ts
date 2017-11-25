import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

import { valueEqualCheckFn, valueEqualToCheckFn } from './check-function';
import {
  validatorCheck,
  validatorCheckRef,
  validatorCheckRefLazy,
  validatorsEnableIf,
  validatorsEnableIfRef,
  validatorsEnableIfRefLazy
} from './validator-enable-if';

@Component({
  selector: 'app-validator-enable-if',
  template: `
    <form [formGroup]="forms">
      <h2>ValidatorEnableIf</h2>
      .valid: {{ forms.valid | json }}<br>
      .errors: {{ forms.errors | json }}<br>
      <hr>
      <div>
        <h3>validatorCheck(valueEqualCheckFn((number))(1))</h3>
        .valid: {{ forms.controls.form1.valid | json }}<br>.errors: {{ forms.controls.form1.errors | json }}<br>
        <input formControlName="form1" type="number">
      </div>
      <hr>
      <div>
        <h3>validatorCheckRef(valueEqualToCheckFn(), [this.form1])</h3>
        .valid: {{ forms.controls.form2.valid | json }}<br>.errors: {{ forms.controls.form2.errors | json }}<br>
        <input formControlName="form2" type="number">
      </div>
      <hr>
      <div>
        <h3>validatorCheckRefLazy(valueEqualToCheckFn())([this.form2])</h3>
        .valid: {{ forms.controls.form3.valid | json }}<br>.errors: {{ forms.controls.form3.errors | json }}<br>
        <input formControlName="form3" type="number">
      </div>
      <hr>
      <div>
        <h3>validatorsEnableIf(Validators.maxLength(3), this.checkFn4)</h3>
        .valid: {{ forms.controls.form4.valid | json }}<br>.errors: {{ forms.controls.form4.errors | json }}<br>
        <input formControlName="form4">
      </div>
      <hr>
      <div>
        <h3>
          validatorsEnableIfRef(
            Validators.maxLength(5),
            this.checkFn5,
            [this.form1, this.form2, this.form3, this.form4]
          )
        </h3>
        .valid: {{ forms.controls.form5.valid | json }}<br>.errors: {{ forms.controls.form5.errors | json }}<br>
        <input formControlName="form5">
      </div>
      <hr>
      <div>
        <h3>validatorsEnableIfRefLazy([Validators.required, Validators.email], valueEqualToCheckFn())([this.form5])</h3>
        .valid: {{ forms.controls.form6.valid | json }}<br>.errors: {{ forms.controls.form6.errors | json }}<br>
        <input formControlName="form6" type="email">
      </div>
      <hr>
    </form>
  `,
  styleUrls: []
})
export class ValidatorEnableIfComponent {
  form1 = new FormControl(null, validatorCheck(valueEqualCheckFn<number>(1)));
  form2 = new FormControl(null, validatorCheckRef(valueEqualToCheckFn(), [this.form1]));
  validatorLazy3 = validatorCheckRefLazy(valueEqualToCheckFn());
  form3 = new FormControl(null, this.validatorLazy3([this.form2]));
  form4 = new FormControl(null, validatorsEnableIf(Validators.maxLength(3), this.checkFn4));
  form5 = new FormControl(
    null,
    validatorsEnableIfRef(
      Validators.maxLength(5),
      this.checkFn5,
      [this.form1, this.form2, this.form3, this.form4]
    )
  );
  validatorLazy6 = validatorsEnableIfRefLazy([Validators.required, Validators.email], valueEqualToCheckFn());
  form6 = new FormControl(null, this.validatorLazy6([this.form5]));
  forms = new FormGroup({
    form1: this.form1,
    form2: this.form2,
    form3: this.form3,
    form4: this.form4,
    form5: this.form5,
    form6: this.form6,
  });

  checkFn4(c: AbstractControl, refs: AbstractControl[]): boolean {
    return c.value === 'hoge';
  }

  checkFn5(c: AbstractControl, refs: AbstractControl[]): boolean {
    for (let i = 0; i < refs.length; i++) {
      const value = refs[i].value;
      if (value == null || value === '') {
        return false;
      }
    }
    return true;
  }
}
