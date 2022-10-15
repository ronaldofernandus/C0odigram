import { Navbar, MainContent } from "./Components/";
import { Login, Register, Profile, EditProfile, DetailPost, ClickedPost, Search } from "./Pages/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="h-[100vh] text-black dark:bg-neutral-900 dark:text-white relative">
        <Navbar />
        <div className="text-center">
          <Routes>
            {/* Home */}
            <Route path="/" element={<MainContent />}></Route>

            {/* Profile */}
            <Route path="profile" >
              <Route path="" element={<Profile />}></Route>
               <Route path="edit" element={<EditProfile/>}>
                {/* <Route path=":id" element={<EditProfile />}></Route> */}
              </Route> 
            </Route>

            {/* Detail Post */}
            <Route path="detail/:id" element={<DetailPost/>}>
              {/* <Route path=":id" element={<EditProfile/>}>
              </Route>  */}
            </Route>

            {/* Clicked Post */}
            <Route path="clicked/:id" element={<ClickedPost/>}>
              {/* <Route path=":id" element={<EditProfile/>}>
              </Route>  */}
            </Route>

            {/* search */}
            <Route path="/search/:query" element={<Search />} />

            {/* Register */}
            <Route path="register" element={<Register />}></Route>

            {/* Login */}
            <Route path="login" element={<Login />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
