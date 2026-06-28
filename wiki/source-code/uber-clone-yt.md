---
title: Uber Clone (React Native / Expo)
category: code
domain: uber-clone-yt
language: javascript
tags: [react-native, expo, redux, maps, ride-hailing]
source_files: [sourcecode/uber-clone-yt]
implements: []
last_updated: 2026-06-28
last_verified: 2026-06-28
status: active
---

# Uber Clone (React Native / Expo)

> A React Native (Expo) ride-hailing UI: pick origin & destination via Google Places, draw the
> route on a map, fetch travel time/distance, and choose a ride option. State is managed with a
> Redux Toolkit slice (`navSlice`).

> Analyzer: **codebase-memory MCP** (`codebase-memory-mcp dev`) · indexed 21 files →
> **82 nodes, 109 edges** · 12 functions, 9 call edges.

## Purpose

A small ride-booking front end. `App` wires React Navigation + the Redux store; screens compose
map and card components; the `navSlice` holds `origin`, `destination`, and `travelTimeInformation`,
exposed via `set*` actions and `select*` selectors. `Map.getTravelTime` calls the Google Distance
Matrix API and stores the result.

## Classes

None — functional React Native components + a Redux Toolkit slice.

## Functions / Components

| Component / Function | File | Role |
|---|---|---|
| `App` | App.js | Root; NavigationContainer + Redux `Provider` + stack navigator |
| `HomeScreen` | screens/HomeScreen.js | Landing; sets origin/destination, shows NavOptions + NavFavourites |
| `MapScreen` | screens/MapScreen.js | Hosts the `Map` and the navigate/ride cards |
| `NavigateCard` | screens/NavigateCard.js | Destination search; routes into ride options |
| `RideOptionsCard` | screens/RideOptionsCard.js | Pick a ride tier + fare estimate |
| `Map` | components/Map.js | MapView with markers + route; triggers travel-time fetch |
| `NavOptions` | components/NavOptions.js | Ride / eats option tiles |
| `NavFavourites` | components/NavFavourites.js | Saved places list |
| `getTravelTime` | components/Map.js | Calls Google Distance Matrix → `setTravelTimeInformation` |
| `setOrigin` / `setDestination` / `setTravelTimeInformation` | slices/navSlice.js | Redux actions (state writes) |
| `selectOrigin` / `selectDestination` / `selectTravelTimeInformation` | slices/navSlice.js | Redux selectors (state reads) |

## Dependencies

- **Navigation/UI**: `@react-navigation/native` + `stack`, `react-native-elements`,
  `react-native-vector-icons`, `tailwind-react-native-classnames`.
- **State**: `@reduxjs/toolkit`, `react-redux`.
- **Maps/places**: `react-native-maps`, `react-native-google-places-autocomplete`.
- **Platform**: `expo`, `react-native`, `react-native-safe-area-context`, `react-native-screens`.

## Relationships (from the call graph)

- **`navSlice` is the state hub**: `HomeScreen` → `setOrigin`/`setDestination`; `NavigateCard` →
  `setDestination`; `getTravelTime` → `setTravelTimeInformation`.
- **`Map`** is the shared map surface (`MapScreen` → `Map` → `getTravelTime`).
- **`NavFavourites`** is reused by both `HomeScreen` and `NavigateCard`.

## Open Questions / Gotchas

- Google API key lives in `.env` (`react-native-dotenv`) — **must not be committed**; confirm
  `.env` is git-ignored before sharing.
- No tests; API calls are inline in components.

## Related Pages

- [Code Map](code-map.md)
- Reports: `wiki/source-code-output/uber-clone-yt.{html, mmd, graph.json, graph.db.zst}`

## Sources

- `sourcecode/uber-clone-yt` — analyzer: codebase-memory MCP, verified 2026-06-28
