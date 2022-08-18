export interface IAuthorization {
  email: string;
  password: string;
  passwordConfirm?: string;
  login?: string;
  token?: string;
  uid?: string;
}
