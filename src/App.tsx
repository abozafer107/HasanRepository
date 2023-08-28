import './App.css';
import axios from 'axios';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home/Home';
import RootLayout from './Layouts/rootLayout';
import Users from './Pages/Users/Users';
import Posts from './Pages/Posts/Posts';
import Tags from './Pages/Tags/Tags';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <RootLayout /> }>
      <Route path="/" element={ <Home />} />
      <Route path="/users" element={ <Users /> } />
      <Route path="/posts" element={<Posts />} />
      <Route path="/tags" element={<Tags />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={ router } />
  );
}

export default App
