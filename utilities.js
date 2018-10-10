/**
 * @fileoverview:
 * Helper functions and constants to aid a11y-related issues.
 *
 * @namespace FocusManager.Utilities
 */


/**
 * Used to keep track of focus. Defaults to body.
 * @memberof FocusManager.Utilities
 * @type {HTMLElement}
 * @private
 */
let _focusStorage = document.body;


/**
 * Constants to prevent hardcoded logic in the actual code.
 * @memberof FocusManager.Utilities
 * @type {object}
 * @property {{NAME: string, VALUE: string}} INERT
 * @property {{NAME: string, VALUE: string}} ARIA_HIDDEN
 * @property {string} SECTION_SELECTOR
 */
export const ATTRIBUTES = {
  INERT: {
    NAME: 'inert',
    VALUE: '',
  },
  ARIA_HIDDEN: {
    NAME: 'aria-hidden',
    VALUE: 'hidden',
  },
  SECTION_SELECTOR: '[data-focus-section]',
};


/**
 * Set the aria-hidden state to an element.
 * @memberof FocusManager.Utilities
 * @param {HTMLElement} element - DOM node where we set state.
 * @param {boolean} flag - Whether the DOM node should be hidden.
 * @see {@link https://goo.gl/qwzZk7 | Google Developers}
 */
export function ariaHidden(element, flag) {
  if (flag) {
    element.setAttribute(ATTRIBUTES.ARIA_HIDDEN.NAME, ATTRIBUTES.ARIA_HIDDEN.VALUE);
  } else {
    element.removeAttribute(ATTRIBUTES.ARIA_HIDDEN.NAME);
  }
}


/**
 * Apply inert to an element.
 * @memberof FocusManager.Utilities
 * @param {HTMLElement} element - DOM node where we set state.
 * @param {boolean} flag - Whether the DOM node should have inert.
 */
export function inert(element, flag) {
  if (flag) {
    element.setAttribute(ATTRIBUTES.INERT.NAME, ATTRIBUTES.INERT.VALUE);
  } else {
    element.removeAttribute(ATTRIBUTES.INERT.NAME);
  }
}


/**
 * Save the currently focused element.
 * Useful if you want to save and restore focus to a specific element after e.g an alert or dialog.
 * @memberof FocusManager.Utilities
 */
export function saveFocus() {
  _focusStorage = /** @type {HTMLElement} */ (document.activeElement);
}


/**
 * Restore the focus to an element.
 * @memberof FocusManager.Utilities
 * @param {boolean} [waitAFrame=false] - Whether we should wait a frame before restoring
 *    focus to an element. Useful when dealing with toggling elements.
 * @return {HTMLElement} - Returns the saved element as a convenience.
 */
export function restoreFocus(waitAFrame = false) {
  if (waitAFrame) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      _focusStorage.focus();
      return _focusStorage;
    }));
  } else {
    _focusStorage.focus();
    return _focusStorage;
  }
}


/**
 * Set an element to be focusable or not.
 * @memberof FocusManager.Utilities
 * @param {HTMLElement} element
 * @param {boolean} shouldBeFocusable - Whether the element is allowed focus or not.
 */
export function focusable(element, shouldBeFocusable) {
  const giveFocus = !shouldBeFocusable;
  ariaHidden(element, giveFocus);
  inert(element, giveFocus);
}


/**
 * Whether the given element is focusable or not.
 * @memberof FocusManager.Utilities
 * @param {HTMLElement} element
 * @return {boolean}
 */
export function isHidden(element) {
  return element.hasAttribute(ATTRIBUTES.INERT.NAME);
}
