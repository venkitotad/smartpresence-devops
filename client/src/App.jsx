import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SignUpPage from "./components/SignUpPage.jsx";
import SignInPage from "./components/SignInPage.jsx";
import StaffDashboard from "./pages/staff/StaffDashboard.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import PostLoginRedirect from "./pages/PostLoginRedirect.jsx";
import QuickGuide from "./pages/QuickGuide.jsx";
import TokenTest from "./components/TokenTest.jsx";
import AccessDenied from "./pages/AccessDenied.jsx";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Classes from "./pages/staff/Classes.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import MonthlySummary from "./components/charts/MonthlySummary.jsx";
import MonthlyAttendanceChart from "./components/charts/MonthlyAttendanceChart.jsx";
import Students from "./components/Students.jsx"; 

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <Navbar />

      <Routes>
        {/*  PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />
        <Route path="/post-login" element={<PostLoginRedirect />} />
        <Route path="/token" element={<TokenTest />} />
        <Route path="/guide" element={<QuickGuide />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/*  STUDENT DASHBOARD */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/*  STAFF DASHBOARD + CLASSES (WITH LAYOUT) */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* nested routes*/}
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="classes" element={<Classes />} />
          <Route path="students" element={<Students />} />
          <Route path="month/report" element={<MonthlyAttendanceChart/>} />
        </Route>

        {/*  404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <Footer />
    </>
  );
}
