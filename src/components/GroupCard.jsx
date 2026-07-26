import { Link } from "react-router-dom";

function ScoreBadge({ score }) {
  let colour = "bg-red-100 text-red-800";
  if (score >= 70) colour = "bg-green-100 text-green-800";
  else if (score >= 40) colour = "bg-amber-100 text-amber-800";

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${colour}`}
    >
      {score}% match
    </span>
  );
}

function StatusBadge({ group, isJoined }) {
  if (isJoined) {
    return (
      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
        Joined
      </span>
    );
  }

  if (group.members >= group.capacity) {
    return (
      <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
        Full
      </span>
    );
  }

  return (
    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
      Open
    </span>
  );
}

export default function GroupCard({ group, match, isJoined }) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-semibold text-blue-900">{group.title}</h3>
        <div className="flex flex-wrap gap-2">
          {match && <ScoreBadge score={match.score} />}
          <StatusBadge group={group} isJoined={isJoined} />
        </div>
      </div>

      <p className="mb-4 flex-1 text-sm text-slate-600">{group.description}</p>

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">
          {group.module}
        </span>
        <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">
          {group.studyMode}
        </span>
        <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">
          {group.campus}
        </span>
        <span className="rounded bg-slate-100 px-2 py-1 text-slate-700">
          {group.availability}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          {group.members}/{group.capacity} members
        </span>
        <Link
          to={`/groups/${group.id}`}
          className="font-medium text-blue-700 hover:text-blue-900"
        >
          View details →
        </Link>
      </div>
    </article>
  );
}
