import { useQuery } from "@tanstack/react-query";
import UseAxiosCommon from "./UseAxiosCommon";
import { useSelector } from "react-redux";

const UserTeamName = () => {
    const axiosCommon = UseAxiosCommon();
    const user = useSelector((state) => state.auth.user);
    const email = user?.email;

    // Fetch user teams using react-query
    const { data: teams = [], isLoading, error, refetch } = useQuery({
        queryKey: ['teams', email],
        queryFn: async () => {
            const res = await axiosCommon.get(`/teams?userEmail=${email}`);
            return res.data;
        },
        enabled: !!email, // Only run the query if email is available
    });

    // Return relevant values from the hook
    return {
        teams,
        isLoading,
        error,
        refetch
    };
};

export default UserTeamName;
