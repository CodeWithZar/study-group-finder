import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MatchBreakdown from "../components/MatchBreakdown";
import { calculateMatch } from "../utils/matching";
import {
  getGroupById,
  getProfile,
  isGroupJoined,
  joinGroup,
  leaveGroup,
  deleteCustomGroup,
  isCustomGroup,
} from "../utils/storage";

export default function GroupDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const profile = getProfile();
  const group = getGroupById(id);

  if (!group) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-blue-900">Group Not Found</h1>
        <p className="mt-2 text-slate-600">
          This group does not exsists in the local data.
        </p>
        <link
          to="/groups"
          className="mt-4 inline-block text-blue-700 hover:text-blue-900"
        >
          ← Back to groups
        </link>
      </div>
    );
  }

  const match = calculateMatch(profile, group);
  const joined = isGroupJoined(group.id);
  const custom = isCustomGroup(group.id);
  const isFull = group.members >= group.capacity;

  function handleJoinLeave() {
    if (joined) {
      leaveGroup(group.id);
    } else if (!isFull) {
      joinGroup(group.id);
    }
    setRefreshKey((key) => key + 1);
  }

  function handleDelete() {
    if (window.confirm("Delete this group?")) {
      deleteCustomGroup(group.id);
      navigate("/groups");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8" key={refreshKey}>
      <Link
        to="/groups"
        className="mb-4 inline-block text-sm text-blue-700 hover:text-blue-900"
      >
        ← Back to groups
      </Link>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">{group.title}</h1>
            <p className="mt-2 text-slate-600">{group.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {joined && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                Joined
              </span>
            )}
            {isFull && !joined && (
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
                Full
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem label="Module" value={group.module} />
          <DetailItem label="Availability" value={group.availability} />
          <DetailItem label="Study Mode" value={group.studyMode} />
          <DetailItem label="Campus" value={group.campus} />
          <DetailItem label="Location" value={group.location} />
          <DetailItem label="Owner" value={group.owner} />
          <DetailItem
            label="Members"
            value={`${group.members}/${group.capacity}`}
          />
          <DetailItem label="Created" value={group.createdAt} />
          <DetailItem label="Group ID" value={group.id} />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleJoinLeave}
            disabled={!joined && isFull}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
              joined ?
                "border border-red-300 bg-white text-red-700 hover:bg-red-50"
              : isFull ? "cursor-not-allowed bg-gray-200 text-gray-500"
              : "bg-amber-500 text-blue-950 hover:bg-amber-400"
            }`}
          >
            {joined ?
              "Leave Group"
            : isFull ?
              "Group Full"
            : "Join Group"}
          </button>

          {custom && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
            >
              Delete Group
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate("/groups")}
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Browse More Groups
          </button>
        </div>
      </div>

      <MatchBreakdown match={match} />
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
