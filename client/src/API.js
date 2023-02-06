export async function listLogEntries() {
  const resp = await fetch("/api/logs");
  return resp.json();
}

export async function createLogEntry(entry) {
  const resp = await fetch("/api/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });
  return resp.json();
}
