import { useMemo, useState } from "react";
import GroupCard from "../components/GroupCard";
import {
  campusOptions,
  moduleOptions,
  studyModeOptions,
} from "../data/mockProfile";
import { rankGroupsByMatch } from "../utils/matching";
import { getAllGroups, getProfile, isGroupJoined } from "../utils/storage";

export default function Groups() {
  const profile = getProfile();
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [studyModeFilter, setStudyModeFilter] = useState("");
  const [campusFilter, setCampusFilter] = useState("");

  const filteredGroups = useMemo(() => {
    const allGroups = getAllGroups();
    const ranked = rankGroupsByMatch(profile, allGroups);

    return ranked.filter(({ groups }) => {
      const searchText = search.toLowerCase();
      const matchesSearch =
        !searchText ||
        group.title.toLowerCase().includes(searchText) ||
        group.description.toLowerCase().includes(searchText) ||
        group.module.toLowerCase().includes(searchText);

      const matchesModule =
        moduleFilter === "All" || group.module === moduleFilter;
      const matchesStudyMode =
        studyModeFilter === "All" || group.studyMode === studyModeFilter;
      const matchesCampus =
        campusFilter === "All" || group.campus === campusFilter;

      return (
        matchesSearch && matchesModule && matchesStudyMode && matchesCampus
      );
    });
  }, [profile, search, moduleFilter, studyModeFilter, campusFilter]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-blue-900">Study Groups</h1>
      <p className="mb-6 text-slate-600">
        Browse study groups ranked by compatibility with your profile.
      </p>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="search"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Search
            </label>
            <input
              id="search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, module..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="module"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Module
            </label>
            <select
              id="module"
              value={moduleFilter}
              onChange={(event) => setModuleFilter(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All modules</option>
              {moduleOptions.map((module) => (
                <option key={module} value={module}>
                  {module}
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
              value={studyModeFilter}
              onChange={(event) => setStudyModeFilter(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All modes</option>
              {studyModeOptions.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
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
              value={campusFilter}
              onChange={(event) => setCampusFilter(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="All">All campuses</option>
              {campusOptions.map((campus) => (
                <option key={campus} value={campus}>
                  {campus}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-slate-500">
        Showing {filteredGroups.length} group
        {filteredGroups.length !== 1 ? "s" : ""} (sorted by compatibility,
        highest first)
      </p>

      {filteredGroups.length > 0 ?
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map(({ group, match }) => (
            <GroupCard
              key={group.id}
              group={group}
              match={match}
              isJoined={isGroupJoined(group.id)}
            />
          ))}
        </div>
      : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          No groups match your filters. Try adjusting your search or filters.
        </div>
      }
    </div>
  );
}
