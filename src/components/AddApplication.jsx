import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "@headlessui/react";
import { BsCheck2Circle } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import { supportedSites } from "../constants/supportedSites";

const AddApplication = () => {
  const [companyName, setCompanyName] = useState("");
  const [schedule, setSchedule] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [salary, setSalary] = useState("");
  const [source, setSource] = useState("");
  const [title, setTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [logoImg, setLogoImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoFillLoading, setIsAutoFillLoading] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [sourceError, setSourceError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [content, setContent] = useState({});
  const [submitBtnText, setSubmitBtnText] = useState("Add Application");
  const [showDuplicateSubmission, setShowDuplicateSubmission] = useState(false);
  const [currentSite, setCurrentSite] = useState("");
  const [showSiteNotSupported, setShowSiteNotSupported] = useState(false);

  const { user, addData, data, updateData } = UserAuth();

  const isDuplicate = () =>
    data?.applications?.some(
      (item) => item.companyName === companyName && item.title === title
    );

  const handleSubmit = async () => {
    if (
      validator.isEmpty(title) ||
      validator.isEmpty(source) ||
      validator.isEmpty(companyName)
    ) {
      if (validator.isEmpty(companyName)) {
        setNameError(true);
      }
      if (validator.isEmpty(source)) {
        setSourceError(true);
      }
      if (validator.isEmpty(title)) {
        setTitleError(true);
      }
    } else {
      if (isDuplicate()) {
        return setShowDuplicateSubmission(true);
      }

      setIsLoading(true);

      const { applications } = data || {};

      let submitVals;

      if (applications?.length > 0) {
        submitVals = {
          ...data,
          applications: [
            ...applications,
            {
              companyName,
              date: Date.now(),
              salary,
              source,
              title,
              website,
              jobUrl,
              logoImg,
              schedule,
              companySize,
              location,
              id: uuidv4(),
              status: "Pending",
              notes,
            },
          ],
        };
      } else {
        submitVals = {
          ...data,
          applications: [
            {
              companyName,
              date: Date.now(),
              salary,
              source,
              title,
              website,
              jobUrl,
              logoImg,
              schedule,
              companySize,
              location,
              id: uuidv4(),
              status: "Pending",
              notes,
            },
          ],
        };
      }

      try {
        addData(`users`, user?.uid, submitVals);
        if (chrome?.storage) {
          chrome.storage.sync.set({ lastUsed: Date.now() });
        }
        setIsLoading(false);
        setSubmitBtnText("Success!");

        setCompanyName("");
        setTitle("");
        setWebsite("");
        setSource("");
        setSalary("");
        setLocation("");
        setJobUrl("");
        setLogoImg("");
        setNotes("");
        setCompanySize("");
        setSchedule("");

        setTimeout(() => {
          updateData();
          setSubmitBtnText("Add Application");
        }, 2000);
      } catch (error) {
        console.log("Error: ", error);
        setIsLoading(false);
      }
    }
  };

  const imageUrlToBase64 = async (url) => {
    console.log("url -> ", url);
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((onSuccess, onError) => {
      try {
        const reader = new FileReader();
        reader.onload = function () {
          onSuccess(this.result);
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        onError(e);
      }
    });
  };

  const handleAutoFill = async () => {
    if (supportedSites.some((v) => currentSite.includes(v))) {
      setIsAutoFillLoading(true);

      try {
        const logoBase64 = await imageUrlToBase64(content?.logoSrc);
        setLogoImg(logoBase64.split(",")[1]);
      } catch (error) {
        console.log("Error: ", error);
        setLogoImg("NA");
      }

      setTimeout(() => {
        setCompanyName(content.companyName);
        setTitle(content.positionTitle);
        setWebsite(content.websiteUrl);
        setSource(content.source);
        setSalary(content.salary);
        setLocation(content.workplaceType);
        setJobUrl(content.jobLink);
        setCompanySize(content.companySize);
        setSchedule(content.jobSchedule);
        setNameError(false);
        setSourceError(false);
        setTitleError(false);
        setIsAutoFillLoading(false);
      }, 500);
    } else {
      setShowSiteNotSupported(true);
      setTimeout(() => {
        setShowSiteNotSupported(false);
      }, 2000);
      return;
    }
  };

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  useEffect(() => {
    if (chrome?.tabs) {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id;
        getCurrentTab().then((res) =>
          chrome.tabs.sendMessage(
            currentTabID,
            { url: res.url },
            (response) => {
              setCurrentSite(res.url);
              setContent(response);
            }
          )
        );
      });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end items-center">
          <div className="relative">
            <button
              onClick={handleAutoFill}
              className="mt-2 focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-5 text-sm py-2 font-light"
            >
              {isAutoFillLoading ? (
                <CgSpinner className="loading mx-auto w-5 h-5" />
              ) : (
                "Auto Fill"
              )}
            </button>
            {showSiteNotSupported && (
              <span className="text-xxs absolute right-0 top-[33px] text-red-500">
                Site not supported
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col  flex-1">
            <label
              htmlFor="company-name"
              className="text-xs font-semibold leading-tight"
            >
              Company Name
            </label>
            <input
              id="company-name"
              maxLength={75}
              required
              aria-required="true"
              name="company-name"
              className={`placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border ${
                nameError ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="GoDaddy"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setNameError(false);
              }}
            />
          </div>
          <div className="flex flex-col  flex-1">
            <label
              htmlFor="website-url"
              className="text-xs font-semibold leading-tight"
            >
              Website URL
            </label>
            <input
              id="website-url"
              maxLength={100}
              required
              aria-required="true"
              name="website-url"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              type="text"
              value={website}
              placeholder="https://www.godaddy.com"
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col  flex-1">
            <label
              htmlFor="position-title"
              className="text-xs font-semibold leading-tight"
            >
              Position Title
            </label>
            <input
              id="position-title"
              maxLength={75}
              required
              aria-required="true"
              name="position-title"
              className={`placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border ${
                titleError ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Software Engineer"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false);
              }}
            />
          </div>

          <div className="flex flex-col flex-1">
            <label
              htmlFor="schedule"
              className="text-xs font-semibold leading-tight"
            >
              Work Schedule
            </label>
            <input
              id="schedule"
              maxLength={75}
              aria-required="true"
              name="schedule"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              type="text"
              placeholder="Full-time"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="source"
              className="text-xs font-semibold leading-tight"
            >
              Source
            </label>
            <input
              id="source"
              maxLength={75}
              aria-required="true"
              name="source"
              className={`placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border ${
                sourceError ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="LinkedIn"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                setSourceError(false);
              }}
            />
          </div>

          <div className="flex flex-col flex-1">
            <label
              htmlFor="salary"
              className="text-xs font-semibold leading-tight"
            >
              Salary
            </label>
            <input
              id="salary"
              maxLength={75}
              aria-required="true"
              name="salary"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              type="text"
              placeholder="$130,000.00"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="company-size"
              className="text-xs font-semibold leading-tight"
            >
              Company Size
            </label>
            <input
              id="company-size"
              maxLength={75}
              aria-required="true"
              name="company-size"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              type="text"
              placeholder="1-10 employees"
              value={companySize}
              onChange={(e) => seCompanySize(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              htmlFor="location"
              className="text-xs font-semibold leading-tight"
            >
              In Office
            </label>
            <input
              id="location"
              maxLength={75}
              aria-required="true"
              name="location"
              className="placeholder-gray-300 h-9 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border"
              type="text"
              placeholder="Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col relative">
          <label
            htmlFor="notes"
            className="text-xs font-semibold leading-tight"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="placeholder-gray-300 text-sm px-2 w-full rounded mt-2 text-font-primary focus:outline-none focus:border focus:border-primary border-primary-border border p-2"
            placeholder="Notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={300}
          />
          {notes && (
            <span className="text-gray-400 text-xs flex justify-end absolute -bottom-[17px] right-0">
              {300 - notes?.length} charaters remaining
            </span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-8 text-sm mt-3 py-2 font-light"
          disabled={nameError || sourceError || titleError}
        >
          {isLoading ? (
            <CgSpinner className="loading mx-auto w-5 h-5" />
          ) : (
            submitBtnText
          )}
        </button>
      </div>
      <Dialog
        open={showDuplicateSubmission}
        onClose={() => setShowDuplicateSubmission(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded bg-white py-8 px-12">
            <Dialog.Title className="text-center text-2xl">
              Duplicate Application!
            </Dialog.Title>
            <Dialog.Description className="mt-5 text-center text-sm">
              Select a position with a different title
            </Dialog.Description>
            <div className="flex gap-3 mt-6 justify-center">
              <button
                onClick={() => setShowDuplicateSubmission(false)}
                className={`btn focus:outline-none bg-green-500 transition duration-150 ease-in-out hover:bg-green-400 text-white border-0 mr-3`}
              >
                <BsCheck2Circle className="inline-flex text-lg font-bold mr-1" />{" "}
                Close
              </button>
            </div>
          </Dialog.Panel>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default AddApplication;
