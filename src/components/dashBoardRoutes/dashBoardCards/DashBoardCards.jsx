

import { useNavigate } from "react-router-dom";
import line from '../../../assets/line.png.png'
import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useSelector } from "react-redux";
import { useState } from "react";

const DashBoardCards = () => {
  const navigate = useNavigate();

  // Sample card data (could be dynamic or fetched from API)
  const axiosCommon = UseAxiosCommon();
  const userEmail = useSelector((state) => state.auth.user?.email);



  // Fetching paid user data
  const {
    data: task = [], // Default to an empty array
    isLoading,
    isError,

  } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/createTask/task-count/${userEmail}`);
      console.log(data)
      return data;
    },
  });


  // Handle loading state
  if (isLoading) {
    return <div>Loading paid user data...</div>;
  }

  // Handle error state
  if (isError) {
    return <div>Error fetching paid user data.</div>;
  }

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the respective page when a card is clicked
  };



  return (

    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-4 py-8">
        {/* All Tasks Card */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold">All Tasks</h3>
          <p className="text-4xl mt-4">{task.totalTasks}</p>
        </div>

        {/* Completed Tasks Card */}
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold">Completed Tasks</h3>
          <p className="text-4xl mt-4">{task.done}</p>
        </div>

        {/* In Progress Tasks Card */}
        <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold">In Progress Tasks</h3>
          <p className="text-4xl mt-4">{task.inProgress}</p>
        </div>

        {/* To-do Tasks Card */}
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold">To-do Tasks</h3>
          <p className="text-4xl mt-4">{task.todo}</p>
        </div>
      </div>






    </div>
  );
};

export default DashBoardCards;





// // export default DashBoardCards;
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux"; // Assuming you're using Redux to get user data

// // Function to fetch tasks from your API
// const fetchTasks = async () => {
//   const response = await fetch('https://flowmate-a-team-collaboration-tool.vercel.app/createTask');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

// const DashBoardCards = () => {
//   // Get the user's email from the Redux store
//   const userEmail = useSelector((state) => state.auth.user?.email); // Adjust according to your state structure

//   // Fetch tasks using TanStack Query
//   const { data: tasks = [], isLoading, error } = useQuery({
//     queryKey: ['tasks'],
//     queryFn: fetchTasks,
//   });

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading tasks</div>;
//   }

//   // Filter tasks based on the current user's email and "todo" stage
//   const filteredTodos = tasks.filter(
//     (todo) => todo.stage === "todo" && todo.email === userEmail // Adjust the filter condition
//   );

//   return (
//     <div className="p-4 w-80 mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-lg font-semibold text-gray-700 mb-4">Todos for {userEmail}</h2>

//       {/* Show message if there are no todos */}
//       {filteredTodos.length === 0 ? (
//         <div className="text-gray-500">No tasks added recently for this user</div>
//       ) : (
//         // Display the filtered todos
//         filteredTodos.map((todo) => (
//           <div
//             key={todo._id} // Use _id for uniqueness
//             className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
//           >
//             <span
//               className={`text-gray-800 ${todo.completed ? "line-through" : ""}`}
//             >
//               {todo.taskTitle.slice(0, 35)} {/* Display the task title */}
//             </span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DashBoardCards;
