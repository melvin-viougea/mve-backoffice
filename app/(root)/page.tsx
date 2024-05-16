import React from 'react';
import { cookies } from 'next/headers';

const Home = () => {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();

  return (
    <div>
      <h1>Dashboard</h1>
      {allCookies.length > 0 ? (
        allCookies.map((cookie) => (
          <div key={cookie.name}>
            <p>Name: {cookie.name}</p>
            <p>Value: {cookie.value}</p>
          </div>
        ))
      ) : (
        <p>No cookies found.</p>
      )}
    </div>
  );
};

export default Home;