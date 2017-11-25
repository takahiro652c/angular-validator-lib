import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export type CheckFn = (c: AbstractControl, refs: AbstractControl[]) => boolean;
export type ValidatorFnRef = (refs: AbstractControl[]) => ValidatorFn;

export function validatorCheck(checkFn: CheckFn, error?: ValidationErrors): ValidatorFn {
  const validationError: ValidationErrors = error || { validatorCheck: true };
  return validatorsEnableIf(returnErrorValidator(validationError), checkFn);
}

export function validatorCheckRef(checkFn: CheckFn, refs: AbstractControl[], error?: ValidationErrors): ValidatorFn {
  const validationError: ValidationErrors = error || { validatorCheckRef: true };
  return validatorsEnableIfRef(returnErrorValidator(validationError), checkFn, refs);
}

export function validatorCheckRefLazy(checkFn: CheckFn, error?: ValidationErrors): ValidatorFnRef {
  const validationError: ValidationErrors = error || { validatorCheckRefLazy: true };
  return validatorsEnableIfRefLazy(returnErrorValidator(validationError), checkFn);
}

export function validatorsEnableIf(validators: ValidatorFn | ValidatorFn[], checkFn: CheckFn): ValidatorFn {
  return validatorsEnableIfRef(validators, checkFn, []);
}

export function validatorsEnableIfRef(validators: ValidatorFn | ValidatorFn[], checkFn: CheckFn, refs: AbstractControl[]): ValidatorFn {
  return validatorsEnableIfRefLazy(validators, checkFn)(refs);
}

export function validatorsEnableIfRefLazy(validators: ValidatorFn | ValidatorFn[], checkFn: CheckFn): ValidatorFnRef {
  const validator = Array.isArray(validators) ? Validators.compose(validators) : validators;
  let subscribe = false;

  return (refs: AbstractControl[]): ValidatorFn => (c: AbstractControl): ValidationErrors => {
    if (!subscribe) {
      subscribe = true;
      for (let i = 0; i < refs.length; i++) {
        refs[i].valueChanges.subscribe(() => {
          c.updateValueAndValidity();
        });
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
