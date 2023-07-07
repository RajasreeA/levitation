import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "levitation@levitation.in" && password === "levitation") {
      //For me api is not working 
      navigate("/form");
      window.location.reload();
    } else {
      setLoginError(true);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        {loginError && (
          <p className="text-red-500 text-sm mb-2">
            Login failed. Please check your credentials.
          </p>
        )}
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
        >
          Login
        </button>
        <br />
        <button
          className="text-blue-500 hover:text-blue-600 px-4 py-2"
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
