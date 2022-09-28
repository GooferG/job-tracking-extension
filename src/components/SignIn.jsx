import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import validator from 'validator';
import { CgSpinner } from 'react-icons/cg';
import { signInWithGoogle } from '../config/firebase';

const SignIn = ({ handleClickSignUp, handleClickForgotPass }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = UserAuth();

  const handleSubmit = async () => {
    if (!validator.isEmail(email) || !email) {
      return setEmailError(true);
    }

    if (!password) {
      return setPasswordError(true);
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      setPasswordError(true);
      console.log('Error: ', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center bg-white ">
      <div className="w-11/12 text-gray-800  flex flex-col justify-center px-2 sm:px-0 py-16">
        <div className="px-2 sm:px-6">
          <h3 className="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight">
            Login To Your Account
          </h3>
          <div></div>
        </div>
        <div className="mt-2 w-full px-2 sm:px-6">
          <div className="flex flex-col mt-4 relative">
            <label htmlFor="email" className="text-sm leading-tight">
              Email
            </label>
            <input
              id="email"
              required
              aria-required="true"
              name="email"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false);
              }}
            />
            {emailError && (
              <p className="text-xs text-red-500 absolute bottom-[-18px]">
                Enter a valid email address
              </p>
            )}
          </div>
          <div className="flex flex-col mt-5 relative">
            <label htmlFor="password" className="text-sm leading-tight">
              Password
            </label>
            <input
              id="password"
              required
              aria-required="true"
              name="password"
              type="password"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
            />
            {passwordError && (
              <p className="text-xs text-red-500 absolute bottom-[-18px]">
                Please enter your password
              </p>
            )}
          </div>
        </div>
        <div className="pt-6 w-full flex justify-between px-2 sm:px-6">
          <div className="flex items-center">
            <input
              id="rememberme"
              name="rememberme"
              className="w-3 h-3 mr-2"
              type="checkbox"
            />
            <label htmlFor="rememberme" className="text-xs">
              Remember Me
            </label>
          </div>
          <a
            className="text-xs text-primary cursor-pointer"
            onClick={handleClickForgotPass}
          >
            Forgot Password?
          </a>
        </div>
        <div className="px-2 sm:px-6">
          <button
            onClick={handleSubmit}
            className="focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-5 text-sm h-8 w-20 font-light mt-6"
          >
            {isLoading ? (
              <CgSpinner className="loading mx-auto w-5 h-5" />
            ) : (
              'Login'
            )}
          </button>
          <button className="button" onClick={signInWithGoogle}>
            <i className="focus:outline-none bg-red-600 transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-5 text-sm h-8 w-20 font-light mt-6">
              Sign in with google
            </i>
          </button>
          <p className="mt-6 text-xs">
            Don’t Have An Account?{' '}
            <a
              className="text-primary cursor-pointer"
              onClick={handleClickSignUp}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
