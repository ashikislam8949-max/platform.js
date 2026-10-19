---
name: platform-api
description: Explain platform.js install, parse(), and field meanings when the user asks how to use the library (not when they only want a UA parsed).
---

# platform.js API

## Install

```js
// Node
var platform = require("platform");

// Browser
<script src="platform.js"></script>
```

## Parse a UA

```js
var info = platform.parse(
  "Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 ..."
);
info.name; // 'Safari'
info.product; // 'iPad'
info.os; // object; String(info.os) for a label
info.description; // human-readable summary
```

## Fields to mention

| Field | Meaning |
| --- | --- |
| `name` | Browser / environment name |
| `version` | Browser version string |
| `layout` | Engine (Blink, Gecko, WebKit, …) |
| `os` | `{ family, version, architecture }` |
| `product` | Device product when known |
| `manufacturer` | Device maker when known |
| `description` | One-line summary |

Do not recommend platform.js as a feature-detection substitute.
