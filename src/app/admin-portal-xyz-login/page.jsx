"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export default function SecretAdminLoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (!form.email || !form.password) {
            setError("Both fields are required.");
            setLoading(false);
            return;
        }
        try {
            await axios.post("/api/admin/login", form);

            toast.success("Login successful", { duration: 4000, position: "top-right" });
            router.push("/admin/dashboard");
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
            toast.error("Login failed", { duration: 4000, position: "top-right" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-6 p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-2 rounded font-bold"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
