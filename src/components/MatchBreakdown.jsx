export default function MatchBreakdown({ match }) {
  if (!match) return null;

  const items = [
    {
      label: "Module Match",
      points: match.breakdown.module,
      max: 40,
    },
    {
      label: "Availability match",
      points: match.breakdown.availability,
      max: 30,
    },
    {
      label: "Study mode match",
      points: match.breakdown.studyMode,
      max: 15,
    },
    {
      label: "Campus match",
      points: match.breakdown.campus,
      max: 15,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-xl border-slate-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-semibold text-blue-900">
          Compatibility Score: {match.score}%
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-slate-700">{item.label}</span>
                <span className="font-medium text-slate-900">
                  {items.points}/{items.max}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-700 transition-all"
                  style={{ width: `${(items.points / items.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <h4 className="mb-2 font-semibold text-green-900">Match reasons</h4>
          {match.reasons.length > 0 ?
            <ul className="list-inside list-disc space-y-1 text-sm text-green-800">
              {match.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          : <p className="text-sm text-green-800">
              No matching criteria found.
            </p>
          }
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h4 className="mb-2 font-semibold text-amber-900">Missing reasons</h4>
          {match.missingReasons.length > 0 ?
            <ul className="list-inside list-disc space-y-1 text-sm text-amber-800">
              {match.missingReasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          : <p className="text-sm text-amber-800">
              Perfect match on all criteria.
            </p>
          }
        </div>
      </div>
    </div>
  );
}
