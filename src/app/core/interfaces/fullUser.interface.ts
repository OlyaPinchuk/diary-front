import {IUser} from './user.interface';
import {IProfile} from './profile.interface';

export interface IFullUser extends IUser {
  profile: IProfile;
}
