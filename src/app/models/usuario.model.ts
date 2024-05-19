export class UserEntity {
  constructor(
    private uid: string,
    private name: string,
    private email: string,
  ){

  }
  getUid(): string {
    return this.uid;
  }
  getEmail(): string {
    return this.email;
  }
  setEmail(email: string){
    this.email = email;
  }
  getName(): string {
    return this.name;
  }
  setName(name: string){
    this.name = name;
  }
}

