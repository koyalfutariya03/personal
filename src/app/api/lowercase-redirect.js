export default function handler(req, res) {
  const path = req.url.split("?")[0];
  const lowerPath = path.toLowerCase();

  // If the path has uppercase characters
  if (path !== lowerPath) {
    // Get any query parameters
    const queryString = req.url.includes("?")
      ? "?" + req.url.split("?")[1] + "&_redirectedFromCaseMismatch=true"
      : "?_redirectedFromCaseMismatch=true";

    // Redirect to lowercase version
    res.writeHead(308, {
      Location: lowerPath + queryString,
    });
    res.end();
    return;
  }

  // Otherwise, just pass through
  res.writeHead(404);
  res.end("Not found");
}
