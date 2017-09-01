import { Directive, OnInit, Input } from "@angular/core";
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from "@angular/forms";

@Directive({
  selector: '[validatorBool]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ValidatorBool, multi: true }]
})
export class ValidatorBool implements Validator, OnInit {

  @Input('validatorBool') bool: boolean;
  @Input('validatorBoolKey') key: string;
  @Input('validatorBoolValue') value: any;
  obj: { [key: string]: any } = {};

  ngOnInit() {
    this.obj[this.key || 'validatorBool'] = this.value || true;
  }

  validate(c: AbstractControl): ValidationErrors | null {

    return this.bool ? this.obj : null;
  }
}
