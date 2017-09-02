import { AbstractControl, FormControl, FormGroup, FormArray, ValidationErrors } from '@angular/forms';

// from https://github.com/angular/angular/blob/4.3.6/packages/forms/src/validators.ts
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function isAllEmpty(c: AbstractControl): boolean {
  if (c instanceof FormControl) {
    return isEmptyInputValue(c.value);
  } else if (c instanceof FormGroup) {
    for (let key of Object.keys(c.controls)) {
      const cc: AbstractControl = c.controls[key];
      if (!isAllEmpty(cc)) {
        return false;
      }
    }
  } else if (c instanceof FormArray) {
    for (let i = 0; i < c.controls.length; i++) {
      const cc: AbstractControl = c.controls[i];
      if (!isAllEmpty(cc)) {
        return false;
      }
    }
  }
  return true;
}
/*
  if(cに属するFormControlのすべてが入力されていない) {
    return { validatorAny: true };
  } else {
    return null;
  }
*/
export function validatorAny(c: AbstractControl): ValidationErrors | null {
  return isAllEmpty(c) ? { validatorAny: true } : null;
}
