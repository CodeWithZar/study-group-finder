import { useState } from "react";
import { Link } from "react-router-dom";
import {
  availabilityOptions,
  campusOptions,
  moduleOptions,
  studyModeOptions,
} from "../data/mockProfile";
import { addCustomGroup, getNextGroupId, getProfile } from "../utils/storage";

const emptyForm = {
  title: "",
  description: "",
  module: "",
  availability: "",
  studyMode: "Hybrid",
  campus: "Main Campus",
  location: "",
  capacity: 4,
};

export default function CreateGroup() {
  const profile = getProfile();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  function handleChange(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSuccess(false);
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.module) {
      newErrors.module = "Module is required";
    }

    if (!form.availability) {
      newErrors.availability = "Availability is required";
    }

    const capacity = Number(form.capacity);
    if (!capacity || capacity < 2) {
      newErrors.capacity = "Capacity must be at least 2";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    const newGroup = {
      id: getNextGroupId(),
      title: form.title.trim(),
      description: form.description.trim() || "No description provided.",
      module: form.module,
      availability: form.availability,
      studyMode: form.studyMode,
      campus: form.campus,
      location: form.location.trim() || "To be confirmed",
      capacity: Number(form.capacity),
      members: 1,
      owner: profile.name || "You",
      createdAt: new Date().toISOString().split("T")[0],
    };

    addCustomGroup(newGroup);
    setCreatedId(newGroup.id);
    setSuccess(true);
    setForm(emptyForm);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-blue-900">
        Create a Study Group
      </h1>
      <p className="mb-6 text-slate-600">
        Create a new study group and share it with students on matching modules.
      </p>

      {success && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Group created successfully!{" "}
          {createdId && (
            <Link to={`/groups/${createdId}`} className="font-medium underline">
              View your new group
            </Link>
          )}{" "}
          or{" "}
          <Link to="/groups" className="font-medium underline">
            browse all groups
          </Link>
          .
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Field label="Title" error={errors.title}>
          <input
            type="text"
            value={form.title}
            onChange={(event) => handleChange("title", event.target.value)}
            placeholder="e.g. CS301 Revision Group"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </Field>

        <Field label="Description">
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) =>
              handleChange("description", event.target.value)
            }
            placeholder="What will your group focus on?"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Module" error={errors.module}>
            <select
              value={form.module}
              onChange={(event) => handleChange("module", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select a module</option>
              {moduleOptions.map((module) => (
                <option key={module} value={module}>
                  {module}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Availability" error={errors.availability}>
            <select
              value={form.availability}
              onChange={(event) =>
                handleChange("availability", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select availability</option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Study Mode">
            <select
              value={form.studyMode}
              onChange={(event) =>
                handleChange("studyMode", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {studyModeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Campus">
            <select
              value={form.campus}
              onChange={(event) => handleChange("campus", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {campusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Location">
            <input
              type="text"
              value={form.location}
              onChange={(event) => handleChange("location", event.target.value)}
              placeholder="e.g. Library Room 2"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </Field>

          <Field label="Capacity" error={errors.capacity}>
            <input
              type="number"
              min={2}
              value={form.capacity}
              onChange={(event) => handleChange("capacity", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </Field>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
