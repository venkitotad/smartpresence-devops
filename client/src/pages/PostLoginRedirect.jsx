import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { api, useClerkToken } from "../utils/api";
import { Loader } from "lucide-react";

export default function PostLoginRedirect() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const getToken = useClerkToken();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    (async () => {
      try {
        const intendedRole = localStorage.getItem("tempRole") || "student";
        const token = await getToken();

        const res = await api.post(
          "/api/users/sync",
          {
            role: intendedRole,
            fullName: user.fullName || user.username || "Unknown User",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        localStorage.removeItem("tempRole");

        const actualRole = res.data?.user?.role || intendedRole;

        // If mismatch => access denied
        if (actualRole !== intendedRole) {
          navigate("/access-denied");
          return;
        }

        // Good -> redirect to relevant dashboard
        navigate(`/${actualRole}/dashboard`);
      } catch (err) {
        console.error("PostLoginRedirect error:", err);
        navigate("/access-denied");
      }
    })();
  }, [isLoaded, isSignedIn, navigate, getToken, user, signOut]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <Loader className="w-8 h-8 animate-spin mb-3" />
      <p className="text-sm"></p>
    </div>
  );
}
