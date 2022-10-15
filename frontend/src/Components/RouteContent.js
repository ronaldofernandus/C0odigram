import React from "react";
import { Routes, Route } from "react-router-dom";
import MainContent from "./MainContent";
import {
  Profile,
  EditProfile,
  DetailPost,
  ClickedPost,
  Search,
} from "../Pages";

const RouteContent = () => {
  return (
    <Routes>
      <Route path="/content" element={<MainContent />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="profile">
        <Route path="" element={<Profile />}></Route>
        <Route path="edit" element={<EditProfile />}></Route>
      </Route>

      <Route path="detail/:id" element={<DetailPost />}></Route>

      <Route path="clicked/:id" element={<ClickedPost />}></Route>
    </Routes>
  );
};

export default RouteContent;
