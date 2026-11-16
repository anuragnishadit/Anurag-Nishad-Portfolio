
import { useCallback, useEffect, useState } from "react";
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

  const [messages, setMessages] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Load contact messages
  const load = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setErr("");

    try {
      const data = await api("/contact", { token });

      setMessages(Array.isArray(data) ? data : []);
      setLastUpdated(new Date());
    } catch (error) {
      setErr(error.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Initial data load
  useEffect(() => {
    if (token) {
      load();
    }
  }, [token, load]);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setMessages([]);
    setLastUpdated(null);
    setErr("");
  };

  // Login
  const doLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoginLoading(true);

    try {
      const response = await api("/auth/login", {
        method: "POST",
        body: login
      });

      if (!response.token) {
        throw new Error("Login token not received");
      }

      localStorage.setItem("token", response.token);
      setToken(response.token);
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  // Delete message
  const delMsg = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      await api("/contact/" + id, {
        method: "DELETE",
        token
      });

      setMessages((previous) =>
        previous.filter((message) => message._id !== id)
      );

      setLastUpdated(new Date());
      setErr("");
    } catch (error) {
      setErr(error.message || "Unable to delete message");
    }
  };

  // Login screen
  if (!token) {
    return (
      <div className="admin-login-wrapper">
        <form className="admin-login-card" onSubmit={doLogin}>
          <h2>Admin Login</h2>

          <input
            type="email"
            placeholder="Email Address"
            value={login.email}
            onChange={(e) =>
              setLogin({ ...login, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={login.password}
            onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="admin-btn"
            disabled={loginLoading}
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>

          {err && <p className="admin-error">{err}</p>}

          <Link to="/" className="admin-back-link">
            ← Back to Site
          </Link>
        </form>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="admin-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Manage your portfolio messages</p>
        </div>

        <div className="admin-header-actions">
          <button
            className="admin-btn refresh-btn"
            onClick={load}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "↻ Refresh Data"}
          </button>

          <button
            className="admin-btn logout-btn"
            onClick={logout}
          >
            Logout
          </button>

          <Link to="/" className="admin-site-link">
            Site ↗
          </Link>
        </div>
      </div>

      {err && (
        <div className="admin-error">
          {err}
        </div>
      )}

      {/* Statistics */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div>
            <span>Total Messages</span>
            <h3>{messages.length}</h3>
          </div>
          <div className="admin-stat-icon">✉</div>
        </div>

        <div className="admin-stat-card">
          <div>
            <span>Dashboard Status</span>
            <h3 className="status-text">
              {loading ? "Updating..." : "Active"}
            </h3>
          </div>
          <div className="admin-stat-icon">✓</div>
        </div>
      </div>

      {/* Contact Messages */}
      <section className="admin-messages-section">

        <div className="admin-section-header">
          <div>
            <h3>Contact Messages</h3>
            <p>{messages.length} messages received</p>
          </div>

          <span className="message-count">
            {messages.length}
          </span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading && messages.length === 0 ? (
                <tr>
                  <td colSpan="7" className="admin-empty">
                    Loading messages...
                  </td>
                </tr>
              ) : messages.length > 0 ? (
                messages.map((m, index) => (
                  <tr key={m._id}>
                    <td>{index + 1}</td>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.phone || "N/A"}</td>
                    <td>{m.subject || "N/A"}</td>
                    <td className="message-cell">
                      {m.message}
                    </td>
                    <td>
                      <button
                        className="admin-delete-btn"
                        onClick={() => delMsg(m._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="admin-empty">
                    No contact messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="admin-table-footer">
          <span>
            {lastUpdated
              ? `Last updated: ${lastUpdated.toLocaleTimeString()}`
              : "Waiting for data..."}
          </span>

          <button
            className="admin-text-refresh"
            onClick={load}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Refresh Messages ↻"}
          </button>
        </div>

      </section>
    </div>
  );
}
