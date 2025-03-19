import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from 'sonner';
function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        {/* Wrap Home inside UserLayout using Outlet */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
