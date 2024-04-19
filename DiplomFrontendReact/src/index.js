import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Header from './Layout/Header';
import MainPage from './Pages/MainPage';
import LeftMenu from './Layout/LeftMenu';
import ChatPage from './Pages/ChatPage';
import FindPeoplePage from './Pages/FindPeoplePage';
import FriendsPage from './Pages/FriendsPage'
import OtherUserPage from './Pages/OtherUserPage'
import NewsPage from './Pages/NewsPage';
import ProductsPage from './Pages/ProductsPage';
import PhotosPage from './Pages/PhotosPage';
import NeuralNetworkPage from './Pages/NeuralNetworkPage'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>


    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="RegisterPage" element={<RegisterPage />} />
      <Route path="LoginPage" element={<LoginPage />} />
      <Route path="MainPage" element={<MainPage />} />
      <Route path="ChatPage/:id" element={<ChatPage />} />
      <Route path="FindPeoplePage" element={<FindPeoplePage />} />
      <Route path="FriendsPage" element={<FriendsPage />} />
      <Route path="OtherUserPage/:id" element={<OtherUserPage />} />
      <Route path="NewsPage" element={<NewsPage />} />
      <Route path="ProductsPage/:type" element={<ProductsPage />} />
      <Route path="PhotosPage" element={<PhotosPage />} />
      <Route path="NeuralNetworkPage" element={<NeuralNetworkPage />} />

    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
