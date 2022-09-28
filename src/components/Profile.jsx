import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import validator from "validator";
import { CgSpinner } from "react-icons/cg";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [desiredTitle, setDesiredTitle] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [location, setLocation] = useState("");
  const [workplaceType, setWorkplaceType] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [submitBtnText, setSubmitBtnText] = useState("Save Profile");

  const { user, addData, data, updateData } = UserAuth();

  const handleSubmit = async () => {
    if (validator.isEmpty(firstName)) {
      if (validator.isEmpty(firstName)) {
        setNameError(true);
      }
    } else {
      setIsLoading(true);

      try {
        addData(`users`, user.uid, {
          firstName,
          lastName,
          employmentStatus,
          currentSalary,
          desiredSalary,
          desiredTitle,
          currentTitle,
          location,
          workplaceType,
          email: user?.email,
          phone,
        });

        setIsLoading(false);
        setSubmitBtnText("Success!");

        setTimeout(() => {
          updateData();
          setSubmitBtnText("Save Profile");
        }, 2000);
      } catch (error) {
        console.log("Error: ", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (data?.email) {
      const {
        firstName,
        lastName,
        employmentStatus,
        currentSalary,
        desiredSalary,
        desiredTitle,
        currentTitle,
        location,
        workplaceType,
        phone,
      } = data || {};

      setEmail(user?.email);
      setFirstName(firstName);
      setLastName(lastName);

      setEmploymentStatus(employmentStatus || "");
      setCurrentSalary(currentSalary || "");
      setDesiredSalary(desiredSalary || "");
      setDesiredTitle(desiredTitle || "");
      setCurrentTitle(currentTitle || "");
      setLocation(location || "");
      setWorkplaceType(workplaceType || "");
      setPhone(phone || "");
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 pt-4">
        <div className="flex flex-col  flex-1">
          <label
            htmlFor="first-name"
            className="text-xs font-semibold leading-tight"
          >
            First Name
          </label>
          <input
            id="first-name"
            maxLength={75}
            required
            aria-required="true"
            name="first-name"
            className={`placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border ${
              nameError ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="First"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setNameError(false);
            }}
          />
        </div>
        <div className="flex flex-col  flex-1">
          <label
            htmlFor="last-name"
            className="text-xs font-semibold leading-tight"
          >
            Last Name
          </label>
          <input
            id="last-name"
            maxLength={75}
            required
            aria-required="true"
            name="last-name"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            value={lastName}
            placeholder="Last"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col  flex-1">
          <label
            htmlFor="email"
            className="text-xs font-semibold leading-tight"
          >
            Email
          </label>
          <input
            id="email"
            required
            aria-required="true"
            disabled
            name="email"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="email"
            placeholder="email@engrbyhustle.com"
            value={email}
          />
        </div>

        <div className="flex flex-col flex-1">
          <label
            htmlFor="employment-status"
            className="text-xs font-semibold leading-tight"
          >
            Employment Status
          </label>
          <input
            id="employment-status"
            maxLength={75}
            aria-required="true"
            name="employment-status"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="Employed"
            value={employmentStatus}
            onChange={(e) => setEmploymentStatus(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="current-salary"
            className="text-xs font-semibold leading-tight"
          >
            Current Salary
          </label>
          <input
            id="current-salary"
            aria-required="true"
            maxLength={75}
            name="current-salary"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="$80,000"
            value={currentSalary}
            onChange={(e) => setCurrentSalary(e.target.value)}
          />
        </div>

        <div className="flex flex-col flex-1">
          <label
            htmlFor="desired-salary"
            className="text-xs font-semibold leading-tight"
          >
            Desired Salary
          </label>
          <input
            id="desired-salary"
            aria-required="true"
            maxLength={75}
            name="desired-salary"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="$130,000.00"
            value={desiredSalary}
            onChange={(e) => setDesiredSalary(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="current-title"
            className="text-xs font-semibold leading-tight"
          >
            Current Title
          </label>
          <input
            id="current-title"
            aria-required="true"
            maxLength={75}
            name="current-title"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="Software Engineer"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="desired-title"
            className="text-xs font-semibold leading-tight"
          >
            Desired Title
          </label>
          <input
            id="desired-title"
            aria-required="true"
            maxLength={75}
            name="desired-title"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="Sr. Software Engineer"
            value={desiredTitle}
            onChange={(e) => setDesiredTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="workplace-type"
            className="text-xs font-semibold leading-tight"
          >
            Ideal Workplace Type
          </label>
          <input
            id="workplace-type"
            maxLength={75}
            aria-required="true"
            name="workplace-type"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="In Office"
            value={workplaceType}
            onChange={(e) => setWorkplaceType(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="location"
            className="text-xs font-semibold leading-tight"
          >
            Location
          </label>
          <input
            id="location"
            aria-required="true"
            maxLength={75}
            name="location"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="Phoenix, AZ"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col flex-1">
          <label
            htmlFor="phone"
            className="text-xs font-semibold leading-tight"
          >
            Phone Number
          </label>
          <input
            id="phone"
            aria-required="true"
            name="phone"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="1-10 employees"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label
            htmlFor="location"
            className="text-xs font-semibold leading-tight"
          >
            Temp Val
          </label>
          <input
            id="location"
            maxLength={75}
            aria-required="true"
            name="location"
            className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
            type="text"
            placeholder="Remote"
            value={""}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-8 text-sm mt-3 py-2 font-light"
        disabled={nameError}
      >
        {isLoading ? (
          <CgSpinner className="loading mx-auto w-5 h-5" />
        ) : (
          submitBtnText
        )}
      </button>
    </div>
  );
};

export default Profile;
