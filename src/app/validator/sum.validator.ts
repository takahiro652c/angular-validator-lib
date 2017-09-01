import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// from https://github.com/angular/angular/blob/4.3.6/packages/forms/src/validators.ts
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}
/*
  FormGroupで使うvalidator
  if (FormGroupに属するFormControlのvalueの合計値 < min) {
    return { validatorSumMin: true };
  } else {
    return null;
  }
*/
export function validatorSumMin(min: number): ValidatorFn {
  if (isEmptyInputValue(min)) {
    return (fg: FormGroup): ValidationErrors | null => null;
  }
  return (fg: FormGroup): ValidationErrors | null => {
    let sum: number = 0;
    for (let key in fg.controls) {
      if (fg.controls.hasOwnProperty(key)) {
        const fc: FormControl = <FormControl>fg.controls[key];
        if (!isEmptyInputValue(fc.value)) {
          const value = parseFloat(fc.value);
          if (isNaN(value)) {
            return { validatorSumMin: true };
          }
          if ((sum += value) >= min) {
            return null;
          }
        }
      }
    }
    return { validatorSumMin: true };
  }
}

/*
  FormGroupで使うvalidator
  if (FormGroupに属するFormControlのvalueの合計値 > max) {
    return { validatorSumMax: true };
  } else {
    return null;
  }
*/
export function validatorSumMax(max: number): ValidatorFn {
  if (isEmptyInputValue(max)) {
    return (fg: FormGroup): ValidationErrors | null => null;
  }
  return (fg: FormGroup): ValidationErrors | null => {
    let sum: number = 0;
    for (let key in fg.controls) {
      if (fg.controls.hasOwnProperty(key)) {
        const fc: FormControl = <FormControl>fg.controls[key];
        if (!isEmptyInputValue(fc.value)) {
          const value = parseFloat(fc.value);
          if (isNaN(value)) {
            return { validatorSumMax: true };
          }
          if ((sum += value) > max) {
            return { validatorSumMax: true };
          }
        }
      }
    }
    return null;
  }
}
