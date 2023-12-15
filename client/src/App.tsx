import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Home, Listing, SingleListing, ForSale, ForRent } from "./_root/pages";
import "./App.css";

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
      </Routes>
    </main>
  );
}

export default App;
