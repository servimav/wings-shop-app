/**
 * User Role Name
 */
export type IUserRoleName =
  | 'user'
  | 'admin'
  | 'shop_vendor'
  | 'transport_driver';
/**
 *  User Role
 */
export interface IUserRole {
  name: IUserRoleName;
  display_name: string;
}

/**
 * User Profile
 */
export type IUserProfile = {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone?: string;
  readonly address?: string;
  readonly avatar: string;
  role: IUserRole;
};
/**
 * -----------------------------------------
 *	HTTP
 * -----------------------------------------
 */
/**
 * User Auth Login Request
 */
export type IUserAuthLoginRequest = {
  readonly email: string;
  readonly password: string;
  readonly auth_mode?: IUserRoleName;
};
/**
 * User Auth Register Request
 */
export type IUserAuthRegisterRequest = {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone?: string;
  readonly address?: string;
  readonly password: string;
  readonly password_confirmation: string;
};
/**
 * User Auth Response
 */
export type IUserAuthResponse = {
  readonly data: IUserProfile;
  readonly api_token: string;
};
/**
 * User Role Request
 */
export interface IUserRoleRequest {
  role: IUserRoleName;
  subject: string;
  message: string;
}
/**
 * User Role Request Response
 */
export interface IUserRoleRequestResponse {
  id: number;
  subject: string;
  message: string;
  accepted: boolean;
  role: IUserRole;
  created_at: string;
  updated_at: string;
}
