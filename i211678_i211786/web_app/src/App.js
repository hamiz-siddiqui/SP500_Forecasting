import Home from "./pages/Home";
import Compare from "./pages/Comapre";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Compare" element={<Compare/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;