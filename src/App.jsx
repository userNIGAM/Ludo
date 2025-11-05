import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LudoBoard from "./Components/LudoBoard";

function App() {
  return (
    <>
      {/* <div className="container">
        <div className="box">
          <div className="ludo">
            <div className="red-box"></div>
              <div className="green-box"></div>
              <div className="blue-box"></div>
              <div className="yellow-box"></div> 
           </div>
        </div>
      </div> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LudoBoard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
