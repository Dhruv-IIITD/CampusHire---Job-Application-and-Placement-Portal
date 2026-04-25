import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import JobDetails from "./components/JobDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import FindJobs from "./pages/FindJobs";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PostJobPage from "./pages/PostJobPage";
import PostedJobsPage from "./pages/PostedJobsPage";
import RecruiterDashboardPage from "./pages/RecruiterDashboardPage";
import SignUpPage from "./pages/SignUpPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import UserProfilePage from "./pages/UserProfilePage";
import SavedJobs from "./components/SavedJobs";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/find-jobs" element={<Navigate to="/jobs" replace />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/apply-jobs/:jobId" element={<JobDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute roles={["STUDENT"]}>
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute roles={["STUDENT"]}>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute roles={["STUDENT"]}>
              <div className="min-h-screen">
                <Header />
                <SavedJobs />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute roles={["STUDENT"]}>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute roles={["RECRUITER", "ADMIN"]}>
              <RecruiterDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-jobs"
          element={
            <ProtectedRoute roles={["RECRUITER", "ADMIN"]}>
              <PostJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-jobs/:jobId"
          element={
            <ProtectedRoute roles={["RECRUITER", "ADMIN"]}>
              <PostJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posted-jobs"
          element={
            <ProtectedRoute roles={["RECRUITER", "ADMIN"]}>
              <PostedJobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applicants/:jobId"
          element={
            <ProtectedRoute roles={["RECRUITER", "ADMIN"]}>
              <ApplicantsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
