import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");

// Load the repo-root platform.js (this agent lives under platform-agent/).
const platform = require(join(root, "platform.js")) as {
  parse: (ua?: string | null) => PlatformInfo;
  description: string | null;
  name: string | null;
  version: string | null;
  layout: string | null;
  manufacturer: string | null;
  product: string | string[] | null;
  prerelease: string | null;
  ua: string | null;
  os: OsInfo | null;
  toString: () => string;
};

export type OsInfo = {
  architecture: number | null;
  family: string | null;
  version: string | null;
  toString: () => string;
};

export type PlatformInfo = {
  description: string | null;
  name: string | null;
  version: string | null;
  layout: string | null;
  manufacturer: string | null;
  product: string | string[] | null;
  prerelease: string | null;
  ua: string | null;
  os: OsInfo | null;
  toString: () => string;
};

export type PlatformSnapshot = {
  description: string | null;
  name: string | null;
  version: string | null;
  layout: string | null;
  manufacturer: string | null;
  product: string | string[] | null;
  prerelease: string | null;
  ua: string | null;
  os: {
    family: string | null;
    version: string | null;
    architecture: number | null;
    label: string;
  } | null;
};

export function snapshot(info: PlatformInfo): PlatformSnapshot {
  const os = info.os;
  return {
    description: info.description,
    name: info.name,
    version: info.version,
    layout: info.layout,
    manufacturer: info.manufacturer,
    product: info.product,
    prerelease: info.prerelease,
    ua: info.ua,
    os: os
      ? {
          family: os.family,
          version: os.version,
          architecture: os.architecture,
          label: String(os),
        }
      : null,
  };
}

export function parseUa(ua: string): PlatformSnapshot {
  return snapshot(platform.parse(ua));
}

export function runtimePlatform(): PlatformSnapshot {
  return snapshot(platform as PlatformInfo);
}
