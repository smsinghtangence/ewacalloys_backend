'use strict';

/**
 * points service
 *
 * Thin proxy to an external loyalty/rewards provider's "block points" /
 * "unblock points" API. Configure the provider via env vars — see .env.example.
 */

const BASE_URL = process.env.LOYALTY_API_BASE_URL;
const BLOCK_PATH = process.env.LOYALTY_BLOCK_PATH || '/block';
const UNBLOCK_PATH = process.env.LOYALTY_UNBLOCK_PATH || '/unblock';
const AUTH_HEADER_NAME = process.env.LOYALTY_API_AUTH_HEADER || 'Authorization';
const AUTH_HEADER_VALUE = process.env.LOYALTY_API_KEY
  ? `Bearer ${process.env.LOYALTY_API_KEY}`
  : undefined;

module.exports = {
  async callProvider(action, payload) {
    if (!BASE_URL) {
      throw new Error(
        'LOYALTY_API_BASE_URL is not configured. Set it in .env before calling the points API.'
      );
    }

    const path = action === 'block' ? BLOCK_PATH : UNBLOCK_PATH;
    const headers = { 'Content-Type': 'application/json' };
    if (AUTH_HEADER_VALUE) {
      headers[AUTH_HEADER_NAME] = AUTH_HEADER_VALUE;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const error = new Error(`Loyalty provider responded with status ${response.status}`);
      error.status = response.status;
      error.body = json;
      throw error;
    }

    return json && typeof json === 'object' && 'data' in json ? json.data : json;
  },
};
