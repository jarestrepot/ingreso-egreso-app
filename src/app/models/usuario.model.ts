import * as User from '@auth/interfaces/user.interface';

export class UserEntity {
  /**
   * Statcic method
   * @param userDatabase
   * @returns this
   */
  static fromFirebase({ id, name, email, }: User.UserDatabase ){
    return new UserEntity(id, name, email);
  }

  constructor(
    private id: string,
    private email: string,
    private name: string,
  ){

  }
  getId(): string {
    return this.id;
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

