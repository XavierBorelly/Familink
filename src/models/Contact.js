export default class Contact
{
  constructor(id, phone, firstName, profile, OptionalAttributes)
  {
    this.id = id;
    this.phoneNumber = phone;
    this.firstName = firstName;
    this.profile = profile;
    if (OptionalAttributes !== undefined)
    {
      this.lastName = OptionalAttributes.lastName;
      this.email = OptionalAttributes.email;
      this.gravatar = OptionalAttributes.gravatar;
      this.isFamilinkUser = OptionalAttributes.isFamilinkUser;
      this.isEmergencyUser = OptionalAttributes.isEmergencyUser;
    }
  }
}
