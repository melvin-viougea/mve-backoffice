import {cookies} from 'next/headers';
import ky from 'ky';

const KyInstance = ky.create({
  hooks: {
    beforeRequest: [
      request => {
        const cookieStore = cookies();
        const token = cookieStore.get('auth');

        if (token) {
          request.headers.set('Authorization', `Bearer ${token.value}`);
        }
      }
    ]
  }
});

export default KyInstance;
