import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import { UserContextProvider } from "./UserContext";
import './App.css';
const App = () => {
  return (
    <UserContextProvider>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      </main>
    </UserContextProvider>
  );
}

export default App;
