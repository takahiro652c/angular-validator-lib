import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

/*
  FormGroupで使うvalidator
  if(FormGroupに属するFormControlのすべてが入力されていない) {
    return { validatorAny: true };
  } else {
    return null;
  }
*/
export function validatorAny(fg: FormGroup): ValidationErrors | null {
  for (let key in fg.controls) {
    if (fg.controls.hasOwnProperty(key)) {
      const c: FormControl = <FormControl>fg.controls[key];
      if (Validators.required(c) === null) {
        return null;
      }
    }
  }
  return { validatorAny: true };
}
