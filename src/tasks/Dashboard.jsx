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
            const nextStatus = task.status === "done" ? "todo" : "done";
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
        <div style={{ padding:24, fontFamily: "system-ui", maxWidth: 720, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Tasks</h1>
                <button
                onClick={() => {
                    localStorage.removeItem("token");
                    onLogout();
                }}
                >Logout</button>
            </div>
            
        </div>
    )
}