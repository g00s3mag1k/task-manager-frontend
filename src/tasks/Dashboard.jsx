import { useEffect, useState } from "react";
import { apiRequest } from "../api/client";

export default function Dashboard({ onLogout }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadTasks() {
        setErr("");
        try {
            setLoading(true);
            const data = await apiRequest("/api/tasks");
            setTasks(data.tasks);
        } catch(e) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTasks();
    }, []);

    async function createTask(e) {
        e.preventDefault();
        setErr("");
        try {
            const data = await apiRequest("/api/tasks", {
                method: "POST",
                body: JSON.stringify({ title }),
            });
            setTitle("");
            setTasks((prev) => [data.task, ...prev]);
        } catch (e) {
            setErr(e.message);
        }
    }

    async function toggleDone(task) {
        setErr("");
        try {
            const nextStatus = task.status === "done" ? "todo❗" : "done";
            const data = await apiRequest(`/api/tasks/${task._id || task.id}`, {
                method: "PATCH",
                body: JSON.stringify({ status: nextStatus }),
            });
            setTasks((prev) => prev.map((t) => (t._id === data.task._id ? data.task : t)));
        } catch (e) {
            setErr(e.message);
        }
    }

    async function deleteTask(task) {
        setErr("");
        try {
            await apiRequest(`/api/tasks/${task._id || task.id}`, {
                method: "DELETE"
            });
            setTasks((prev) => prev.filter((t) => (t._id || t.id) !== (task._id || task.id)));
        } catch (e) {
            setErr(e.message);
        }
    }

return (
  <div className="container">
    <div className="card">
      <div className="row">
        <h1>Tasks</h1>
        <button
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      <form onSubmit={createTask} style={{ marginTop: 12 }}>
        <div className="row" style={{ alignItems: "stretch" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task title..."
          />
          <button type="submit" disabled={!title.trim()}>
            Add
          </button>
        </div>
      </form>

      {err && <div className="error">{err}</div>}

      {loading ? (
        <div style={{ marginTop: 12 }}>Loading...</div>
      ) : tasks.length === 0 ? (
        <div style={{ marginTop: 12 }}>No tasks yet.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10, marginTop: 12 }}>
          {tasks.map((t) => {
            const id = t._id || t.id;
            return (
              <li
                key={id}
                style={{
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 12,
                  padding: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>
                    {t.title}{" "}
                    <span style={{ fontWeight: 400, opacity: 0.7 }}>
                      ({t.status === 'done' ? 'done✅' : t.status})
                    </span>
                  </div>
                  {t.description ? (
                    <div style={{ opacity: 0.8, marginTop: 4 }}>{t.description}</div>
                  ) : null}
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => toggleDone(t)}>
                    {t.status === "done" ? "Mark todo" : "Mark done"}
                  </button>
                  <button onClick={() => deleteTask(t)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  </div>
);

}