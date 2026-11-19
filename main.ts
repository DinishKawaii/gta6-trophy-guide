// Leonida Trophy Guide — a make.fun gta6-trophy-guide-01 entry (Node 22, standard
// library only). The guide itself is app/: plain static files that open at
// app/index.html in a desktop browser with the network off — no build step, no
// fetch at run time (the trophy data rides in as data/trophies.js, and the
// canonical copy the competition checks is data/trophies.json).
//
// This program hands the guide in: it copies app/ and screenshots/ from beside
// this file into /output and writes /output/dossier.json with the vendored
// make.fun library. vendor/makefun-frontend.ts stays exactly as the kit shipped
// it — the scorer rebuilds the dossier with its own copy and compares bytes.
//
// Try it with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Caps from the scorer's reference/gate.json: only text_max_bytes shapes the
// bytes; the rest refuse an entry the scorer would refuse anyway (more than 4
// screenshots or one over 256 KiB; app/ over 993 files and directories or
// 48 MiB — app/ shares /output's own 1000-entry cap with screenshots/ and
// the dossier, so leave room).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 50331648 }),
);
