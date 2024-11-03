import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "@/Shared/Navbar"; // Ensure the correct import path for your Navbar component
import Footer from "@/Shared/footer/Footer"; // Ensure the correct import path for your Footer component
import Hero from "@/Shared/hero/Hero"; // Ensure the correct import path for your Hero component if used
import { clearUser, fetchCurrentUser, setLoading, setUser } from "@/redux/slices/authSlice";
import auth from "../../Firebase/Firebase.config";

const Root = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    // Set loading to true initially
    dispatch(setLoading(true));

    // Call fetchCurrentUser to determine the auth state
    dispatch(fetchCurrentUser());

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, set user info in Redux store
        dispatch(setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        }));
      } else {
        // User is signed out, clear user info in Redux store
        dispatch(clearUser());
      }
      // Set loading to false once auth state is determined
      dispatch(setLoading(false));
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;
