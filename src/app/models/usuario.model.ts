export class User {
  constructor(
    private uid: string,
    private email: string,
    private name: string,
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

