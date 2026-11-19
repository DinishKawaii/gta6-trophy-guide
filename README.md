# gta6-trophy-guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/DinishKawaii/gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/DinishKawaii/gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

Leonida Trophy Guide — an offline guide and tracker for all 55 official PlayStation 5 trophies of Grand Theft Auto VI. Tick trophies off as you earn them (progress is saved in the browser), filter by grade and kind, search, hide spoilers, export and import your progress, and follow the roadmap to the platinum in about 200 hours. Every trophy carries a guide in our own words, with its source named beside it. One trophy is missable — Positive Mental Attitude — and the guide flags it loudly.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=hpvfdjv3&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>

## How to use

1. **Checklist** — tick a trophy when you earn it. Your ticks are saved in the browser (localStorage), so they survive a reload.
2. **Filters** — search by name or keyword, filter by grade (Platinum, Gold, Silver, Bronze) and by kind (Story, Side story, Activity, Collectible, Challenge, Robbery, Exploration, Milestone, Other), show only the missable trophy, or hide the ones you already earned.
3. **Hide spoilers** — with the spoiler setting on, the 28 hidden trophies stay covered (name and description replaced) until you earn them.
4. **Export / Import** — export your progress as a JSON file, and import it back on another machine or after clearing the browser.
5. **Roadmap to Platinum** — six stages from the first save to 100% completion, with the missable trophy and the time-sensitive moments called out.
6. **Sources** — every guide names the guide it drew on (Output Lag, GTA Vibes, KeenGamer, all.gg, Exophase, PSNProfiles).

Views can be opened straight from a link: `?view=roadmap`, `?view=sources`, `?grade=silver`, `?kind=story`, `?missable=1`, `?spoiler=on`, `?search=…`, `?earned=2,3,8` to pre-tick trophies, `?open=28` to jump to one trophy.

## Licence

MIT — see `LICENSE`. Trophy names, descriptions and grades are the official PlayStation list. Guide text is written for this guide. This is an unofficial fan guide: it shows no Rockstar logo, artwork or game screenshot.
