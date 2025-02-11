import app from '../server';

export default async function handler(req, res) {
  await app(req, res);
} 