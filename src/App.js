import React from "react";
import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import Home from "./Component/Pages/Home"
import Header from "./Layout/Header"
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css";

  const primeConfig = {
    ripple: true, // enables ripple effect globally
    inputStyle: "filled", // 'outlined' or 'filled'
    locale: "en", // can be customized
  };
function App() {
  return (
  <PrimeReactProvider value={primeConfig}>
    <Router>
        <div className="App">
          <Header/>
          {/* Define Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
   
      </div>
    </Router>
    </PrimeReactProvider>
  );
}

export default App;
