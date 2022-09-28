import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { BiSort } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import ApplicationDetails from "./ApplicationDetails";
import { format } from "date-fns";
import StatusPill from "./StatusPill";

const ApplicationsTable = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({});
  const { user, data, setData } = UserAuth();

  // useState for the sorting functions
  const [companySort, setCompanySort] = useState("asc");
  const [jobSort, setJobSort] = useState("asc");
  const [statusSort, setStatusSort] = useState("asc");
  const [dateSort, setDateSort] = useState("asc");

  const handleSelectApplication = (i) => {
    setSelectedApplication(data?.applications?.[i]);
    setShowDetails(true);
  };

  // Sort by Company
  const sortByCompanyName = (e) => {
    if (companySort === "asc") {
      const x = data.applications;
      // descending
      let sortCompany = x.sort((a, b) =>
        a.companyName?.toLowerCase() > b.companyName?.toLowerCase()
          ? 1
          : a === b
          ? 0
          : -1
      );
      const applications = [...sortCompany];
      setData({ applications });
      setCompanySort("desc");
    } else {
      // ascending
      const x = data.applications;
      let sortCompany = x.sort((a, b) =>
        a.companyName?.toLowerCase() < b.companyName?.toLowerCase()
          ? 1
          : a === b
          ? 0
          : -1
      );
      const applications = [...sortCompany];
      setData({ applications });
      setCompanySort("asc");
    }
  };

  // sort by Job
  const sortByJobTitle = (e) => {
    if (jobSort === "asc") {
      const x = data.applications;
      // descending
      let sortJob = x.sort((a, b) =>
        a.title?.toLowerCase() > b.title?.toLowerCase() ? 1 : a === b ? 0 : -1
      );
      const applications = [...sortJob];
      setData({ applications });
      setJobSort("desc");
    } else {
      // ascending
      const x = data.applications;
      // descending
      let sortJob = x.sort((a, b) =>
        a.title?.toLowerCase() < b.title?.toLowerCase() ? 1 : a === b ? 0 : -1
      );
      const applications = [...sortJob];
      setData({ applications });
      setJobSort("asc");
    }
  };

  // sort by Status
  const sortByStatus = (e) => {
    if (statusSort === "asc") {
      const x = data.applications;
      // descending
      let sortJob = x.sort((a, b) =>
        a.status > b.status ? 1 : a === b ? 0 : -1
      );
      const applications = [...sortJob];
      setData({ applications });
      setStatusSort("desc");
    } else {
      // ascending
      const x = data.applications;
      // descending
      let sortJob = x.sort((a, b) =>
        a.status < b.status ? 1 : a === b ? 0 : -1
      );
      const applications = [...sortJob];
      setData({ applications });
      setStatusSort("asc");
    }
  };

  // sort by Date
  const sortByDate = (e) => {
    if (dateSort === "asc") {
      const x = data.applications;
      // descending
      let sortJob = x.sort((a, b) => (a.date > b.date ? 1 : a === b ? 0 : -1));
      const applications = [...sortJob];
      setData({ applications });
      setDateSort("desc");
    } else {
      // ascending
      const x = data.applications;
      // descending
      let sortJob = x.sort((a, b) => (a.date < b.date ? 1 : a === b ? 0 : -1));
      const applications = [...sortJob];
      setData({ applications });
      setDateSort("asc");
    }
  };

  return (
    <>
      {!showDetails && (
        <div className="mx-auto container bg-white">
          <div className="w-full">
            <div className="bg-white ">
              <table className="w-full whitespace-nowrap table-fixed ">
                <thead className="table table-fixed w-full">
                  <tr className="h-14 w-full text-sm leading-none text-font-secondary">
                    <th
                      className="font-normal text-left w-[200px] pl-3 cursor-pointer bg-white"
                      onClick={sortByCompanyName}
                    >
                      Company <BiSort className="inline-flex text-primary" />
                    </th>
                    <th
                      className="font-normal text-left w-[200px] cursor-pointer bg-white"
                      onClick={sortByJobTitle}
                    >
                      Job Title <BiSort className="inline-flex text-primary" />
                    </th>
                    <th
                      className="font-normal text-left w-[180px] cursor-pointer bg-white"
                      onClick={sortByStatus}
                    >
                      Status <BiSort className="inline-flex text-primary" />
                    </th>
                    <th
                      className="font-normal text-left cursor-pointer bg-white"
                      onClick={sortByDate}
                    >
                      Created <BiSort className="inline-flex text-primary" />
                    </th>
                    <th className="font-normal text-left w-[50px] bg-white"></th>
                  </tr>
                </thead>
                <tbody className="w-full h-[460px] overflow-y-auto block">
                  {data?.applications?.map((v, i) => (
                    <tr
                      key={`${v.companyName}-${i}`}
                      onClick={() => handleSelectApplication(i)}
                      className="h-16 text-sm leading-none text-gray-700 border-t border-gray-100 bg-white table table-fixed w-full cursor-pointer"
                    >
                      <td className="pl-3 overflow-hidden text-ellipsis w-[200px] bg-white">
                        <div className="flex items-center">
                          {!v.logoImg || v.logoImg === "NA" ? (
                            <div className="avatar placeholder mr-2">
                              <div className="bg-neutral-focus text-neutral-content rounded w-8">
                                <span>{v.companyName?.charAt(0)}</span>
                              </div>
                            </div>
                          ) : (
                            <img
                              className="mask mask-square rounded w-8 h-8 mr-3"
                              src={`data:image/png;base64,${v.logoImg}`}
                            />
                          )}
                          <p className="truncate text-font-primary font-light">
                            {v.companyName}
                          </p>
                        </div>
                      </td>
                      <td className="overflow-hidden text-ellipsis w-[200px] bg-white">
                        <p className="mr-5 truncate text-font-primary font-light">
                          {v.title}
                        </p>
                      </td>
                      <td className="w-[180px] bg-white">
                        <StatusPill status={v.status} />
                      </td>
                      <td
                        onClick={() => handleSelectApplication(i)}
                        className="bg-white"
                      >
                        <p className="text-font-primary font-light">
                          {v?.date ? format(v.date, "MM/dd/yy") : "NA"}
                        </p>
                      </td>
                      <td className="cursor-pointer w-[50px] bg-white">
                        <FiEdit className="inline-flex text-sm text-font-primary font-light" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showDetails && (
        <ApplicationDetails
          handleClickBack={() => setShowDetails(false)}
          selectedApplication={selectedApplication}
          data={data}
        />
      )}
    </>
  );
};

export default ApplicationsTable;
