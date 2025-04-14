import React from "react";

const Login = () => {
    const handleLogin = () => {
        window.location.href="http://localhost:8443/oauth2/authorization/google";
    };  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Health Report Portal</h1>
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Login with Google
          </button>
        </div>
      );
    };
export default Login;

