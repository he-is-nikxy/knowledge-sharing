import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import NewArticle from "./pages/NewArticle";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/App.css";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <h1>Welcome to Knowledge Share</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <Articles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles/new"
          element={<ProtectedRoute><NewArticle /></ProtectedRoute>}
        />
        <Route
          path="/articles/:id"
          element={<ProtectedRoute><ArticleDetail /></ProtectedRoute>}
        />
        <Route path="/articles/edit/:id" element={<EditArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
