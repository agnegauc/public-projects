import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddParticipant } from "../AddParticipant";
import { AuthContext } from "../AuthContext";
import { Events } from "../Events";
import { Header } from "../Header/Header";
import { Login } from "../Login";
import { Participants } from "../Participants";
import { RouteAuthorisation } from "../RouteAuthorisation";

export const MainRouter = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      {isAuthenticated ? <Header /> : <></>}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/events"
          element={
            <RouteAuthorisation>
              <Events />
            </RouteAuthorisation>
          }
        />
        <Route
          path="/participants"
          element={
            <RouteAuthorisation>
              <Participants />
            </RouteAuthorisation>
          }
        />
        <Route
          path="/add-participant"
          element={
            <RouteAuthorisation>
              <AddParticipant />
            </RouteAuthorisation>
          }
        />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
