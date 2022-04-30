/**
 * @interface Profile
 */
export type IUserProfile = {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone?: string;
  readonly address?: string;
  readonly avatar: string;
  role: { name: 'admin' | 'user' | 'vendor'; display_name: string };
};
/**
 * -----------------------------------------
 *	HTTP
 * -----------------------------------------
 */
/**
 *
 */
export type IUserAuthLoginRequest = {
  readonly email: string;
  readonly password: string;
  readonly auth_mode?: 'user' | 'admin' | 'shop_vendor' | 'transport_driver';
  readonly service_name: string;
};
/**
 *
 */
export type IUserAuthRegisterRequest = {
  readonly service_name: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly password: string;
  readonly password_confirmation: string;
};
/**
 *
 */
export type IUserAuthResponse = {
  readonly data: IUserProfile;
  readonly api_token: string;
};
