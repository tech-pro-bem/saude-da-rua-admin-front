import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <main className="ml-2">
      <h1 className="text-3xl text-dark-grey mb-2 font-light">Hello, Login!</h1>
      <Link to="/" className="inline-block bg-error text-white p-3 rounded">Go to Home</Link>
    </main>
  );
}
export default Login;
