import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Home = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  // Logged-in users should NOT see Home page
  if (isSignedIn) {
    return <Navigate to="/post-login" replace />;
  }

  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[88vh] bg-gray-50 px-4 sm:px-6 py-10">
      <h1 className="text-4xl sm:text-4xl md:text-6xl font-extrabold mb-3 text-blue-700 leading-tight">
        SmartPresence
      </h1>

      <h2 className="text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-8 max-w-md sm:max-w-xl">
        Attendance made straightforward.
      </h2>

      <Button
        className="text-sm cursor-pointer sm:text-base px-6 py-3 bg-gray-800 text-white hover:bg-black transition"
        onClick={() => navigate("/guide")}
      >
        Quick Guide
      </Button>

      <p className="mt-12 text-gray-500 text-xs sm:text-sm px-4 max-w-md">
        Trying to make attendance simple with SmartPresence.
      </p>
    </section>
  );
};

export default Home;
