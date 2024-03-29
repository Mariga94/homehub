import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Home, Listing, SingleListing, ForSale, ForRent } from "./_root/pages";
import "./App.css";
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "@/_auth/forms/SignIn";
import SignUpForm from "@/_auth/forms/SignUp";
import DashBoard from "./_dashboard/pages/Dashboard";
import DashboardLayout from "./_dashboard/DashboardLayout";
import Profile from "./_dashboard/pages/Profile";
import MyListing from "./_dashboard/pages/MyListing";
import Favourites from "./_dashboard/pages/Favourite";
import CreateListing from "./_dashboard/pages/CreateListing";
import ProtectedRoute from "./privateRoute";
import Error from "./_404/Error";
import MySingleListing from "./_dashboard/pages/MySingleListing";
// import { AuthProvider } from "../context/AuthContext";
function App() {
  return (
    <main className="flex">
      {/* <AuthProvider> */}
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listing/:id" element={<SingleListing />} />
          <Route path="/listing/for-sale" element={<ForSale />} />
          <Route path="/listing/for-sale/:id" element={<SingleListing />} />
          <Route path="/listing/for-rent" element={<ForRent />} />
          <Route path="/listing/for-rent/:id" element={<SingleListing />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute redirectTo="/">
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-profile"
            element={
              <ProtectedRoute redirectTo="/">
                
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-listing"
            element={
              <ProtectedRoute redirectTo="/">
                <MyListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-listing/:id"
            element={
              <ProtectedRoute redirectTo="/">
               <MySingleListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/create-listing"
            element={
              <ProtectedRoute redirectTo="/">
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-favourites"
            element={
              <ProtectedRoute redirectTo="/">
                <Favourites />
              </ProtectedRoute>
            }
          />
          
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
