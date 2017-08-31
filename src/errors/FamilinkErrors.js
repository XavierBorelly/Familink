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

export function checkLogin(message)
{
  if (message === 'User not found')
  {
    return errStrings.wrongUser;
  }
  else if (message === 'Password is not valid')
  {
    return errStrings.wrongPassword;
  }
  else if (message === 'data and hash arguments required')
  {
    return errStrings.missPassword;
  }
  else if (message !== undefined && message !== '' && message !== null)
  {
    return message;
  }
  return '';
}

export function checkForgotPassword(message)
{
  if (message === 400)
  {
    return errStrings.wrongUser;
  }
  return '';
}

export function checkRequiredStringValue(value, errorMessage)
{
  if (value === null || value === '')
  {
    return errorMessage;
  }

  return '';
}

export function checkProfil(profil)
{
  if (profil === null || profil === '')
  {
    return errStrings.profilRequired;
  }

  return '';
}
