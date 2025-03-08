"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import ErrorMessage from "@/components/ErrorMessage";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div style={{width:"50%", padding:"20px", borderRadius:"20px"}} className="w-full  max-w-md md:max-w-2xl lg:max-w-[50%] p-6 bg-gray-900 rounded-2xl shadow-lg text-white">
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-sm text-center text-gray-400">Login to access your dashboard</p>

        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          {error && <ErrorMessage message={error} />}

          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 mt-1 text-gray-200 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-1 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
            <FaSignInAlt size={18} />
          </button>
        </form>

        {/* <p className="mt-4 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
