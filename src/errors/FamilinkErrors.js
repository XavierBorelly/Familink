import * as errStrings from './ErrorStrings';
import { regexPhone, regexPassword, regexMail } from '../Util';


export function checkPhoneNumber(phoneNumber)
{
  if (phoneNumber === null || phoneNumber === '')
  {
    return errStrings.phoneRequired;
  }
  else if (!phoneNumber.match(regexPhone))
  {
    return errStrings.phoneError;
  }

  return '';
}

export function checkPassword(password, confirmPassword)
{
  if (password === null || password === '')
  {
    return errStrings.passwordRequired;
  }
  else if (confirmPassword === null || confirmPassword === '')
  {
    return errStrings.confirmPasswordRequired;
  }
  else if (!password.match(regexPassword))
  {
    return errStrings.passwordError;
  }
  else if (password !== confirmPassword)
  {
    return errStrings.passwordConfirmError;
  }

  return '';
}

export function checkSurname(surname)
{
  if (surname === null || surname === '')
  {
    return errStrings.surnameRequired;
  }

  return '';
}

export function checkMail(mail)
{
  if (mail === null || mail === '')
  {
    return errStrings.mailRequired;
  }
  else if (!mail.match(regexMail))
  {
    return errStrings.mailError;
  }

  return '';
}
