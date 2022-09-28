import React from "react";
import { BiChevronDown } from "react-icons/bi";

const StatusPill = ({ status, showIcon = false }) => {
  if (status === "In Progress") {
    return (
      <div
        className={`h-6 flex items-center justify-center bg-blue-100 rounded ${
          showIcon ? "mr-4 w-[120px]" : ""
        }`}
      >
        <p
          className={`text-xs leading-3 text-blue-500 flex items-center justify-center ${
            showIcon ? "pl-2" : ""
          }`}
        >
          {status}
          {showIcon && (
            <BiChevronDown className="inline-flex text-lg font-bold mx-1" />
          )}
        </p>
      </div>
    );
  }

  if (status === "Hired") {
    return (
      <div
        className={`h-6 flex items-center justify-center bg-green-100 rounded ${
          showIcon ? "mr-4 w-[120px]" : ""
        }`}
      >
        <p
          className={`text-xs leading-3 text-green-600 flex items-center justify-center ${
            showIcon ? "pl-2" : ""
          }`}
        >
          {status}
          {showIcon && (
            <BiChevronDown className="inline-flex text-lg font-bold mx-1" />
          )}
        </p>
      </div>
    );
  }

  if (status === "Rejected") {
    return (
      <div
        className={`h-6 flex items-center justify-center bg-red-100 rounded ${
          showIcon ? "mr-4 w-[120px]" : ""
        }`}
      >
        <p
          className={`text-xs leading-3 text-red-500 flex items-center justify-center ${
            showIcon ? "pl-2" : ""
          }`}
        >
          {status}
          {showIcon && (
            <BiChevronDown className="inline-flex text-lg font-bold mx-1" />
          )}
        </p>
      </div>
    );
  }

  if (status === "Pending") {
    return (
      <div
        className={`h-6 flex items-center justify-center bg-yellow-100 rounded ${
          showIcon ? "mr-4 w-[120px]" : ""
        }`}
      >
        <p
          className={`text-xs leading-3 text-yellow-600 flex items-center justify-center ${
            showIcon ? "pl-2" : ""
          }`}
        >
          {status}
          {showIcon && (
            <BiChevronDown className="inline-flex text-lg font-bold mx-1" />
          )}
        </p>
      </div>
    );
  }
};

export default StatusPill;
