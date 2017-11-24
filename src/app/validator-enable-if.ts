import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export type CheckFn = (c: AbstractControl, refs?: AbstractControl[]) => boolean;
export type ValidatorFnRef = (refs: AbstractControl[]) => ValidatorFn;

// checkFnがtrueの場合だけvalidatorsによるvalidateを行う
// checkFnがfalseの場合はnullを返す
export function validatorsEnableIf(validators: ValidatorFn[], checkFn: CheckFn): ValidatorFn {
  return validatorsEnableIfRef(validators, checkFn)([]);
}

// checkFnRefがtrueの場合だけvalidatorsによるvalidateを行う
// checkFnRefがfalseの場合はnullを返す
// ただし，validatorsEnableIfRef(validators, checkFnRef)(refs)のようにrefsを指定する
export function validatorsEnableIfRef(validators: ValidatorFn[], checkFn: CheckFn): ValidatorFnRef {
  const validator = Validators.compose(validators);
  let subscribe = false;

  return (refs: AbstractControl[]): ValidatorFn => (c: AbstractControl): ValidationErrors => {
    if (!subscribe) {
      subscribe = true;
      for (let i = 0; i < refs.length; i++) {
        refs[i].valueChanges.subscribe(() => c.updateValueAndValidity());
      }
    }

    if (checkFn(c, refs)) {
      return validator(c);
    } else {
      return null;
    }
  }
}

export function returnErrorValidator(error?: ValidationErrors): ValidatorFn {
  const validationError: ValidationErrors = error || { returnErrorValidator: true };
  return (c: AbstractControl): ValidationErrors => {
    return validationError;
  };
}
