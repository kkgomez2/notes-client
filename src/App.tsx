import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import IdeaDetailPage from "./pages/IdeaDetailPage";

function App() {
  //[background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/idea/:id" element={<IdeaDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
