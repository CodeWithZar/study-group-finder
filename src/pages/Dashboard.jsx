import { Link } from "react-router-dom";
import GroupCard from "../components/GroupCard";
import { calculateMatch, rankGroupsByMatch } from "../utils/matching";
import {
  getAllGroups,
  getJoinedGroupIds,
  getProfile,
  isGroupJoined,
} from "../utils/storage";

function SummaryCard({ label, value, accent = "blue" }) {
  const colors = {
    blue: "border-blue-200 bg-blue-50 text-blue-900",
    amber: "border-amber-200 bg-amber-50 text-amber-900",
    green: "border-green-200 bg-green-50 text-green-900",
    slate: "border-slate-200 bg-slate-50 text-slate-900",
  };

  return (
    <div className={`rounded-xl border p-5 ${colors[accent]}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default function Dashboard() {
  const profile = getProfile();
  const allGroups = getAllGroups();
  const joinedIds = getJoinedGroupIds();
  const ranked = rankGroupsByMatch(profile, allGroups);
  const topMatch = ranked[0];
  const joinedGroups = allGroups.filter((group) =>
    joinedIds.includes(group.id),
  );
  const bestScore = ranked.length > 0 ? ranked[0].match.score : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">
          Welcome back, {profile.name || "Student"}
        </h1>
        <p className="mt-1 text-slate-600">
          Here is an overview of your study groups and top recommendations.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Total Groups"
          value={allGroups.length}
          accent="blue"
        />
        <SummaryCard
          label="Joined Groups"
          value={joinedGroups.length}
          accent="green"
        />
        <SummaryCard
          label="Best Match Score"
          value={`${bestScore}%`}
          accent="amber"
        />
        <SummaryCard
          label="Study Mode / Campus"
          value={`${profile.studyMode} · ${profile.campus}`}
          accent="slate"
        />
      </div>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-blue-900">
            Top Recommended Group
          </h2>

          <Link
            to="/groups"
            className="text-sm font-medium text-blue-700 hover:text-blue-900"
          >
            View all groups →
          </Link>
        </div>

        {topMatch ?
          <div className="max-w-xl">
            <GroupCard
              group={topMatch.group}
              match={topMatch.match}
              isJoined={isGroupJoined(topMatch.group.id)}
            />
          </div>
        : <p className="text-slate-600">No groups available.</p>}
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-blue-900">
          Your Joined Groups
        </h2>

        {joinedGroups.length > 0 ?
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {joinedGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                match={calculateMatch(profile, group)}
                isJoined={true}
              />
            ))}
          </div>
        : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-600">
              You have not joined any groups yet.
            </p>

            <Link
              to="/groups"
              className="mt-3 inline-block text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              Browse recommended groups
            </Link>
          </div>
        }
      </section>
    </div>
  );
}
