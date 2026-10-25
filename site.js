const appStoreHostname = "apps.apple.com";

function getAppStoreUrl(value) {
  if (typeof value !== "string" || value.length === 0) {
    return null;
  }

  try {
    const url = new URL(value);
    if (
      url.protocol !== "https:" ||
      url.hostname !== appStoreHostname ||
      url.username !== "" ||
      url.password !== "" ||
      url.port !== ""
    ) {
      return null;
    }
    return url.href;
  } catch {
    return null;
  }
}

async function configureAppStoreLinks() {
  const links = document.querySelectorAll(".app-store-link");
  if (links.length === 0) {
    return;
  }

  let response;
  try {
    response = await fetch("config.json");
  } catch (error) {
    console.error("Unable to load config.json.", error);
    return;
  }
  if (!response.ok) {
    console.error(`Unable to load config.json: HTTP ${response.status}.`);
    return;
  }

  let config;
  try {
    config = await response.json();
  } catch (error) {
    console.error("config.json is not valid JSON.", error);
    return;
  }
  if (
    typeof config !== "object" ||
    config === null ||
    Array.isArray(config) ||
    !("appStoreUrl" in config)
  ) {
    console.error('config.json must contain an "appStoreUrl" property.');
    return;
  }
  if (config.appStoreUrl === "") {
    return;
  }

  const url = getAppStoreUrl(config.appStoreUrl);
  if (url === null) {
    console.error("config.json contains an invalid App Store URL.");
    return;
  }
  for (const link of links) {
    link.href = url;
    link.hidden = false;
  }
}

void configureAppStoreLinks();
