import React, { useState } from "react";
import axios from "axios";
const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", { email, password });
      console.log(response.data);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  return (
    <form onSubmit={handleSignup}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};
export default SignupForm;
