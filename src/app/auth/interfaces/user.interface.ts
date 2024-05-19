export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister{
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

