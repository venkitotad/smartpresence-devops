import React, { useEffect } from "react";
import { SignUp, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      //When sign-up completes, go to PostLoginRedirect
      navigate("/post-login");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">

        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/post-login"
         appearance={{
          elements: {
            card: "shadow-none border border-gray-200", // optional styling
            headerSubtitle: "hidden", 
          },
        }}
        />
      </div>
  );
}
