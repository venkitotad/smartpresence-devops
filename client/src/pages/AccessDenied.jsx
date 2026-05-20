import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

export default function AccessDenied() {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  useEffect(() => {
    (async () => {
      try {
        await signOut({ redirect: false }); 
      } catch (err) {
        console.error("Sign-out failed:", err);
      }
    })();
  }, [signOut]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        You don’t have permission to access this page.  
        Please sign in with the correct account.
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => navigate("/")}>
          Return Home
        </Button>
        <Button
          className="bg-pink-700 hover:bg-pink-900 text-white"
          onClick={() => navigate("/sign-in")}
        >
          Sign in Again
        </Button>
      </div>
    </div>
  );
}
