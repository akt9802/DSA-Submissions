const REPO_OWNER = "akt9802";
const REPO_NAME = "DSA-Submissions";
const DEFAULT_BRANCH = "main";

export const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;

export function blobUrl(relativePath: string, branch = DEFAULT_BRANCH): string {
  const encoded = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${REPO_URL}/blob/${branch}/${encoded}`;
}

export function rawUrl(relativePath: string, branch = DEFAULT_BRANCH): string {
  const encoded = relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${branch}/${encoded}`;
}

export function commitUrl(hash: string): string {
  return `${REPO_URL}/commit/${hash}`;
}
