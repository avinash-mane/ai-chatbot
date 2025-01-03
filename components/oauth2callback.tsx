import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTokens } from '../app/utils/googleAuth';

const OAuth2Callback = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      // Get access tokens after successful login
      const fetchTokens = async () => {
        await getTokens(code as string);
        router.push('/dashboard'); // Redirect to a dashboard or main page
      };
      fetchTokens();
    }
  }, [code]);

  return <div>Loading...</div>;
};

export default OAuth2Callback;
