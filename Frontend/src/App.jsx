
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./Components/Layout/UserLayout";
import AdminLayout from "./Components/Layout/AdminLayout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />} />
          <Route  path="/admin" element ={<AdminLayout/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
