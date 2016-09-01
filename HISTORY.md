v0.12.1
===============
* Fixed dropdown-content demo

v0.12.0
===============
* Uprev

v0.11.5
===============
* fixed demo bug

v0.11.4
===============
* removed the text and chevron demo pages, since they are internal, and made the components load with parentComponent, so they can work with codepen.

v0.11.3
===============
* added parent-name to demo-snippet and changed over the polymer-font-awesome library

v0.11.2
===============
* added other demo pages to vulcanize

v0.11.1
===============
* updated demo bugs

v0.11.0
===============
* Added 'selectedKey' attribute to dropdown, representing the key of the currently selected item

v0.10.5
===============
* updated mega demo styles and bower px-demo-snippet to ^

v0.10.4
===============
* added image to readme, removed watch, added view on github

v0.10.3
===============
* updated gh-pages script to vulcanize demo

v0.10.1
===============
* Fix to make px-dropdown play with Angular nicely. Added Angular demo, also.

v0.10.0
===============
* Upgrade to Polymer 1.5.0

v0.9.9
===============
* Added --dropdown_content_margin to control the dropdown content margin

v0.9.8
===============
* Added --dropdown_text_padding to control text padding and make internal element use flex layout

v0.9.7
===============
* up minor version on polymer font awesome

v0.9.6
===============
* removed dependency on .px-dropdown-content class

v0.9.5
===============
* added oss_notice to bower ignore

v0.9.4
===============
* added pull request test for travis and updated OSS Notice

v0.9.3
===============
* added auto github pages functionality

v0.9.2
===============
* Minor CSS text colour fix.

v0.9.1
===============
* Fix bug where selecting an item having a tooltip would set the value and displayValue to this item + its tooltip

v0.9.0
===============
* Upgrade to Polymer 1.4.0

v0.8.1
================
* display-value attribute now notifies

v0.8.0
================
* Apply scroll lock only if content has vertical scroll bars
* added 'checkbox-mode' attribute on px-dropdown-content, allowing it to function as a list of items with checkboxes

v0.7.4
================
* brought the default border color for dropdown.

v0.7.3
================
* Fix tooltip bug in datatable
v0.7.2
================
* removed documentation from README, and replaced with link to github page, where cos are auto generated.

v0.7.1
================
* updated readme and added stopPropagation on internal events

v0.7.0
================
* removed px-dropdown-lock-width
* added readonly 'value' attribute on dropdown, computed from display-value. Fire "change" event on dropdown when value changes

v0.6.2
================
* more data-table fixes. Fire px-dropdown-lock-width event when requiring a container to lock its width to the dropdown width.

v0.6.1
================
* fix bug when embedded in data-table

v0.6.0
=================
* fix firefox positioning bug
* added allow-outside-scroll attribute on px-dropdown-content. By default lock scrolling on the dropdown when open and prevent scrolling everywhere else.

v0.5.0
==================
* px-dropdown-text now already included in px-dropdown. Use display-value attribute on px-dropdown to set its text

v0.4.1
==================
* fixed Shadow Dom support
* fixed IE10 selected value bug

v0.4.0
==================
* new attribute on px-dropdown: prevent-close-on-outside-click. Default to false and dropdown now automatically closes on outside clicks

v0.3.0
==================
* make it more obvious it is possible to scroll by reducing the height of the dropdown by half an item's height if the dropdown has scrollbars
* added bound-target attribute: if set the dropdown will always try to fit within this HTMLElement
* fixed setDivWidth on click function bug.

v0.2.0
==================
* changed the way the initial text is passed in (added attribute display-value)
* added a hide-chevron attribute
* Updated styles
* max container character count now also applies to the px-text portion of the component.

v0.1.0
==================
* added smart orientation which detects if the dropdown will show below the viewport, and display the dropdown above the element clicked.
* Updated styles/spacing/chevron
* removed the need to call px-dropdown-chevron - it's baked into the component now.

v0.0.3
==================
* Updated License

v0.0.2
==================
* added hover and opened styles/classes

v0.0.1
==================
* Initial release, px-dropdown supports receiving an array of items, and displays a dropdown list when either the text or the chevron are clicked. A click on the item itself fires off a "px-dropdown-click" event, and passed the click event with it.
