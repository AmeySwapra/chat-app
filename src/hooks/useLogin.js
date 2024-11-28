import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (email, username, password) => {
        if (!handleInputErrors(email, username, password)) return;

        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, username, password }),
            });

            if (!res.ok) {
                const errorMessage = await res.text();
                throw new Error(errorMessage || "Login failed. Please try again.");
            }

            const data = await res.json();
            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
            toast.success("Login successful!");
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

export default useLogin;

function handleInputErrors(email, username, password) {
    if (!email || !username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (!validateEmail(email)) {
        toast.error("Please enter a valid email address");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
