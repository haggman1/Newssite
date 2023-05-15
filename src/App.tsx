import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import { Navbar } from "./components/navbar";
// import { HomeView } from "./views/HomeView";
import { Suspense } from "react";
import { ViewCategories } from "./views/viewCategories";
import { ViewSearch } from "./views/ViewSearch";
import { ShareArticle } from "./components/shareArticle";
import { ToppNyheter } from "./views/ToppNyheter";
import { SenasteNytt } from "./views/SenasteNytt";



function App() {
  return (
    <div className="relative">
      <Suspense fallback={<div>Laddar...</div>}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<HomeView />} /> */}
            <Route path="/" element={<ToppNyheter />} />
            <Route path="/article/:id" element={<ShareArticle/>} />
            <Route path="/viewCategory/:id" element={<ViewCategories />} />
            <Route path="/search/:keyword" element={<ViewSearch />} />
            <Route path="/Senaste-nytt" element={<SenasteNytt />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
