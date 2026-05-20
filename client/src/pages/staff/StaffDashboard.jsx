// import { FiSettings } from "react-icons/fi";

// import Sidebar from "../../components/Sidebar";
// // import ThemeSettings from "../../components/ThemeSettings";
// import { useStateContext } from "../../context/ContextProvider";

// function StaffDashboard() {
//   const {
//     currentMode,
//     activeMenu,
//   } = useStateContext();

//   return (
//     <div className={currentMode === "Dark" ? "dark" : ""}>
//       <div className="flex relative dark:bg-main-dark-bg">


//         {/* ✅ SIDEBAR */}
//         {activeMenu ? (
//           <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
//             <Sidebar />
//           </div>
//         ) : (
//           <div className="w-0 dark:bg-secondary-dark-bg">
//             <Sidebar />
//           </div>
//         )}

//         {/* ✅ MAIN CONTENT */}
//         <div
//           className={
//             activeMenu
//               ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
//               : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
//           }
//         >
//           <div className="p-8">
//             <h1 className="text-3xl font-bold">Staff Dashboard</h1>
//             <p className="text-gray-600 mt-2">
          
//             </p>
//           </div>

   
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StaffDashboard;




import React from "react";

function StaffDashboard() {
  return (
    <div className="p-8">
  
      <p className="text-gray-600 mt-2">
     
      </p>
    </div>
  );
}

export default StaffDashboard;
