import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Settings from "./pages/Settings.jsx";

function App() {
    return (
        <Routes>
            {/*Route publique*/}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*Route protégées par token*/}
            <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>}/>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
            {/*404*/}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
