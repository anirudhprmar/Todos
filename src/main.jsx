import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css'

// Import components for routes
import ActualTodo from './pages/ActualTodo.jsx';
import InProgress from './pages/InProgress';
import Reflect from './pages/Reflect';
import WeeklyGoals from './pages/WeeklyGoals';
import QuarterlyGoals from './pages/QuarterlyGoals';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ActualTodo />} />
          <Route path="my-day" element={<ActualTodo />} />
          <Route path="in-progress" element={<InProgress />} />
          <Route path="reflect" element={<Reflect />} />
          <Route path="weekly-goals" element={<WeeklyGoals />} />
          <Route path="quarterly-goals" element={<QuarterlyGoals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);