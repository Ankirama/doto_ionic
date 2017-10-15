import {FormGroup} from '@angular/forms';



export class PasswordValidator {
  static isMatching(group: FormGroup){
    var firstPassword = group.controls['password'].value;
    var secondPassword = group.controls['password_check'].value;
    if ((firstPassword && secondPassword) && (firstPassword != secondPassword)) {
      group.controls['password_check'].setErrors({"mismatch": true});
      return { "mismatch": true };
    } else {
      return null;
    }
  }
}
