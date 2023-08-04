
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
import BlogDetails from './components/BlogDetails';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blogs-details/:id" element={<BlogDetails/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
