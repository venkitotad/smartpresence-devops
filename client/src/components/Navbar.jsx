import React, { useState } from "react";
import { GraduationCap, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isAccessDenied = location.pathname === "/access-denied";

  if (isAccessDenied) return null;

  const handleLogin = (role) => {
    localStorage.setItem("tempRole", role);
    setOpen(false);
    navigate("/sign-in");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-3 border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <span className="font-semibold text-lg md:text-xl">
          SmartPresence
        </span>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex gap-3 items-center">
        {!isLoaded ? (
          <div className="w-[100px] h-[30px]" />
        ) : !isSignedIn ? (
          <>
            <Button variant="outline" onClick={() => handleLogin("student")}>
              Student Login
            </Button>
            <Button
              className="bg-pink-700 hover:bg-pink-900 text-white"
              onClick={() => handleLogin("staff")}
            >
              Staff Login
            </Button>
          </>
        ) : (
          <UserButton afterSignOutUrl="/" />
        )}
      </div>

   {/* Mobile Menu */}
<div className="md:hidden flex items-center gap-3">

  {/* Always show UserButton when signed in */}
  {isSignedIn && <UserButton afterSignOutUrl="/" />}

  {/* Show Menu only when NOT signed in */}
  {!isSignedIn && (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col gap-6 py-8 px-6 bg-white"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-center">
            SmartPresence Menu
          </SheetTitle>
        </SheetHeader>

        {!isLoaded ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="flex flex-col gap-3">
            <Button variant="outline" onClick={() => handleLogin("student")}>
              Student Login
            </Button>
            <Button
              className="bg-pink-800 hover:bg-pink-900 text-white"
              onClick={() => handleLogin("staff")}
            >
              Staff Login
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )}
</div>

    </nav>
  );
}
