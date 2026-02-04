import { useEffect, useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        completed: false,
        priority,
      },
    ]);
    setText("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Complete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  /* ================= INLINE STYLES ================= */

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
    },
    container: {
      background: "#fff",
      width: "420px",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    },
    title: {
      textAlign: "center",
      marginBottom: "15px",
    },
    form: {
      display: "flex",
      gap: "8px",
      marginBottom: "15px",
    },
    input: {
      flex: 1,
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    select: {
      padding: "8px",
      borderRadius: "5px",
    },
    addBtn: {
      background: "#667eea",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    filters: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "15px",
    },
    filterBtn: {
      flex: 1,
      margin: "0 4px",
      padding: "6px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      background: "#e2e8f0",
    },
    list: {
      listStyle: "none",
      padding: 0,
    },
    task: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px",
      borderBottom: "1px solid #eee",
    },
    taskText: {
      flex: 1,
    },
    completed: {
      textDecoration: "line-through",
      color: "gray",
    },
    deleteBtn: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  const priorityColor = {
    Low: "5px solid green",
    Medium: "5px solid orange",
    High: "5px solid red",
  };

  /* ================= JSX ================= */

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>✅ Todo App</h1>

        {/* Add Task */}
        <form onSubmit={addTask} style={styles.form}>
          <input
            type="text"
            placeholder="Add a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={styles.input}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.select}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button type="submit" style={styles.addBtn}>
            Add
          </button>
        </form>

        {/* Filters */}
        <div style={styles.filters}>
          <button style={styles.filterBtn} onClick={() => setFilter("All")}>
            All
          </button>
          <button style={styles.filterBtn} onClick={() => setFilter("Active")}>
            Active
          </button>
          <button
            style={styles.filterBtn}
            onClick={() => setFilter("Completed")}
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        <ul style={styles.list}>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              style={{
                ...styles.task,
                borderLeft: priorityColor[task.priority],
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />

              <span
                style={{
                  ...styles.taskText,
                  ...(task.completed ? styles.completed : {}),
                }}
              >
                {task.text}
              </span>

              <small>{task.priority}</small>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteTask(task.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoApp;
