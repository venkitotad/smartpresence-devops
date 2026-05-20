import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t py-6 bg-white text-center text-gray-600 mt-auto">
      <p className="text-sm">
        © {new Date().getFullYear()} SmartPresence.
      </p>
    </footer>
  );
};

export default Footer;
