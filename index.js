/**
 * @fileoverview
 * A utility class that aides with computational focus.
 *
 * The main motivation for creating such a module comes from `inert` and its inconvenient way
 *    of intentional "focus-trapping" for e.g a dialog or drawer. On several projects I found
 *    myself creating an array of different sections of the site only to give them an attribute.
 *    Hopefully this class helps with that. Alongside that it has some common a11y functions.
 *
 * @example
 * HTML:
 * <nav data-focus-section="topbar"></nav>
 * <main   data-focus-section="main"></main>
 * <dialog data-focus-section="mydialog"></dialog>
 *
 * JS:
 * const fm = new FocusManager();
 * fm.rejectFocusToAllSections();
 * fm.allowFocusToSection('mydialog');
 *
 */

import {
  ATTRIBUTES,
  focusable,
  isHidden,
} from './utilities';


/**
 * A utility class that aides with computational focus.
 */
class FocusManager {
  /**
   * Set up all members.
   */
  constructor() {
    /**
     * This object will store all top-level sections of the site for easy access.
     * @type {?NodeListOf<HTMLElement> | {}}
     * @private
     **/
    this._sections = {};

    /** @type {?NodeListOf<HTMLElement>} */
    const sections = document.querySelectorAll(ATTRIBUTES.SECTION_SELECTOR);

    sections.forEach((element) => {
      /** @type {string} */
      const key = element.dataset.focusSection;

      this._sections[key] = {
        element,
        focusable: !isHidden(element),
      };
    });
  }


  /**
   * Return all pre-defined sections of importance.
   * @return {?NodeListOf<HTMLElement>}
   */
  get sections() {
    return this._sections;
  }


  /**
   * Add a section.
   * This should only be used when an important section gets programmatically added to the DOM.
   * Otherwise you should probably do it through the data attributes.
   * @param {string} key
   * @param {HTMLElement} element
   */
  addSection(key, element) {
    this._sections[key] = {
      element,
      focusable: !isHidden(element),
    };
  }

  /**
   * Remove a section.
   * This means that this section will no longer be accessible through the key format.
   * This could potentially lead to buggy focus-behaviour and should only be used if
   *    the given section gets removed from the DOM, or changes hierarchically so it isn't
   *    as important anymore.
   * @param {string} key
   */
  removeSection(key) {
    delete this._sections[key];
  }


  /**
   * Reject focus from all important sections.
   * Useful if you want to give focus to one particular section, e.g a dialog.
   */
  rejectFocusToAllSections() {
    Object.keys(this._sections).forEach((key) => this.rejectFocusToSection(key));
  }


  /**
   * Reject focus from a section in particular.
   * @param {string} key
   */
  rejectFocusToSection(key) {
    const {element} = this._sections[key];

    focusable(element, false);

    this._sections[key].focusable = false;
  }


  /**
   * Allow focus to a specific section.
   * @param {string} key
   */
  allowFocusToSection(key) {
    const {element} = this._sections[key];

    focusable(element, true);

    this._sections[key].focusable = true;
  }
}

export default FocusManager;
