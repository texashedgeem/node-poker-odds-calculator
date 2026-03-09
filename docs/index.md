---
layout: default
title: Home
---

<div class="hero">
  <h1>Poker Odds Calculator</h1>
  <p class="tagline">Fast, accurate Texas Hold'em hand equity calculations — as a REST API and Node.js library.</p>
  <div>
    <span class="badge">Pre-flop</span>
    <span class="badge">Post-flop</span>
    <span class="badge">Short Deck</span>
    <span class="badge">REST API</span>
    <span class="badge">MIT License</span>
  </div>
  <div style="margin-top: 24px;">
    <a href="/node-poker-odds-calculator/api" class="btn btn-primary">API Documentation</a>
    <a href="https://github.com/texashedgeem/node-poker-odds-calculator" class="btn btn-secondary" target="_blank" rel="noopener">View on GitHub</a>
  </div>
</div>

## What it does

Given any combination of player hands and an optional board, the calculator determines each player's **equity** (chance of winning) and **tie percentage** across all possible remaining cards.

<div class="features">
  <div class="feature-card">
    <h3>Pre-flop odds</h3>
    <p>Monte Carlo simulation over 100,000 iterations for fast, accurate pre-flop equity.</p>
  </div>
  <div class="feature-card">
    <h3>Post-flop exact odds</h3>
    <p>Exhaustive enumeration at the flop, turn, and river for precise percentages.</p>
  </div>
  <div class="feature-card">
    <h3>Short Deck support</h3>
    <p>Full support for the Short Deck (6+) variant with adjusted hand rankings (flush beats full house).</p>
  </div>
  <div class="feature-card">
    <h3>REST API</h3>
    <p>Zero-config JSON API hosted on Vercel. Call it from any language or browser.</p>
  </div>
</div>

## REST API quick start

Send a `POST` request to the live API:

```bash
curl -X POST https://node-poker-odds-calculator.vercel.app/api/odds \
  -H 'Content-Type: application/json' \
  -d '{
    "players": ["AsAc", "AhAd", "KsKc"],
    "iterations": 10000
  }'
```

Response:

```json
{
  "players": [
    { "cards": "AsAc", "equity": 2, "tiePercentage": 76 },
    { "cards": "AhAd", "equity": 2, "tiePercentage": 76 },
    { "cards": "KsKc", "equity": 20, "tiePercentage": 1 }
  ],
  "iterations": 10000,
  "elapsedTime": 0.375
}
```

Card notation: rank (`A K Q J T 2-9`) + suit (`s h d c`). Board is optional — omit it for pre-flop.

[Full API reference →]({{ site.baseurl }}/api)

## Node.js library

```bash
npm install poker-odds-calculator
```

```typescript
import { CardGroup, OddsCalculator } from 'poker-odds-calculator';

const player1 = CardGroup.fromString('AsKs');
const player2 = CardGroup.fromString('JdJc');
const board    = CardGroup.fromString('AhJh2d');

const result = OddsCalculator.calculate([player1, player2], board);

console.log(result.equities[0].toString()); // e.g. "67%"
console.log(result.equities[1].toString()); // e.g. "33%"
```
