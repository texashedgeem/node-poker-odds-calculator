# node-poker-odds-calculator — CLAUDE.md

## Project Overview

- **Repo**: `texashedgeem/node-poker-odds-calculator` (GitHub, forked from rundef/node-poker-odds-calculator)
- **Local path**: `/Users/simonhewins/repo_git/node-poker-odds-calculator`
- **Live API**: https://node-poker-odds-calculator.vercel.app/api/odds
- **Docs**: https://docs.qeetoto.com
- **Tech stack**: Node.js / TypeScript, deployed on Vercel
- **Purpose**: Poker odds REST API — calculates Texas Hold'Em hand equity. Powers the HedgeEm game.

## Repo Structure

```
api/
  odds.ts          — Vercel serverless function (POST /api/odds)
  tsconfig.json
src/                — forked poker-odds-calculator library source
test/               — library tests
docs/               — Mintlify documentation source
vercel.json         — Vercel config (maxDuration: 10s)
```

## API Usage

```bash
POST https://node-poker-odds-calculator.vercel.app/api/odds
Content-Type: application/json

{
  "players": [["As", "Kh"], ["Qd", "Qc"]],
  "board": []
}
```

## Deployment

- **Vercel** — push to main triggers deployment
- **Docs**: Mintlify at docs.qeetoto.com (openapi.yaml drives the reference)

## Jira

- **Instance**: https://open-banking.atlassian.net
- **Project**: HEDGE (Texas Hedge'Em)
- **Auth**: simon.hewins@gmail.com + $JIRA_TOKEN
- **API**: POST `/rest/api/3/search/jql`
- **Transition IDs**: Backlog=11, Selected=21, In Progress=31, Done=41

## Current Focus

**Next: HedgeEm modernisation (HEDGE-6), API custom domain, docs URL update at docs.qeetoto.com.**
Last known state: Vercel API clean, docs.qeetoto.com live, hedgeem.qeetoto.com live (2026-03-14).
> Update this section whenever focus changes.

## Claude Behaviour Standards

- **Session start**: Read this "Current Focus" section and MEMORY.md. Announce next action. List In Progress HEDGE tickets. Do this before anything else, without being asked.
- Auto-brief at session start: last worked on, completed, next step, In Progress HEDGE tickets
- Show Jira preview before creating/updating tickets
- Add Jira comments at: start of work, description enhancement, Done transition
- Never delete descriptions — only update or append
- Before closing any ticket: ask Simon if he wants to test first; capture response/evidence as a Jira comment before transitioning to Done
