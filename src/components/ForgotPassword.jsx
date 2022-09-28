import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import validator from "validator";

const ForgotPassword = ({ handleClickSignIn }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const { requestPasswordResetEmail } = UserAuth();

  const handleSubmit = () => {
    if (!validator.isEmail(email) || !email) {
      setEmailError(true);
    } else {
      setIsLoading(true);
      setTimeout(async () => {
        try {
          await requestPasswordResetEmail(email);
          setIsSuccess(true);
          setIsLoading(false);
          return;
        } catch (error) {
          console.log("Error: ", error);
          setIsLoading(false);
        }
      }, 2000);
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex justify-center bg-white ">
      <div className="w-11/12 text-gray-800  flex flex-col justify-center px-2 sm:px-0 py-16">
        {isSuccess ? (
          <div className="px-2 sm:px-6">
            <h3 className="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight">
              Success!
            </h3>
            <p className="leading-tight mt-2">Please check your email inbox</p>
            <p className="mt-6 text-xs">
              Return to{" "}
              <a
                className="text-primary cursor-pointer"
                onClick={handleClickSignIn}
              >
                Sign In
              </a>
            </p>
          </div>
        ) : (
          <>
            <div className="px-2 sm:px-6">
              <h3 className="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight">
                Password Reset Request
              </h3>
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
            </div>
            <div className="px-2 sm:px-6">
              <button
                onClick={handleSubmit}
                className={`focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-5 text-sm py-2 font-light mt-6 ${
                  isLoading ? "loading" : ""
                }`}
              >
                Reset Password
              </button>
              <p className="mt-6 text-xs">
                Return to{" "}
                <a
                  className="text-primary cursor-pointer"
                  onClick={handleClickSignIn}
                >
                  Sign In
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;
