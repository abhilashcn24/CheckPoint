import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainScreen from "./pages/MainScreen";
import Results from "./pages/Results";
import ProductionPage from "./pages/ProductionPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/results" element={<Results />} />
        <Route path="/production" element={<ProductionPage />} />
      </Routes>
    </Router>
  );
}
