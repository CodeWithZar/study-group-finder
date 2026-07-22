function isStudyModeCompatible(profileMode, groupMode) {
  return (
    profileMode === groupMode ||
    profileMode === "Hybrid" ||
    groupMode === "Hybrid"
  );
}

function isCampusCompatible(profileCampus, groupCampus) {
  return (
    profileCampus === groupCampus ||
    groupCampus === "Online" ||
    groupCampus === "No Preference"
  );
}

export function calculateMatch(profile, group) {
  const breakdown = {
    module: 0,
    availability: 0,
    studyMode: 0,
    campus: 0,
  };

  const reasons = [];
  const missingReasons = [];

  const profileModules = profile.modules || [];

  if (profileModules.includes(group.module)) {
    breakdown.module = 40;
    reasons.push(`Same module: ${group.module}`);
  } else {
    missingReasons.push(`Different module (group studies ${group.module})`);
  }

  if (profile.availability === group.availability) {
    breakdown.availability = 30;
    reasons.push(`Matching availability: ${group.availability}`);
  } else {
    missingReasons.push(
      `Availability mismatch (you: ${profile.availability}, group: ${group.availability})`,
    );
  }

  if (isStudyModeCompatible(profile.studyMode, group.studyMode)) {
    breakdown.studyMode = 15;
    reasons.push(`Compatible study mode: ${group.studyMode}`);
  } else {
    missingReasons.push(
      `Study mode mismatch (you: ${profile.studyMode}, group: ${group.studyMode})`,
    );
  }

  if (isCampusCompatible(profile.campus, group.campus)) {
    breakdown.campus = 15;
    reasons.push(`Compatible campus: ${group.campus}`);
  } else {
    missingReasons.push(
      `Campus mismatch (you: ${profile.campus}, group: ${group.campus})`,
    );
  }

  const score =
    breakdown.module +
    breakdown.availability +
    breakdown.studyMode +
    breakdown.campus;

  return { score, reasons, missingReasons, breakdown };
}

export function rankGroupsByMatch(profile, groups) {
  return groups
    .map((group) => ({
      group,
      match: calculateMatch(profile, group),
    }))
    .sort((a, b) => b.match.score - a.match.score);
}
