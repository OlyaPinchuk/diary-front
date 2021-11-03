import {IUser} from './user.interface';
import {IProfile} from './profile.interface';

export interface IRegister extends IUser {
  profile: IProfile;
}
