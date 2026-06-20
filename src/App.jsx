import { Routes, Route } from "react-router-dom";
import CornerFlag from "./components/CornerFlag.jsx";
import Landing from "./pages/Landing.jsx";
import WorkSample from "./pages/WorkSample.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work/:slug" element={<WorkSample />} />
      </Routes>

      {/* Small South Sudan flag badge in the bottom-right corner. */}
      <CornerFlag />
    </>
  );
}
