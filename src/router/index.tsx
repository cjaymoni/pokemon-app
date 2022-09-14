import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../layout/layout";
import NotFound from "../views/404";
import DetailsPage from "../views/DetailsPage";
import ListingPage from "../views/ListingPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<ListingPage />} />
          <Route path="pokemon/:pokemonName" element={<DetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
