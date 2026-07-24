import { navigate, Route, Routes } from "react-router-dom";
import navbar from "./components/Navbar";
import CreateGroup from "./pages/CreateGroup";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import Groups from "./pages/Groups";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import { isLoggedIn } from "./utils/storage";

function ProtectedLayout({ children }) {
  if (!isLoggedIn()) {
    return <navigate to="/login" replace />;
  }

  return (
    <>
      <navbar />
      <main>{children}</main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn() ?
            <Navigate to="/dashboard" replace />
          : <Navigate to="/login" replace />
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedLayout>
            <Profile />
          </ProtectedLayout>
        }
      />

      <Route
        path="/groups"
        element={
          <ProtectedLayout>
            <Groups />
          </ProtectedLayout>
        }
      />

      <Route
        path="/groups/:id"
        element={
          <ProtectedLayout>
            <GroupDetails />
          </ProtectedLayout>
        }
      />

      <Route
        path="/create-group"
        element={
          <ProtectedLayout>
            <CreateGroup />
          </ProtectedLayout>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedLayout>
            <Home />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
