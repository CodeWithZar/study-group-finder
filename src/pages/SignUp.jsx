import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { isLoggedIn, signUp } from "../utils/storage";

export default function signUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (isLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password but me atleast 6 characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.prevenDefault();

    if (!validate()) return;

    const result = signUp(name.trim(), email.trim(), password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErrors({ from: result.error });
    }
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join Study Group Finder and find groups that match your schedule."
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Sign in"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.form && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errors.form}
          </div>
        )}

        <Field label="Full name" id="name" error={errors.name}>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Alex Student"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </Field>

        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@university.ac.uk"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </Field>

        <Field label="Password" id="password" error={errors.password}>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </Field>

        <Field
          label="Confirm password"
          id="confirmPassword"
          error={errors.confirmPassword}
        >
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Re-enter your password"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </Field>

        <button
          type="submit"
          className="w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-blue-950 transition hover:bg-amber-400"
        >
          Create account
        </button>
      </form>
    </AuthLayout>
  );
}

function Field({ label, id, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
