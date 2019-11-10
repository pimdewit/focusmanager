
# FocusManager


**NOTE: This package is made redundant by the new proposal for `document.blockingElements`. Please do not use this library, instead use [`blocking-elements`](https://github.com/PolymerLabs/blocking-elements).**
---
---
---


![FocusManager, by Pim de Wit](/.repository/focus-manager.svg)


**[DOCS](https://pimdewit.github.io/focusmanager)**

## Installation

`npm install --save @pdw.io/focusmanager`
or
`yarn add @pdw.io/focusmanager`

## Concept

A utility class that aides with computational focus.
The main motivation for creating such a module comes from `inert` and its inconvenient way of intentional "focus-trapping" for e.g a dialog or drawer. On several projects I found myself creating an array of different sections of the site only to give them an attribute. Hopefully this class helps with that. Alongside that it has some common a11y functions.
   
```html
<nav data-focus-section="topbar"></nav>
<main data-focus-section="main"></main>
<dialog data-focus-section="mydialog"></dialog>
```


```javascript
import FocusManager from 'focusmanager';
const fm = new FocusManager();
fm.rejectFocusToAllSections();
fm.allowFocusToSection('mydialog');
```

## Utilities

There are several utility functions available that could proof useful in your app.

```javascript
import * as utilities from '@pdw.io/focusmanager/utilities';
// Or treeshaking `import {ariaHidden} from '@pdw.io/focusmanager/utilities';`

utilities.ariaHidden(myElement, true);
```

**[DOCS](https://pimdewit.github.io/focusmanager)**
