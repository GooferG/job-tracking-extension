import React, { useState, useEffect } from 'react';
import { LineChart } from './LineChart';
import { DoughnutChart } from './DoughnutChart';
import DashboardContent from './DashboardContent';
import { UserAuth } from '../context/AuthContext';
import _ from 'lodash';
import { format } from 'date-fns';

const Dashboard = () => {
  const [dateCount, setDateCount] = useState([]);
  const [statusCount, setStatusCount] = useState([]);
  const { data } = UserAuth();

  const sortByDate = data?.applications?.sort((a, b) =>
    a.date > b.date ? 1 : a === b ? 0 : -1
  );

  const dateArr = sortByDate?.map(v => format(v.date, 'MM/dd'));

  const statusArr = sortByDate?.map(v => v.status);

  useEffect(() => {
    setDateCount(_.countBy(dateArr));
    setStatusCount(_.countBy(statusArr));

    return () => {
      setDateCount([]);
      setStatusCount([]);
    };
  }, [data]);

  return (
    <div className="flex justify-between mt-2">
      <DashboardContent />

      <div className="flex flex-col justify-between gap-4 h-[416px]">
        <div className="card w-[310px] bg-base-100 p-2 max-h-[200px] h-[200px] rounded border border-primary-border">
          <div className="card-body p-0 gap-0 max-h-[175px] h-[175px]">
            <p className="font-bold text-xs mb-1 pl-1">Applications</p>
            <LineChart values={dateCount} />
          </div>
        </div>
        <div className="card w-[310px] bg-base-100 p-2 max-h-[200px] h-[200px] rounded border border-primary-border">
          <div className="card-body p-0 gap-0 max-h-[150px] h-[150px]">
            <p className="font-bold text-xs mb-1 pl-1">Status</p>
            <DoughnutChart values={statusCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
