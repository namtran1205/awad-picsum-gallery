import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhotoList from "./pages/PhotoList";
import PhotoDetail from "./pages/PhotoDetail";
import { PhotoProvider } from "./context/PhotoContext";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <PhotoProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/photos" />} />
          <Route element={<Layout />}>
            <Route path="/photos" element={<PhotoList />} />
            <Route path="/photos/:id" element={<PhotoDetail />} />
          </Route>
        </Routes>
      </PhotoProvider>
    </BrowserRouter>
  );
}