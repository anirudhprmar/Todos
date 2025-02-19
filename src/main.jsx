import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css'

// Import components for routes
import { ActualTodo } from './pages/ActualTodo.jsx';
import InProgress from './components/InProgress';
import Reflect from './components/Reflect';
import WeeklyGoals from './components/WeeklyGoals';
import QuarterlyGoals from './components/QuarterlyGoals';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ActualTodo />} />
          <Route path="myday" element={<ActualTodo />} />
          <Route path="inprogress" element={<InProgress />} />
          <Route path="reflect" element={<Reflect />} />
          <Route path="weekly-goals" element={<WeeklyGoals />} />
          <Route path="quarterly-goals" element={<QuarterlyGoals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);