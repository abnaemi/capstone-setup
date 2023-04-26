import React from 'react';
import './App.css';
import Header from "./static/Header";

import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Header/>

          </BrowserRouter>



      </div>
  );
}
export default App;
