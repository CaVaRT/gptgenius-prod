import { fetchUserTokensById } from '@/utils/actions';
import { UserProfile, auth } from '@clerk/nextjs';

const UserProfilePage = async () => {
  const {userId} = auth()
  const tokens = await fetchUserTokensById(userId);
  return (
    <div>
      <h2 className='mb-8 ml-8 text-xl font-extrabold'>
        Tokens Left: {tokens} 
      </h2>
      <UserProfile />;
    </div>
  );
};
export default UserProfilePage;
