import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const{setAuthUser} = useAuthContext();
  const signup = async ({ fullname, email, username, password, confirmpassword, gender }) => {
    if (!validateInputs({ fullname, email, username, password, confirmpassword, gender })) {
      return;
    }

    setLoading(true);
    try {
      console.log({ fullname, email, username, password, confirmpassword, gender })
      const response = await fetch("https://chat-app-backend-x04z.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, username, password, confirmpassword, gender }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Signup failed. Please try again.");
      }

     
      toast.success("Signup successful!");
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message)
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

const validateInputs = ({ fullname, email, username, password, confirmpassword, gender }) => {
  if (!fullname || !email || !username || !password || !confirmpassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (!validateEmail(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  if (password !== confirmpassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};


const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
