import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";
import "./styles/bs.css";

import { Theme } from "./components/Theme";

import { App } from "./pages/App";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { ToastBox } from "./components/Toast";
import { Register } from "./pages/Register";
import { Monitor } from "./pages/Monitor";
import { ViewMonitor } from "./pages/ViewMonitor";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Theme />
    <ToastBox />
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Monitor />} />
        <Route path="/dashboard/monitors" element={<Monitor />} />
        <Route path="/dashboard/monitors/:id" element={<ViewMonitor />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </>,
);
