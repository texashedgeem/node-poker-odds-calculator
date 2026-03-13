import { VercelRequest, VercelResponse } from '@vercel/node';
import { CardGroup, OddsCalculator } from '../src/index';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default function handler(req: VercelRequest, res: VercelResponse): void {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  const body = req.body;

  if (!body || !Array.isArray(body.players)) {
    res.status(400).json({ error: '"players" must be an array of card strings.' });
    return;
  }
  if (body.players.length < 2) {
    res.status(400).json({ error: '"players" must contain at least 2 hands.' });
    return;
  }
  if (body.players.length > 10) {
    res.status(400).json({ error: '"players" must contain at most 10 hands.' });
    return;
  }
  for (let i = 0; i < body.players.length; i++) {
    if (typeof body.players[i] !== 'string' || body.players[i].trim() === '') {
      res.status(400).json({ error: `"players[${i}]" must be a non-empty string.` });
      return;
    }
  }

  const game: string = body.game !== undefined ? body.game : 'full';
  if (game !== 'full' && game !== 'short') {
    res.status(400).json({ error: '"game" must be "full" or "short".' });
    return;
  }

  let iterations: number | undefined;
  if (body.iterations !== undefined) {
    if (typeof body.iterations !== 'number' || !Number.isInteger(body.iterations) || body.iterations < 1) {
      res.status(400).json({ error: '"iterations" must be a positive integer.' });
      return;
    }
    if (body.iterations > 100000) {
      res.status(400).json({ error: '"iterations" must not exceed 100000.' });
      return;
    }
    iterations = body.iterations;
  }

  const cardGroups: CardGroup[] = [];
  for (let i = 0; i < body.players.length; i++) {
    try {
      cardGroups.push(CardGroup.fromString(body.players[i]));
    } catch (e) {
      res.status(400).json({ error: `players[${i}] ("${body.players[i]}"): ${(e as any).message}` });
      return;
    }
  }

  let board: CardGroup | undefined;
  if (body.board !== undefined && body.board !== null && body.board !== '') {
    if (typeof body.board !== 'string') {
      res.status(400).json({ error: '"board" must be a string.' });
      return;
    }
    try {
      board = CardGroup.fromString(body.board);
    } catch (e) {
      res.status(400).json({ error: `board ("${body.board}"): ${(e as any).message}` });
      return;
    }
  }

  let result: OddsCalculator;
  try {
    result = OddsCalculator.calculate(cardGroups, board, game, iterations);
  } catch (e) {
    res.status(400).json({ error: (e as any).message });
    return;
  }

  res.status(200).json({
    players: body.players.map((cards: string, i: number) => ({
      cards,
      equity: result.equities[i].getEquity(),
      tiePercentage: result.equities[i].getTiePercentage(),
    })),
    iterations: result.getIterationCount(),
    elapsedTime: parseFloat((result.getElapsedTime() / 1000).toFixed(3)),
  });
}
