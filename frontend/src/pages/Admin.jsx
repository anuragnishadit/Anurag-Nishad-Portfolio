import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

// Admin page at /admin: login, view/delete messages, add/delete projects.
export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [p, setP] = useState({ title: "", description: "", tech: "", liveUrl: "", githubUrl: "" });

  const logout = () => { localStorage.removeItem("token"); setToken(""); };
  const load = async (t = token) => {
    try { setMessages(await api("/contact", { token: t })); setProjects(await api("/projects")); }
    catch { logout(); }
  };
  useEffect(() => { if (token) load(); }, [token]);

  const doLogin = async (e) => {
    e.preventDefault(); setErr("");
    try { const { token: t } = await api("/auth/login", { method: "POST", body: login }); localStorage.setItem("token", t); setToken(t); }
    catch (e2) { setErr(e2.message); }
  };
  const delMsg = async (id) => { await api("/contact/" + id, { method: "DELETE", token }); load(); };
  const delProj = async (id) => { await api("/projects/" + id, { method: "DELETE", token }); load(); };
  const addProj = async (e) => {
    e.preventDefault();
    try { await api("/projects", { method: "POST", token, body: { ...p, tech: p.tech.split(",").map((s) => s.trim()).filter(Boolean) } });
      setP({ title: "", description: "", tech: "", liveUrl: "", githubUrl: "" }); load(); }
    catch (e2) { setErr(e2.message); }
  };

  if (!token) return (
    <div className="center"><form className="card" onSubmit={doLogin}><h2>Admin Login</h2>
      <input placeholder="Email" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
      <input placeholder="Password" type="password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
      <button className="btn">Login</button>{err && <p className="err">{err}</p>}<Link to="/">← Back to site</Link></form></div>);

  return (
    <div className="admin"><div className="row"><h2>Dashboard</h2><button className="btn small" onClick={logout}>Logout</button><Link to="/">Site</Link></div>
      {err && <p className="err">{err}</p>}
      <h3>Messages ({messages.length})</h3>
      {messages.map((m) => <div className="card" key={m._id}><b>{m.subject}</b> — {m.name} ({m.email})<p className="muted">{m.message}</p>
        <button className="btn small" onClick={() => delMsg(m._id)}>Delete</button></div>)}
      <h3>Projects ({projects.length})</h3>
      {projects.map((x) => <div className="card" key={x._id}><b>{x.title}</b> <button className="btn small" onClick={() => delProj(x._id)}>Delete</button></div>)}
      <form className="card" onSubmit={addProj}><h4>Add project</h4>
        <input placeholder="Title" value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} />
        <textarea placeholder="Description" value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} />
        <input placeholder="Tech (comma separated)" value={p.tech} onChange={(e) => setP({ ...p, tech: e.target.value })} />
        <input placeholder="Live URL (optional)" value={p.liveUrl} onChange={(e) => setP({ ...p, liveUrl: e.target.value })} />
        <input placeholder="GitHub URL (optional)" value={p.githubUrl} onChange={(e) => setP({ ...p, githubUrl: e.target.value })} />
        <button className="btn">Add Project</button></form>
    </div>);
}
