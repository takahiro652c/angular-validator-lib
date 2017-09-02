import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

/*
  FormGroupで使うvalidator
  if(FormGroupに属するFormControlのすべてが入力されていない
     or FormGroupに属するFormControlのすべてが入力されている) {
    return null;
  } else {
    return { validatorAllOrNotAny: true };
  }
*/
export function validatorAllOrNotAny(fg: FormGroup): ValidationErrors | null {
  let containEmpty: boolean = false;
  let containNotEmpty: boolean = false;
  for (let key in fg.controls) {
    if (fg.controls.hasOwnProperty(key)) {
      const c: FormControl = <FormControl>fg.controls[key];
      if (Validators.required(c) !== null) {
        containEmpty = true;
      } else {
        containNotEmpty = true;
      }
      if (containEmpty && containNotEmpty) {
        return { validatorAllOrNotAny: true };
      }
    }
  }

  return null;
}
