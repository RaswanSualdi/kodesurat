import { KodeSuratProvider } from "./context/kodeSuratContext";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Detail from "./pages/detail";
import Login from "./pages/login";
import Admin from "./pages/admin";

function App() {
    return (
        <KodeSuratProvider>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/:letter" element={<Detail />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
            </Routes>
        </KodeSuratProvider>
    );
}

export default App;
