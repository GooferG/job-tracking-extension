import React, { useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsCheck2Circle } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import { UserAuth } from "../context/AuthContext";
import { format } from "date-fns";
import StatusDropdown from "./StatusDropdown";

const ApplicationDetails = ({ handleClickBack, selectedApplication, data }) => {
  const {
    companyName,
    companySize,
    date,
    jobUrl,
    location,
    logoImg,
    salary,
    schedule,
    source,
    title,
    website,
    id,
    status,
    notes,
  } = selectedApplication || {};

  const [showModal, setShowModal] = useState(false);
  const [showRemoveSuccess, setShowRemoveSuccess] = useState(false);

  const { user, addData, updateData } = UserAuth();

  const handleRemoveApplication = () => {
    let arr = data?.applications?.filter(
      (item) => item.companyName !== companyName && item.id !== id
    );

    let submitVals = {
      ...data,
      applications: [...arr],
    };

    try {
      addData(`users`, user.uid, submitVals);
      setShowRemoveSuccess(true);
      updateData();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <div className="pb-2 flex justify-between items-center">
        <MdArrowBackIos
          className="inline-flex cursor-pointer ml-[18px]"
          onClick={handleClickBack}
        />
        <StatusDropdown status={status} companyName={companyName} id={id} />
      </div>

      <div className="max-w-[600px] block mx-auto mt-5 h-[430px] overflow-y-auto">
        <div className="flex flex-col justify-between h-full">
          <div className="bg-white flex gap-8">
            <div>
              {!logoImg || logoImg === "NA" ? (
                <div className="avatar placeholder mr-2">
                  <div className="bg-neutral-focus text-neutral-content rounded w-24 ml-3">
                    <span className="text-3xl">{companyName?.charAt(0)}</span>
                  </div>
                </div>
              ) : (
                <img
                  className="mask mask-square rounded w-24 h-24 ml-3"
                  src={`data:image/png;base64,${logoImg}`}
                />
              )}
            </div>

            <div className="flex flex-col justify-between mt-10">
              <span className="text-primary -mt-[1px] font-bold text-2xl">
                {companyName}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1 mt-2">
                <span className="text-black font-normal">Title: </span>
                {title}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1">
                <span className="text-black font-normal">Location: </span>
                {location}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1">
                <span className="text-black font-normal">Source: </span>
                {source}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1">
                <span className="text-black font-normal">Schedule: </span>
                {schedule}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1">
                <span className="text-black font-normal">Salary: </span>
                {salary}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1">
                <span className="text-black font-normal">Company Size: </span>
                {companySize}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1">
                <span className="text-black font-normal">Applied On: </span>
                {date ? format(date, "MM/dd/yy") : "NA"}
              </span>
              <span className="block text-font-primary font-light text-sm mb-1">
                <span className="text-black font-normal">Notes: </span>
                {notes}
              </span>
            </div>
          </div>
          <div className="flex mt-5 justify-between items-center">
            <div className="flex">
              {jobUrl && jobUrl !== "NA" && (
                <a href={jobUrl} target="_blank">
                  <button className="pb-[2px] focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-5 text-sm w-34 font-light mr-4">
                    view job posting
                  </button>
                </a>
              )}

              {website && website !== "NA" && (
                <a href={website} target="_blank">
                  <button className="pb-[2px] focus:outline-none bg-primary transition duration-150 ease-in-out hover:bg-primary-hover rounded text-white px-5 text-sm w-34 font-light">
                    view company site
                  </button>
                </a>
              )}
            </div>
            <div className="flex mr-5">
              <button
                onClick={() => console.log("edit")}
                className={`btn btn-circle btn-sm focus:outline-none bg-yellow-400 transition duration-150 ease-in-out hover:bg-yellow-300 rounded-full text-white border-0 mr-3`}
              >
                <FiEdit className="inline-flex text-lg" />
              </button>
              <button
                onClick={() => setShowModal(true)}
                className={`btn btn-circle btn-sm focus:outline-none bg-red-500 transition duration-150 ease-in-out hover:bg-red-300 rounded-full text-white border-0`}
              >
                <RiDeleteBinLine className="inline-flex text-lg " />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          {showRemoveSuccess ? (
            <Dialog.Panel className="mx-auto max-w-md rounded bg-white py-8 px-12">
              <Dialog.Title className="text-center text-2xl">
                Success!
              </Dialog.Title>
              <Dialog.Description className="mt-5 text-center">
                Application was removed
              </Dialog.Description>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowRemoveSuccess(false);
                    handleClickBack();
                  }}
                  className={`btn focus:outline-none bg-green-500 transition duration-150 ease-in-out hover:bg-green-400 text-white border-0 w-[120px]`}
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          ) : (
            <Dialog.Panel className="mx-auto max-w-md rounded bg-white py-8 px-12">
              <Dialog.Title className="text-center text-2xl">
                Are you sure you want to remove this application?
              </Dialog.Title>
              <Dialog.Description className="mt-5 text-center">
                This will permanently delete your application
              </Dialog.Description>
              <div className="flex gap-3 mt-6 justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className={`btn focus:outline-none bg-green-500 transition duration-150 ease-in-out hover:bg-green-400 text-white border-0 mr-3`}
                >
                  <BsCheck2Circle className="inline-flex text-lg  mr-1" /> Keep
                </button>
                <button
                  onClick={handleRemoveApplication}
                  className={`btn focus:outline-none bg-red-500 transition duration-150 ease-in-out hover:bg-red-400 text-white border-0`}
                >
                  <RiDeleteBinLine className="inline-flex text-lg  mr-1" />{" "}
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ApplicationDetails;
