import React from 'react';
import './App.css';
import Header from "./static/Header";

import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";
import Footer from "./static/Footer";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Header/>
              <Footer/>
          </BrowserRouter>



      </div>
  );
}
export default App;
