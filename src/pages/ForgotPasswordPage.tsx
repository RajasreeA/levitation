import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [fieldError, setFieldError] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = () => {
    if (email.trim() === '') {
      setFieldError('Email is required.');
      return;
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setFieldError('Invalid email format.');
      return;
    }

    setResetSent(true);
  };

  const handleGoBack = () => {
    navigate("/"); // Go back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-8 rounded-md">
        <button
          onClick={handleGoBack}
          className="mr-2 text-blue-500"
        >
          &lt; Back
        </button>
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold">Forgot Password</h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldError('');
            }}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
          {fieldError && <p className="text-red-500 text-sm mt-1">{fieldError}</p>}
        </div>
        {!resetSent ? (
          <button
            onClick={handleResetPassword}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2"
          >
            Reset Password
          </button>
        ) : (
          <p className="text-green-500 text-sm mb-2">
            Password reset email sent to {email}. Please check your inbox.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
