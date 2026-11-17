import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const checking = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/logn", {
        email,
        password,
      });

      if (res.data.succes) {
        toast.success(res.data.msg);

        setEmail("");
        setPassword("");

        navigate("/dashboard");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Admin Login
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Login to your account
        </p>

        <label className="text-white block mb-2">Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-5 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500"
        />

        <label className="text-white block mb-2">Password</label>

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white outline-none border border-slate-700 focus:border-emerald-500"
        />

        <button
          onClick={checking}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?
          <Link
            to="/sign"
            className="text-emerald-400 ml-2 hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;