import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import PostsPage from "./pages/PostsPage/PostsPage.jsx";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SignupForm from "./components/Forms/SignupForm.jsx";
import LoginForm from "./components/Forms/LoginForm.jsx";
import IsPrivate from "./components/IsPrivate/IsPrivate.jsx";
import IsPublic from "./components/IsPublic/IsPublic.jsx";

// just testing components:
import PostForm from "./components/Forms/PostForm.jsx";
import ReplyForm from "./components/Forms/ReplyForm.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth/signup" element={<IsPublic><SignupForm /></IsPublic>} />
        <Route path="/auth/login" element={<IsPublic><LoginForm /></IsPublic>} />
        <Route path="/posts" element={<IsPrivate><PostsPage /></IsPrivate>} />
        <Route path="/posts/:_id" element={<IsPrivate><PostDetailsPage /></IsPrivate>} />
        <Route path="/:userId" element={<IsPrivate><ProfilePage /></IsPrivate>} />
        <Route path="*" element={<ErrorPage />} />
        
        {/* just for now!!! */}
        <Route path="/test" element={<ReplyForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
