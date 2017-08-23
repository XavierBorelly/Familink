export default class Contact
{
  constructor(id, data)
  {
    this.id = id;
    this.phone = data.phone;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.profile = data.profile;
    this.isFamilinkUser = data.isFamilinkUser;
    this.isEmergencyUser = data.isEmergencyUser;
  }
}
