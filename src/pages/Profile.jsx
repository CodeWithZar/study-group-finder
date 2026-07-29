import { useState } from "react";
import {
  availabilityOptions,
  campusOptions,
  moduleOptions,
  studyModeOptions,
} from "../data/mockProfile";
import { getCurrentUser, getProfile, saveProfile } from "../utils/storage";

export default function Profile() {
  const [profile, SetProfile] = useState(getProfile());
  const [saved, setSaved] = useState(false);

  function handleChange(field, value) {
    SetProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function toggleModule(module) {
    SetProfile((current) => {
      const modules =
        current.module.includes(module) ?
          current.modules.filter((item) => item !== module)
        : [...current.modules, module];
      return { ...current, modules };
    });
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    saveProfile(profile);
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-blue-900">Student Profile</h1>
      <p className="mb-6 text-slate-600">
        Update your details to improve study group recommendations.
      </p>

      {saved && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          Profile saved successfully.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={profile.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={profile.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="degree"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Degree
            </label>
            <input
              id="degree"
              type="text"
              value={profile.degree}
              onChange={(event) => handleChange("degree", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="year"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Year
            </label>
            <input
              id="year"
              type="text"
              value={profile.year}
              onChange={(event) => handleChange("year", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Modules</p>
          <div className="flex flex-wrap gap-2">
            {moduleOptions.map((module) => (
              <button
                key={module}
                type="button"
                onClick={() => toggleModule(module)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  profile.modules.includes(module) ?
                    "bg-blue-700 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {module}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="availability"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Availability
            </label>
            <select
              id="availability"
              value={profile.availability}
              onChange={(event) =>
                handleChange("availability", event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="studyMode"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Study Mode
            </label>
            <select
              id="studyMode"
              value={profile.studyMode}
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
          </div>

          <div>
            <label
              htmlFor="campus"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Campus
            </label>
            <select
              id="campus"
              value={profile.campus}
              onChange={(event) => handleChange("campus", event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {campusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="goal"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Goal
          </label>
          <textarea
            id="goal"
            rows={3}
            value={profile.goal}
            onChange={(event) => handleChange("goal", event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
