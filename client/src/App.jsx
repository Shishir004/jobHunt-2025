import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar.jsx";
import Login from "./components/shared/Login.jsx";
import Signup from "./components/shared/SignUp.jsx";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store.js";

// Pages
import Home from "./components/Home.jsx";
import AllJobs from "./components/AllJobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Company from "./components/Company.jsx";
import NewComapny from "./components/NewComapny.jsx";
import SingleCompany from "./components/SingleCompany.jsx";
import AdminJobs from "./components/AdminJobs.jsx";
import PostJob from "./components/PostJob.jsx";
import TotalApplicants from "./components/TotalApplicants.jsx";

// Protection
import ProtectedRoute from "./components/Protectected.jsx";

// Sample Profile
const userProfile = {
  fullName: "Alex Doe",
  bio: "Experienced frontend developer with a passion for creating beautiful, intuitive, and functional user interfaces. Specializing in React and modern JavaScript frameworks.",
  email: "alex.doe@email.com",
  phone: "+1 (555) 123-4567",
  skills: ["HTML5", "CSS3", "TailwindCSS", "JavaScript (ES6+)", "React", "Next.js", "Node.js"],
  resume: "Alex_Doe_Resume_2024",
};

function App() {
  return (
    <div className="bg-[#0D1117] min-h-screen font-sans text-gray-300">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/all/jobs" element={<AllJobs />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/description/:id" element={<JobDescription />} />

            {/* Protected Route - Logged In Users */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile profile={userProfile} />
                </ProtectedRoute>
              }
            />

            {/* Admin Only Routes */}
            <Route
              path="/admin/company"
              element={
                <ProtectedRoute allowedRoles={["RECRUITER"]}>
                  <Company />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create/new/Company"
              element={
                <ProtectedRoute allowedRoles={["RECRUITER"]}>
                  <NewComapny />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create/new/Company/:id"
              element={
                <ProtectedRoute allowedRoles={["RECRUITER"]}>
                  <SingleCompany />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs/create"
              element={
                <ProtectedRoute allowedRoles={["RECRUITER"]}>
                  <AdminJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/jobs/post"
              element={
                <ProtectedRoute allowedRoles={["RECRUITER"]}>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/total/applicants/:id"
              element={
                <ProtectedRoute allowedRoles={["RECRUITER"]}>
                  <TotalApplicants />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
