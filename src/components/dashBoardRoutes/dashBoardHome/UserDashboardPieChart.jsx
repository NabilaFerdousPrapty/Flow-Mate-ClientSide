import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useQuery } from "@tanstack/react-query";

import { useSelector } from "react-redux";
import { Chart as ChartJS } from 'chart.js/auto';
import UseAxiosCommon from '@/hooks/UseAxiosCommon';

const UserDashboardPieChart = () => {
  const axiosCommon = UseAxiosCommon();
  const userEmail = useSelector((state) => state.auth.user?.email);

  // Fetching task data
  const {
    data: task = {}, // Default to an empty object
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/createTask/task-count/${userEmail}`);
      console.log(data);
      return data;
    },
    enabled: !!userEmail, // Only fetch if userEmail is available
  });

  // Handle loading state
  if (isLoading) {
    return <div>Loading tasks data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching tasks data.</div>;
  }

  // Prepare data for the Pie chart
  const pieData = {
    labels: ['All Tasks', 'Completed Tasks', 'In Progress Tasks', 'To-do Tasks'],
    datasets: [
      {
        data: [task.totalTasks || 0, task.done || 0, task.inProgress || 0, task.todo || 0],
        backgroundColor: ['#36A2EB', '#4CAF50', '#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#4CAF50', '#FFCE56', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">Task Distribution</h2>
      <div className="relative w-full h-96 p-4 bg-white shadow-md rounded-md">
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
};

export default UserDashboardPieChart;