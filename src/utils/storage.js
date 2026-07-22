import { mockGroups } from "../data/mockGroups";
import { defaultProfile } from "../data/mockProfile";

const KEYS = {
  accounts: "sgf_accounts",
  session: "sgf_session",
  profile: "sgf_profile",
  joinedGroups: "sgf_joined_groups",
  customGroups: "sgf_custom_groups",
};

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getAccounts() {
  return readJson(KEYS.accounts, []);
}

export function isLoggedIn() {
  return localStorage.getItem(KEYS.session) !== null;
}

export function getCurrentUser() {
  const session = readJson(KEYS.session, null);
  if (!session) return null;

  return getAccounts().find(
    (account) => account.email.toLowerCase() === session.email.toLowerCase(),
  );
}

export function signUp(name, email, password) {
  const accounts = getAccounts();
  const normalizedEmail = email.toLowerCase();

  if (
    accounts.some((account) => account.email.toLowerCase() === normalizedEmail)
  ) {
    return {
      success: false,
      error: "An account with this email already exists.",
    };
  }

  const account = { name, email, password };
  writeJson(KEYS.accounts, [...accounts, account]);

  saveProfile({
    ...defaultProfile,
    name,
    email,
  });

  writeJson(KEYS.session, { email });
  return { success: true };
}

export function login(email, password) {
  const account = getAccounts().find(
    (item) => item.email.toLowerCase() === email.toLowerCase(),
  );

  if (!account || account.password !== password) {
    return { success: false, error: "Invalid email or password." };
  }

  const profile = getProfile();
  saveProfile({
    ...profile,
    name: account.name,
    email: account.email,
  });

  writeJson(KEYS.session, { email: account.email });
  return { success: true };
}

export function logout() {
  localStorage.removeItem(KEYS.session);
}

export function getProfile() {
  return readJson(KEYS.profile, { ...defaultProfile });
}

export function saveProfile(profile) {
  writeJson(KEYS.profile, profile);
}

export function getCustomGroups() {
  return readJson(KEYS.customGroups, []);
}

export function saveCustomGroups(groups) {
  writeJson(KEYS.customGroups, groups);
}

export function getAllGroups() {
  return [...mockGroups, ...getCustomGroups()];
}

export function getGroupById(id) {
  return getAllGroups().find((group) => group.id === id) || null;
}

export function getJoinedGroupIds() {
  return readJson(KEYS.joinedGroups, []);
}

export function isGroupJoined(groupId) {
  return getJoinedGroupIds().includes(groupId);
}

export function joinGroup(groupId) {
  const joined = getJoinedGroupIds();
  if (!joined.includes(groupId)) {
    writeJson(KEYS.joinedGroups, [...joined, groupId]);
  }
}

export function leaveGroup(groupId) {
  writeJson(
    KEYS.joinedGroups,
    getJoinedGroupIds().filter((id) => id !== groupId),
  );
}

export function addCustomGroup(group) {
  const customGroups = getCustomGroups();
  saveCustomGroups([...customGroups, group]);
}

export function resetAllData() {
  localStorage.removeItem(KEYS.accounts);
  localStorage.removeItem(KEYS.session);
  localStorage.removeItem(KEYS.profile);
  localStorage.removeItem(KEYS.joinedGroups);
  localStorage.removeItem(KEYS.customGroups);
}

export function getNextGroupId() {
  const allGroups = getAllGroups();
  const maxId = allGroups.reduce((max, group) => {
    const numericPart = parseInt(group.id.replace("g", ""), 10);
    return Number.isNaN(numericPart) ? max : Math.max(max, numericPart);
  }, 0);
  return `g${maxId + 1}`;
}
