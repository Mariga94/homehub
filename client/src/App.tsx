import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Home, Listing, SingleListing, ForSale, ForRent } from "./_root/pages";
import "./App.css";
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "@/_auth/forms/SignIn";
import SignUpForm from "@/_auth/forms/SignUp";

function App() {
  return (
    <main className="flex h-screen">
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
      </Routes>
    </main>
  );
}

export default App;
