import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/dashboard-auth/login", { username, password });
      localStorage.setItem("dashboardToken", res.data.token);
      navigate("/client-dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Client Dashboard Login</h2>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded"
          required
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default DashboardLogin;
