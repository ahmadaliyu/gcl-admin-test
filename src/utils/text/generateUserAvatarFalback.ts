import { TUser } from '@/types';

function generateUserAvatarFalback({ user }: { user?: TUser }) {
  return `${!user?.first_name ? '' : `${(user?.first_name || '').trim()[0]}`}${
    !user?.last_name ? '' : `${(user?.last_name || '').trim()[0]}`
  }`;
}

export default generateUserAvatarFalback;
