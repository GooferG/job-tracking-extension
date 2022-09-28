import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import StatusPill from "./StatusPill";
import { UserAuth } from "../context/AuthContext";

const StatusDropdown = ({ status: initialStatus, companyName, id }) => {
  const [applicationStatus, setApplicationStatus] = useState(initialStatus);
  const { user, addData, updateData, data } = UserAuth();

  const handleUpdateStatus = (v) => {
    setApplicationStatus(v);
    let selectedItem = data?.applications?.filter(
      (item) => item.companyName === companyName && item.id === id
    );

    let filterOut = data?.applications?.filter(
      (item) => item.companyName !== companyName && item.id !== id
    );

    selectedItem[0].status = v;

    let submitVals = {
      ...data,
      applications: [...filterOut, ...selectedItem],
    };

    try {
      addData(`users`, user.uid, submitVals);
      updateData();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="pt-2">
        <Menu.Button>
          <StatusPill status={applicationStatus} showIcon />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-3 mt-1 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleUpdateStatus("Pending")}
                  className={`${
                    active ? "bg-primary text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Pending
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleUpdateStatus("In Progress")}
                  className={`${
                    active ? "bg-primary text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  In Progress
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleUpdateStatus("Hired")}
                  className={`${
                    active ? "bg-primary text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Hired
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleUpdateStatus("Rejected")}
                  className={`${
                    active ? "bg-primary text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Rejected
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default StatusDropdown;
