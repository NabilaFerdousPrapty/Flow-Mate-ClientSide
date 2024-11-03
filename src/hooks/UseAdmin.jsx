import { useQuery } from "@tanstack/react-query";

import { useSelector } from "react-redux";
import UseAxiosCommon from "./UseAxiosCommon";


const UseAdmin = () => {
    const user = useSelector((state) => state.auth.user);
    // console.log(user);
    
    const axiosCommon=UseAxiosCommon();
    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        queryKey: [user?.email,'isAdmin'],
        queryFn: async () => {
            const response=await axiosCommon.get(`/users/admin/${user.email}`)
            console.log(response.data);
            return response.data?.admin;
        },
    })
    return [isAdmin,isAdminLoading]
};

export default UseAdmin;