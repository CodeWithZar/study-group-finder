export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-blue-900">
        About Study Group Finder
      </h1>
      <p className="mb-8 text-slate-600">
        A web application that helps university students find compatible study
        groups.
      </p>

      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-blue-900">
          The Problem
        </h2>
        <p className="leading-relaxed text-slate-700">
          University students often struggle to find study partners who share
          the same modules, availability, and preferred study style. Searching
          through social media or class chats is time-consuming and does not
          show how well a group matches a student&apos;s needs.
        </p>
      </section>

      <section className="mb-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-blue-900">
          The Solution
        </h2>
        <p className="mb-4 leading-relaxed text-slate-700">
          Study Group Finder lets students create a profile, browse study
          groups, and see compatibility scores. Groups are ranked so the best
          matches appear first, helping students quickly find relevant study
          partners.
        </p>
        <ul className="list-inside list-disc space-y-1 text-slate-700">
          <li>Sign up and manage your student profile</li>
          <li>Search and filter groups by module, study mode, and campus</li>
          <li>Join or leave groups with one click</li>
          <li>Create new groups for your module and schedule</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-blue-900">
          Compatibility Scoring
        </h2>
        <p className="mb-4 leading-relaxed text-slate-700">
          Each group receives a score out of 100 based on four criteria. Groups
          with higher scores are shown first in your recommendations.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-2 font-semibold text-slate-700">
                  Criterion
                </th>
                <th className="px-4 py-2 font-semibold text-slate-700">
                  Points
                </th>
                <th className="px-4 py-2 font-semibold text-slate-700">Rule</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3">Module</td>
                <td className="px-4 py-3">40</td>
                <td className="px-4 py-3">
                  Group module is in the student&apos;s module list
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3">Availability</td>
                <td className="px-4 py-3">30</td>
                <td className="px-4 py-3">Exact match on availability</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3">Study Mode</td>
                <td className="px-4 py-3">15</td>
                <td className="px-4 py-3">
                  Same mode, or either side is Hybrid
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3">Campus</td>
                <td className="px-4 py-3">15</td>
                <td className="px-4 py-3">
                  Same campus, or group is Online / No Preference
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
