// Small helper functions shared by both apps (ES6 module)
export const $ = (selector) => document.querySelector(selector);

export const showMessage = (el, text, isError = false) => {
  el.textContent = text;
  el.className = isError ? 'message error' : 'message';
};
