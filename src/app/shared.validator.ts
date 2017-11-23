import { AbstractControl, FormControl, FormGroup, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

/*
  validatorEqual() {
    return (cに属するFormControlのvalueがすべて等しい) ? null : { validatorEqual: true };
  }
*/
export function validatorEqual(c: AbstractControl): ValidationErrors | null {
  return isEqual(c, null)[0] ? null : { validatorEqual: true };
}
/*
  validatorAny() {
    return (cに属するFormControlのいずれかが入力されている) ? null : { validatorAny: true };
  }
*/
export function validatorAny(c: AbstractControl): ValidationErrors | null {
  return isAllEmpty(c) ? { validatorAny: true } : null;
}
/*
  validatorAllOrNotAny() {
    return (cに属するFormControlのすべてが入力されている
         || cに属するFormControlのすべてが入力されていない) ? null : { validatorAllOrNotAny: true };
  }
*/
export function validatorAllOrNotAny(c: AbstractControl): ValidationErrors | null {
  let e: boolean;
  let f: boolean;
  [e, f] = isAllEmptyOrAllFull(c, false, false);
  return e && f ? { validatorAny: true } : null;
}

/*
  validatorSumMin(min) {
    return (cに属するFormControlのvalue(empty=0)の合計値 < min
         || valueにNaNが含まれる) ? { validatorSumMin: true } : null;
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
  validatorSumMax(max) {
    return (cに属するFormControlのvalue(empty=0)の合計値 > max
         || valueにNaNが含まれる) ? { validatorSumMax: true } : null;
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

// from https://github.com/angular/angular/blob/4.3.6/packages/forms/src/validators.ts
function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

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
    for (const key of Object.keys(c.controls)) {
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

function isAllEmpty(c: AbstractControl): boolean {
  if (c instanceof FormControl) {
    return isEmptyInputValue(c.value);
  } else if (c instanceof FormGroup) {
    for (const key of Object.keys(c.controls)) {
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
    for (const key of Object.keys(c.controls)) {
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
    for (const key of Object.keys(c.controls)) {
      const cc: AbstractControl = c.controls[key];
      s = calcSumUntilMax(cc, s, max);
      if (s === null || s > max) {
        return s;
      }
    }
  } else if (c instanceof FormArray) {
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
