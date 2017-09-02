
import { AbstractControl, FormControl, FormGroup, FormArray, ValidationErrors } from '@angular/forms';

// from https://github.com/angular/angular/blob/4.3.6/packages/forms/src/validators.ts
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

function isAllEmptyOrAllFull(c: AbstractControl, empty: boolean, full: boolean): boolean[] {
  if (empty && full) {
    return [true, true];
  }

  if (c instanceof FormControl) {
    if (isEmptyInputValue(c.value)) {
      return [true, full];
    }
    return [empty, true];
  } else if (c instanceof FormGroup) {
    let e: boolean = empty;
    let f: boolean = full;
    for (let key of Object.keys(c.controls)) {
      const cc: AbstractControl = c.controls[key];
      [e, f] = isAllEmptyOrAllFull(cc, e, f);
      if (e && f) {
        return [true, true];
      }
    }
    return [e, f];
  } else if (c instanceof FormArray) {
    let e: boolean = empty;
    let f: boolean = full;
    for (let i = 0; i < c.controls.length; i++) {
      const cc: AbstractControl = c.controls[i];
      [e, f] = isAllEmptyOrAllFull(cc, e, f);
      if (e && f) {
        return [true, true];
      }
    }
    return [e, f];
  }
}
/*
  if(cに属するFormControlのすべてが入力されていない
     or cに属するFormControlのすべてが入力されている) {
    return null;
  } else {
    return { validatorAllOrNotAny: true };
  }
*/
export function validatorAllOrNotAny(c: AbstractControl): ValidationErrors | null {
  let e: boolean;
  let f: boolean;
  [e, f] = isAllEmptyOrAllFull(c, false, false);
  return e && f ? { validatorAny: true } : null;
}
