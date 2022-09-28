import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import validator from "validator";
import { CgSpinner } from "react-icons/cg";

const SignUp = ({ handleClickSignIn }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { createUser } = UserAuth();

  const handleSubmit = async () => {
    if (!validator.isEmail(email) || !email) {
      setEmailError(true);
    }

    if (!validator.isStrongPassword(password) || !password) {
      setPasswordError(true);
    }

    if (
      validator.isEmpty(firstName) ||
      !validator.isLength(firstName, { min: 2 })
    ) {
      setFirstNameError(true);
    }

    if (password !== verifyPassword || !verifyPassword) {
      setPasswordMatchError(true);
    }

    if (emailError || firstNameError || passwordError || passwordMatchError) {
      return;
    }

    setIsLoading(true);

    if (
      !emailError ||
      !passwordError ||
      !passwordMatchError ||
      !firstNameError
    ) {
      try {
        console.log("XXXXXX");
        await createUser(email, password, firstName);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center bg-white ">
      <div className="w-11/12 text-gray-800  flex flex-col justify-center px-2 sm:px-0 py-16">
        <div className="px-2 sm:px-6">
          <h3 className="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight">
            Sign Up
          </h3>
        </div>
        <div className="mt-2 w-full px-2 sm:px-6">
          <div className="flex flex-col mt-4 relative">
            <label htmlFor="first-name" className="text-sm leading-tight">
              First Name
            </label>
            <input
              id="first-name"
              maxLength={75}
              required
              aria-required="true"
              name="first-name"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
                setFirstNameError(false);
              }}
            />
            {firstNameError && (
              <p className="text-xxs text-red-500 absolute bottom-[-15px]">
                Enter a first name
              </p>
            )}
          </div>
          <div className="flex flex-col mt-4 relative">
            <label htmlFor="email" className="text-sm leading-tight">
              Email
            </label>
            <input
              id="email"
              maxLength={75}
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
              <p className="text-xxs text-red-500 absolute bottom-[-15px]">
                Enter a valid email address
              </p>
            )}
          </div>
          <div className="flex flex-col mt-5">
            <label htmlFor="password" className="text-sm leading-tight">
              Password
            </label>
            <input
              id="password"
              required
              maxLength={75}
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
              <p className="text-xxs text-red-500 -mb-[15px] mt-[2px]">
                Please use a password containing:
                <br />
                8 characters min length
                <br />
                1 lowercase letter
                <br />
                1 number
                <br />
                1 symbol
                <br />
              </p>
            )}
          </div>
          <div className="flex flex-col mt-5 relative">
            <label htmlFor="password" className="text-sm leading-tight">
              Verify Password
            </label>
            <input
              id="verify-password"
              required
              maxLength={75}
              aria-required="true"
              name="password"
              type="password"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              onChange={(e) => {
                setVerifyPassword(e.target.value);
                setPasswordMatchError(false);
              }}
            />
            {passwordMatchError && (
              <p className="text-xxs text-red-500 absolute bottom-[-15px]">
                Please make sure the passwords match
              </p>
            )}
          </div>
        </div>

        <div className="px-2 sm:px-6">
          <button
            onClick={handleSubmit}
            className="focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-5 text-sm h-8 w-30 font-light mt-6"
          >
            {isLoading ? (
              <CgSpinner className="loading mx-auto w-5 h-5" />
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="mt-6 text-xs">
            Already Have An Account?{" "}
            <a
              className="text-primary cursor-pointer"
              onClick={handleClickSignIn}
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
