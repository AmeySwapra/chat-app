import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "", 
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (gender) => {
    setInputs((prev) => ({ ...prev, gender }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/** Full Name Field */}
          <FormField
            label="Full Name"
            name="fullname"
            placeholder="John Doe"
            value={inputs.fullname}
            onChange={handleChange}
          />

          {/** Email Field */}
          <FormField
            label="Email"
            name="email"
            type="email"
            placeholder="example@example.com"
            value={inputs.email}
            onChange={handleChange}
          />

          {/** Username Field */}
          <FormField
            label="Username"
            name="username"
            placeholder="johndoe"
            value={inputs.username}
            onChange={handleChange}
          />

          {/** Password Field */}
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            value={inputs.password}
            onChange={handleChange}
          />

          {/** Confirm Password Field */}
          <FormField
            label="Confirm Password"
            name="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            value={inputs.confirmpassword}
            onChange={handleChange}
          />

          {/** Gender Checkbox */}
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          {/** Login Redirect */}
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          {/** Submit Button */}
          <button
            type="submit"
            className="btn btn-block btn-sm mt-2 border border-slate-700"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

const FormField = ({ label, name, type = "text", placeholder, value, onChange }) => (
  <div>
    <label className="label p-2">
      <span className="text-base label-text">{label}</span>
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full input input-bordered h-10"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SignUp;
