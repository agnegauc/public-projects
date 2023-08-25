import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound, Products } from ".."; // du taškai, nes grįžtam vienu folderiu atgal (rodo į index.ts)
import { Header } from "../Header";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
