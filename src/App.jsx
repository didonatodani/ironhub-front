import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import PostsPage from "./pages/PostsPage/PostsPage.jsx";
import PostDetailsPage from "./pages/PostDetailsPage/PostDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

// just testing components:
import PostForm from "./components/Forms/PostForm.jsx";
import ReplyForm from "./components/Forms/ReplyForm.jsx";
import LoginForm from "./components/Forms/LoginForm.jsx";
import SignupForm from "./components/Forms/SignupForm.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<PostDetailsPage />} />
        <Route path="/:userId" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
        {/* just for now!!! */}
        <Route path="/test" element={<ReplyForm />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
