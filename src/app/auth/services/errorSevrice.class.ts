
import Swal from "sweetalert2";

export class AuthError extends Error {
  override name: string;
  override message!: string;
  override stack?: string | undefined;
  override cause?: any;

  constructor(name: string, message: string, stack?: string | undefined, cause?: Record<string, string> | any) {
    super(message);
    this.name = name;
    this.stack = stack;
    this.cause = cause;
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  getError(): this {
    return this;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getStack(): string | undefined {
    return this.stack;
  }

  setStack(stack: string | undefined) {
    this.stack = stack;
  }

  getMessage(): string {
    return this.message;
  }

  setMessage(message: string) {
    this.message = message;
  }

  getCause(): unknown {
    return this.cause;
  }

  setCause(cause: unknown) {
    this.cause = cause;
  }

  async getSwalModalError(){
    try{
      return await Swal.fire(
        {
          icon: "error",
          title: this.name,
          text: this.message,
          footer: this.cause.message,
        }
      );
    }
    catch(e: unknown){
      return this;
    }
  }

}
