import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  if (!isSignedIn) return <Navigate to="/sign-in" />;

  const actualRole = user.publicMetadata?.role;

  if (role && actualRole !== role) {
    return <Navigate to="/access-denied" />;
  }

  return children;
}
