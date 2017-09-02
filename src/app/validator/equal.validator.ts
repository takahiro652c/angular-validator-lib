import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

/*
  FormGroupで使うvalidator
  if (FormGroupに属するFormControlのvalueがすべて等しい) {
    return null;
  } else {
    return { validatorEqual: true };
  }
*/
export function validatorEqual(fg: FormGroup): ValidationErrors | null {
  let val: any = null;
  for (let key in fg.controls) {
    if (fg.controls.hasOwnProperty(key)) {
      const fc: FormControl = <FormControl>fg.controls[key];
      if (val === null) {
        val = fc.value;
      } else if (val !== fc.value) {
        return { validatorEqual: true };
      }
    }
  }
  return null
}
