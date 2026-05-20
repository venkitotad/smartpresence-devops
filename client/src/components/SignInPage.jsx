import React from "react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center h-screen">
  
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/post-login"
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
