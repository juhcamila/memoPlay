import {AbstractControl} from '@angular/forms';
import {FormControl} from '@angular/forms';

export class PasswordValidation {

  /**
   * para este metodo funcionar os campos de senha tem que ter com o
   * formControlname com os valores de senha e confirmaSenha
   * */
  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('senha').value; // to get value in input tag
    let confirmPassword = AC.get('confirmaSenha').value; // to get value in input tag
    if (password != confirmPassword) {
      console.log('false');
      AC.get('confirmaSenha').setErrors({MatchPassword: true})
    } else {
      console.log('true');
      return null
    }
  }
}

export class EmailValidation {

  static isValid(control: FormControl) {

    // regex para validar email
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    if (!regex.test(control.value)) { // se nao passou no teste
      return {
        invalidEmail: true // invalido
      };
    }
    return null; // ok valido
  }
}
