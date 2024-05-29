import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { TypeIcomeEgrees } from "./enumTypes";

export class ValidatorsClass {

  public static types: string[] = Object.keys(TypeIcomeEgrees);
  static hasType(): ValidatorFn {
    return ( { value }: AbstractControl ) : ValidationErrors | null => {
      if(!value) return null;
      return !this.types.includes(value) ? { enumInvalid: true } : null;
    }
  }
}
