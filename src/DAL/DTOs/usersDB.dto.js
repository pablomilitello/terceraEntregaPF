export default class UsersDB_DTO {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
  }
}
