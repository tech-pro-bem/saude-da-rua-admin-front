import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="ml-2">
      <h1 className="text-3xl text-dark-blue mb-2">Hello, Home!</h1>
      <Link to="/login" className="inline-block bg-primary-blue text-white p-3 rounded">Go to Login</Link>
    </main>

  );
}
export default Home;
