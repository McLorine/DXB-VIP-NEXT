/**
 * app-params.js — universal URL / storage param helper.
 * All base44-specific keys have been replaced with generic app_ prefixed ones.
 */

const isNode = typeof window === 'undefined';
const storage = isNode ? { getItem: () => null, setItem: () => {}, removeItem: () => {} } : window.localStorage;

const toSnakeCase = (str) => str.replace(/([A-Z])/g, '_$1').toLowerCase();

export function getAppParamValue(paramName, { defaultValue = undefined, removeFromUrl = false } = {}) {
  if (isNode) return defaultValue;
  const storageKey = `app_${toSnakeCase(paramName)}`;
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(paramName);
  if (removeFromUrl) {
    urlParams.delete(paramName);
    const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
  }
  if (searchParam) { storage.setItem(storageKey, searchParam); return searchParam; }
  if (defaultValue !== undefined) { storage.setItem(storageKey, defaultValue); return defaultValue; }
  const stored = storage.getItem(storageKey);
  return stored ?? null;
}

export const appParams = {
  fromUrl: isNode ? '/' : window.location.href,
};
