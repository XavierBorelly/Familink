export default class Contact
{
  constructor(id, phone, firstName, profile, OptionnalAttribues)
  {
    this.id = id;
    this.phoneNumber = phone;
    this.firstName = firstName;
    this.profile = profile;
    if (OptionnalAttribues !== undefined)
    {
      this.lastName = OptionnalAttribues.lastName;
      this.email = OptionnalAttribues.email;
      this.gravatar = OptionnalAttribues.gravatar;
      this.isFamilinkUser = OptionnalAttribues.isFamilinkUser;
      this.isEmergencyUser = OptionnalAttribues.isEmergencyUser;
    }
  }
}
