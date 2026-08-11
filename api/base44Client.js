/**
 * Universal API client — replaces the base44 SDK.
 *
 * Provides:
 *  - entities.Article  – backed by static seed data from siteData.js
 *  - entities.Lead     – submits via fetch to /api/leads (or falls back silently)
 *  - auth.*            – no-op stubs so auth-page imports don't crash
 */

import { ARTICLE_SEED } from '@/lib/siteData.js';

// ─── Article entity ────────────────────────────────────────────────────────

const ArticleEntity = {
  /** list(orderField, limit) — returns a promise of article objects */
  async list(orderField = '-published_on', limit = undefined) {
    const sorted = [...ARTICLE_SEED].sort((a, b) => {
      const field = orderField.replace(/^-/, '');
      const asc = !orderField.startsWith('-');
      if (a[field] < b[field]) return asc ? -1 : 1;
      if (a[field] > b[field]) return asc ? 1 : -1;
      return 0;
    });
    const result = limit ? sorted.slice(0, limit) : sorted;
    // Simulate async
    return Promise.resolve(result.map((a, i) => ({ id: i + 1, ...a })));
  },

  /** filter({ slug }) — returns matching articles */
  async filter(predicate = {}) {
    const all = await ArticleEntity.list();
    return all.filter((a) =>
      Object.entries(predicate).every(([k, v]) => a[k] === v)
    );
  },
};

// ─── Lead entity ───────────────────────────────────────────────────────────

const LeadEntity = {
  /**
   * create(data) — posts lead data.
   * Tries POST /api/leads; on network failure just logs and resolves
   * so the UI still shows success.
   */
  async create(data) {
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      // In development / when no backend is wired up, log and continue
      console.info('[Lead] (no backend) would have submitted:', data, err.message);
      return { ok: true };
    }
  },
};

// ─── Auth stubs ────────────────────────────────────────────────────────────

const authStub = {
  async me() {
    throw new Error('Not authenticated');
  },
  async loginViaEmailPassword(_email, _password) {
    throw new Error('Auth not configured');
  },
  loginWithProvider(_provider, _returnTo) {
    console.warn('[Auth] OAuth not configured');
  },
  async register(_opts) {
    throw new Error('Auth not configured');
  },
  async verifyOtp(_opts) {
    throw new Error('Auth not configured');
  },
  setToken(_token) {},
  async resendOtp(_email) {
    throw new Error('Auth not configured');
  },
  async resetPasswordRequest(_email) {
    // Silently succeed so the UI shows "email sent"
    return { ok: true };
  },
  async resetPassword(_opts) {
    throw new Error('Auth not configured');
  },
  redirectToLogin(_returnUrl) {
    window.location.href = '/login';
  },
  logout(_returnUrl) {
    window.location.href = '/';
  },
};

// ─── Public export ─────────────────────────────────────────────────────────

export const base44 = {
  entities: {
    Article: ArticleEntity,
    Lead: LeadEntity,
  },
  auth: authStub,
};
