export const CURSOR_DISABLED_KEY = "gw-custom-cursor-disabled";
export const CURSOR_PREFERENCE_EVENT = "gw-cursor-preference-change";

export const isCustomCursorDisabled = () => localStorage.getItem(CURSOR_DISABLED_KEY) === "true";

export const setCustomCursorDisabled = (disabled: boolean) => {
  localStorage.setItem(CURSOR_DISABLED_KEY, String(disabled));
  window.dispatchEvent(new CustomEvent(CURSOR_PREFERENCE_EVENT, { detail: { disabled } }));
};