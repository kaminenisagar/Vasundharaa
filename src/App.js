// src/App.jsx
import React, { useState } from 'react';
import TodoApp from './components/TodoApp';
import FormComponent from './components/FormComponent';
import ProgressBar from './components/ProgressBar';
import CountdownTimer from './components/CountdownTimer';
import SearchList from './components/SearchList';
import './styles.css';

function App() {
  const [activeTask, setActiveTask] = useState(1);

  const tasks = [
    { id: 1, name: 'Todo App', component: <TodoApp /> },
    { id: 2, name: 'Form & Password', component: <FormComponent /> },
    { id: 3, name: 'Progress Bar', component: <ProgressBar /> },
    { id: 4, name: 'Countdown Timer', component: <CountdownTimer /> },
    { id: 5, name: 'Live Search', component: <SearchList /> },
  ];

  return (
    <div className="app">
     

      <nav className="task-nav">
        {tasks.map((task) => (
          <button
            key={task.id}
            className={`nav-btn ${activeTask === task.id ? 'active' : ''}`}
            onClick={() => setActiveTask(task.id)}
          >
             {task.name}
          </button>
        ))}
      </nav>

      <main className="task-container">
        <div className="task-header">
          <h2>{tasks.find(t => t.id === activeTask).name}</h2>
        </div>
        <div className="task-content">
          {tasks.find(t => t.id === activeTask).component}
        </div>
      </main>

     
    </div>
  );
}

export default App;