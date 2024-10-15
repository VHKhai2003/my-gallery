import { BrowserRouter, Routes, Route } from "react-router-dom";
import GridPhotos from "./components/GridPhotos";
import PhotoDetail from "./components/PhotoDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GridPhotos />} />
        <Route path="/photos" element={<GridPhotos />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
