import { AbstractControl, FormControl, FormGroup, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

// from https://github.com/angular/angular/blob/4.3.6/packages/forms/src/validators.ts
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

// 合計値sumがmaxを超えるまでc内を再帰的に計算する
function calcSumUntilMax(c: AbstractControl, sum: number, max: number): number | null {
  let s: number | null = sum;
  if (c instanceof FormControl) {
    if (!isEmptyInputValue(c.value)) {
      const value = parseFloat(c.value);
      if (isNaN(value)) {
        return null;
      }
      s += value;
    }
  } else if (c instanceof FormGroup) {
    for (let key of Object.keys(c.controls)) {
      const cc: AbstractControl = c.controls[key];
      s = calcSumUntilMax(cc, s, max);
      if (s === null || s > max) {
        return s;
      }
    }
  } else if (c instanceof FormArray) {
    let bool: boolean | null;
    for (let i = 0; i < c.controls.length; i++) {
      const cc: AbstractControl = c.controls[i];
      s = calcSumUntilMax(cc, s, max);
      if (s === null || s > max) {
        return s;
      }
    }
  }
  return s;
}

/*
  if (cに属するFormControlのvalue(empty=0)の合計値 < min || valueにNaNが含まれる) {
    return { validatorSumMin: true };
  } else {
    return null;
  }
*/
export function validatorSumMin(min: number): ValidatorFn {
  if (isEmptyInputValue(min)) {
    return (c: AbstractControl): ValidationErrors | null => null;
  }
  return (c: AbstractControl): ValidationErrors | null => {
    const sum: number | null = calcSumUntilMax(c, 0, min);
    return sum === null || sum < min ? { validatorSumMin: true } : null;
  }
}

/*
  if (cに属するFormControlのvalue(empty=0)の合計値 > max || valueにNaNが含まれる) {
    return { validatorSumMin: true };
  } else {
    return null;
  }
*/
export function validatorSumMax(max: number): ValidatorFn {
  if (isEmptyInputValue(max)) {
    return (c: AbstractControl): ValidationErrors | null => null;
  }
  return (c: AbstractControl): ValidationErrors | null => {
    const sum: number | null = calcSumUntilMax(c, 0, max);
    return sum === null || sum > max ? { validatorSumMin: true } : null;
  }
}
