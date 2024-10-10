import Footer from "@/Shared/footer/Footer";
import Hero from "@/Shared/hero/Hero";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { clearUser, setLoading, setUser } from "../redux/slices/authSlice";
import Navbar from "@/Shared/Navbar";

const Root = () => {
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
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      {/* <Hero/> */}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
