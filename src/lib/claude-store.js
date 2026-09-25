import { ls } from './storage.js';

// The API key is typed in by the user and kept only in this device's localStorage.
// It is excluded from backups (see App.exportBackup) and never leaves the phone except to api.anthropic.com.
export const KEY_STORAGE = 'claudeApiKey';
export const CHAT_STORAGE = 'claudeChat';

export const getApiKey = () => { try { return localStorage.getItem(KEY_STORAGE) || ''; } catch (e) { return ''; } };
export function setApiKey(key) {
  try { if (key) localStorage.setItem(KEY_STORAGE, key.trim()); else localStorage.removeItem(KEY_STORAGE); } catch (e) {}
}

export function loadChat() { return ls(CHAT_STORAGE, []); }
export function saveChat(msgs) { try { localStorage.setItem(CHAT_STORAGE, JSON.stringify(msgs.slice(-30))); } catch (e) {} }
