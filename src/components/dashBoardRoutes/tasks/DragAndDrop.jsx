import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration';

const DragAndDrop = () => {
  const { teamName } = useLoaderData();
  const axiosCommon = UseAxiosCommon();

  // Function to fetch tasks by stage
  const fetchTasksByStage = async (stage) => {
    if (teamName) {
      const { data } = await axiosCommon.get(
        `/createTask/tasksByStage/${teamName}/${stage}`
      );
      return data;
    } else {
      throw new Error("Team name is missing");
    }
  };

  // Fetch tasks for each stage using TanStack Query
  const {
    data: todoTasks = [],
    isLoading: isLoadingTodo,
    error: errorTodo,
    refetch: refetchTodo,
  } = useQuery({
    queryKey: ["tasks", teamName, "todo"],
    queryFn: () => fetchTasksByStage("todo"),
    enabled: !!teamName,
  });

  const {
    data: inProgressTasks = [],
    isLoading: isLoadingInProgress,
    error: errorInProgress,
    refetch: refetchInProgress,
  } = useQuery({
    queryKey: ["tasks", teamName, "in progress"],
    queryFn: () => fetchTasksByStage("in progress"),
    enabled: !!teamName,
  });

  const {
    data: completedTasks = [],
    isLoading: isLoadingCompleted,
    error: errorCompleted,
    refetch: refetchCompleted,
  } = useQuery({
    queryKey: ["tasks", teamName, "done"],
    queryFn: () => fetchTasksByStage("done"),
    enabled: !!teamName,
  });

  // Log the team name
  useEffect(() => {
    console.log("teamName from loader:", teamName);
  }, [teamName]);

  // Render loading states
  if (isLoadingTodo || isLoadingInProgress || isLoadingCompleted) {
    return <div>Loading...</div>;
  }

  // Render error states
  if (errorTodo || errorInProgress || errorCompleted) {
    console.error(
      "Error loading tasks:",
      errorTodo || errorInProgress || errorCompleted
    );
    return (
      <div>
        Error loading tasks:{" "}
        {errorTodo?.message ||
          errorInProgress?.message ||
          errorCompleted?.message}
      </div>
    );
  }

  // Handle drag end event
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Ensure the task has actually moved
    if (source.droppableId !== destination.droppableId) {
      const taskId = source.droppableId; // Use a unique identifier for the task
      const newStage = destination.droppableId; // The new stage ID

      // Make API call to update the task stage
      try {
        await axiosCommon.put("/createTask/updateStage", {
          id: taskId,
          newStage,
        });
        console.log("Task stage updated:", taskId, "to", newStage);
      } catch (error) {
        console.error("Error updating task stage:", error);
        refetchCompleted();
        refetchInProgress();
        refetchTodo();

      }
    }
  };



  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-3 px-5 py-10">

        {/* To Do List */}
        <Droppable droppableId="todoTasks">
          {(provided) => (
            <div
              className="p-4 w-full bg-white rounded-lg shadow-md"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">To Do</h2>
              {todoTasks.length === 0 ? (
                <div className="text-gray-500">No tasks to do</div>
              ) : (
                todoTasks.map((todo, index) => (
                  <Draggable key={todo._id} draggableId={todo._id} index={index}>
                    {(provided) => (
                      <div
                        className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span
                          className={`text-gray-800 ${todo.completed ? "line-through" : ""
                            }`}
                        >
                          {todo.taskTitle.slice(0, 35)}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* In Progress Tasks */}
        <Droppable droppableId="inProgressTasks">
          {(provided) => (
            <div
              className="p-4 w-full bg-white rounded-lg shadow-md"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">In Progress</h2>
              {inProgressTasks.length === 0 ? (
                <div className="text-gray-500">No tasks in progress</div>
              ) : (
                inProgressTasks.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span
                          className={`text-gray-800 ${task.completed ? "line-through" : ""
                            }`}
                        >
                          {task.taskTitle.slice(0, 35)}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Completed Tasks */}
        <Droppable droppableId="completedTasks">
          {(provided) => (
            <div
              className="p-4 w-full bg-white rounded-lg shadow-md"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Completed</h2>
              {completedTasks.length === 0 ? (
                <div className="text-gray-500">No completed tasks</div>
              ) : (
                completedTasks.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        className="p-2 mb-2 bg-gray-100 rounded-md flex justify-between items-center"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span
                          className={`text-gray-800 ${task.completed ? "line-through" : ""
                            }`}
                        >
                          {task.taskTitle.slice(0, 35)}
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

      </div>
    </DragDropContext>
  );
};

export default DragAndDrop;
