export class user {
  id: number;
  name: string;
  email: string;
  password: string;
  recoveryToken: string | null;
  recoveryTokenExpires: Date | null;
}