import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import Loader from "@/utlities/Loader";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import { EditTeam } from "../editTeam/EditTeam";

const MyTeam = () => {
  const user = useSelector((state) => state.auth.user);
  const axiosCommon = UseAxiosCommon();

  // Fetch user teams using react-query
  const { data: teams = [], isLoading, error, refetch } = useQuery({
    queryKey: ['teams', user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/teams`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: users = [], isError } = useQuery({
    queryKey: ['data', user?.email],
    queryFn: async () => {
      const res = await axiosCommon.get(`/users?email=${user.email}`);
      return Array.isArray(res.data) ? res.data : [res.data]; 
    },
    enabled: !!user?.email,
  });
  
  const currentUser = users.length > 0 ? users[0] : null;

  // Handle team deletion
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosCommon.delete(`/create-team/${id}`);
        Swal.fire("Deleted!", "Your team has been deleted.", "success");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      Swal.fire("Error!", "There was an error deleting the team.", "error");
    }
  };
  // Show loader or error message
  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const userId = currentUser?._id; 
  const currentUserTeams = teams.filter(team => team.teamMembers.includes(userId));

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-start opacity-80 text-gray-500">Total Teams ({currentUserTeams.length})</h2>
      {currentUserTeams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentUserTeams.map((team) => (
            <div key={team._id} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
              <h3 className="text-2xl font-bold mb-2">
                <Link to={`/dashboard/team/${team?.teamName}`} className="hover:underline">
                  {team?.teamName}
                </Link>
              </h3>
              <p className="text-white opacity-80 text-[16px]">Admin: {team.displayName}</p>
              <p className="text-white opacity-70 mb-4 text-[16px]">Members: {team.teamMembers.length}</p>
              
              {/* Show Edit/Delete buttons if the user is the team leader */}
              {team.teamLeader === currentUser?._id && (
                <div className="flex justify-start mt-4 space-x-4">
                  <EditTeam
                    currentUserTeams={team}
                    refetch={refetch}
                    className="flex items-center bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <FaEdit className="mr-1" /> 
                  </EditTeam>
                  <button
                    className="flex items-center bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    onClick={() => handleDelete(team._id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          {user?.email ? `No teams found for ${user?.email}` : "Please log in to see your teams."}
        </p>
      )}
    </div>
  );
};

export default MyTeam;
