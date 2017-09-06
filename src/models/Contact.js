export default class Contact
{
  constructor(id, phone, firstName, profile, optionalAttributes)
  {
    this.id = id;
    this.phoneNumber = phone;
    this.firstName = firstName;
    this.profile = profile;
    if (optionalAttributes !== undefined)
    {
      this.lastName = optionalAttributes.lastName;
      this.email = optionalAttributes.email;
      this.gravatar = optionalAttributes.gravatar;
      this.isFamilinkUser = optionalAttributes.isFamilinkUser;
      this.isEmergencyUser = optionalAttributes.isEmergencyUser;
    }
  }
}
