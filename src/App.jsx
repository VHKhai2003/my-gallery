import { BrowserRouter, Routes, Route } from "react-router-dom";
import GridPhotos from "./components/GridPhotos";
import PhotoDetail from "./components/PhotoDetail";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photos" element={<GridPhotos />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
