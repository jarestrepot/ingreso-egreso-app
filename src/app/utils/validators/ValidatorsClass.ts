import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { TypeIcomeEgrees } from "./enumTypes";

export class ValidatorsCustom extends Validators {

  private static regexEmail: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private static types: string[] = Object.keys(TypeIcomeEgrees);
  static hasType(): ValidatorFn {
    return ( { value }: AbstractControl ):ValidationErrors | null => {
      if(!value) return null;
      return !this.types.includes(value) ? { enumInvalid: true } : null;
    }
  }

  public static mustBeEquals( firtsControl:string, secondControl:string ): ValidatorFn {
    return (group: AbstractControl):ValidationErrors | null => {
      const fControl = group.get(firtsControl);
      const sControl = group.get(secondControl);
      return fControl?.value === sControl?.value ? null : { mustBeEqual: true };
    }
  }

  public static emailAddress(): ValidatorFn {
    return ( { value }: AbstractControl ):ValidationErrors | null => {
      return this.regexEmail.test(value) ? null : { emailInvalid: true };
    }
  }
}
