export interface IUser {
  id?: number;
  email: string;
  is_active?: boolean;
  is_staff: boolean;
  is_superadmin?: boolean;
}
