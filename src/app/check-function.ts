import { AbstractControl } from '@angular/forms';

import { CheckFn } from './validator-enable-if';

export function valueEqualCheckFn<T>(val: T): CheckFn {
  return (c: AbstractControl, refs: AbstractControl[]): boolean => {
    return c.value === val;
  }
}

export function valueEqualToCheckFn(): CheckFn {
  return (c: AbstractControl, refs: AbstractControl[]): boolean => {
    for (let i = 0; i < refs.length; i++) {
      if (c.value !== refs[i].value) {
        return false;
      }
    }
    return true;
  }
}

export function valueInArrayCheckFn<T>(array: T[]): CheckFn {
  return (c: AbstractControl, refs: AbstractControl[]): boolean => {
    return array.indexOf(c.value) < 0 ? false : true;
  }
}
