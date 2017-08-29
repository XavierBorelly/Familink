export default class Contact
{
  constructor(id, phone, firstName, lastName, email,
    profile, gravatar, isFamilinkUser, isEmergencyUser)
  {
    this.id = id;
    this.phoneNumber = phone;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profile = profile;
    this.gravatar = gravatar;
    this.isFamilinkUser = isFamilinkUser;
    this.isEmergencyUser = isEmergencyUser;
  }
}
