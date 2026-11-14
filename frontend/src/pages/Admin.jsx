import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Admin() {
  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [err, setErr] = useState("");
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const load = async (t = token) => {
    try {
      setMessages(await api("/contact", { token: t }));
      setProjects(await api("/projects"));
    } catch (error) {
      setErr(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      load(token);
    }
  }, [token]);

  const doLogin = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const { token: t } = await api("/auth/login", {
        method: "POST",
        body: login
      });

      localStorage.setItem("token", t);
      setToken(t);
    } catch (error) {
      setErr(error.message);
    }
  };

  const delMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api("/contact/" + id, {
        method: "DELETE",
        token
      });

      load();
    } catch (error) {
      setErr(error.message);
    }
  };

  const delProj = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api("/projects/" + id, {
        method: "DELETE",
        token
      });

      load();
    } catch (error) {
      setErr(error.message);
    }
  };

  if (!token) {
    return (
      <div className="center">
        <form className="card" onSubmit={doLogin}>
          <h2>Admin Login</h2>

          <input
            placeholder="Email"
            value={login.email}
            onChange={(e) =>
              setLogin({ ...login, email: e.target.value })
            }
          />

          <input
            placeholder="Password"
            type="password"
            value={login.password}
            onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }
          />

          <button className="btn">Login</button>

          {err && <p className="err">{err}</p>}

          <Link to="/">← Back to site</Link>
        </form>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="row">
        <h2>Admin Dashboard</h2>

        <button className="btn small" onClick={logout}>
          Logout
        </button>

        <Link to="/">Site</Link>
      </div>

      {err && <p className="err">{err}</p>}

      {/* Messages Table */}
      <h3>Contact Messages ({messages.length})</h3>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.length > 0 ? (
              messages.map((m, index) => (
                <tr key={m._id}>
                  <td>{index + 1}</td>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.mobile}</td>
                  <td>{m.message}</td>
                  <td>
                    <button
                      className="btn small"
                      onClick={() => delMsg(m._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No messages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Projects Table */}
      <h3>Projects ({projects.length})</h3>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Project Name</th>
              <th>Description</th>
              <th>Technologies</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr key={project._id}>
                  <td>{index + 1}</td>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>
                    {Array.isArray(project.tech)
                      ? project.tech.join(", ")
                      : project.tech}
                  </td>
                  <td>
                    <button
                      className="btn small"
                      onClick={() => delProj(project._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}