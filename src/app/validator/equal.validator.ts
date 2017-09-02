import { AbstractControl, FormControl, FormGroup, FormArray, ValidationErrors } from '@angular/forms';

function isEqual(c: AbstractControl, value: any): [boolean, any] {
  if (c instanceof FormControl) {
    if (value === null) {
      return [true, c.value];
    } else if (value === c.value) {
      return [true, value];
    }
    return [false, value];
  } else if (c instanceof FormGroup) {
    let bool: boolean;
    let val: any = value;
    for (let key of Object.keys(c.controls)) {
      const cc: AbstractControl = c.controls[key];
      [bool, val] = isEqual(cc, val);
      if (!bool) {
        return [false, val];
      }
    }
    return [true, val];
  } else if (c instanceof FormArray) {
    let bool: boolean;
    let val: any = value;
    for (let i = 0; i < c.controls.length; i++) {
      const cc: AbstractControl = c.controls[i];
      [bool, val] = isEqual(cc, val);
      if (!bool) {
        return [false, val];
      }
    }
    return [true, val];
  }
}
/*
  if (cに属するFormControlのvalueがすべて等しい) {
    return null;
  } else {
    return { validatorEqual: true };
  }
*/
export function validatorEqual(c: AbstractControl): ValidationErrors | null {
  return isEqual(c, null)[0] ? null : { validatorEqual: true };
}
