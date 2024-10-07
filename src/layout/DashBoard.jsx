import DashBoardNav from "@/components/dashBoardShared/dashBoardNav/DashBoardNav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { clearUser, setLoading, setUser } from "../redux/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { PacmanLoader } from "react-spinners";

const DashBoard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    // Set loading to true initially
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          })
        );
      } else {
        dispatch(clearUser());
      }
      // Set loading to false once auth state is determined
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#2196F3" size={50} />
      </div>
    );
  }
  return (
    <div className="min-h-screen  mx-auto flex lg:flex-row flex-col bg-gray-100">
      <DashBoardNav />
      <Outlet />
    </div>
  );
};

export default DashBoard;
