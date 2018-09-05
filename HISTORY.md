v4.7.8
==================
* Removed id #searchbox from px-dropdown and used the class variable .search__box.
* This ensures no duplicate 'non-unique id' error that chrome console checks for.

v4.7.6
==================
* fix event documentation

v4.7.5
==================
* fix width inheritance of content on resize
* close dropdown when trigger tapped again

v4.7.4
==================
* fix width inheritance of content

v4.7.3
==================
* fix width inheritance

v4.7.2
==================
* revert all accidental sass changes from 4.7.0

v4.7.1
==================
* fix mobile responsiveness

v4.7.0
==================
* add disable-truncate property for content items

v4.6.0
==================
* Adding px-overlay-content to optionally hoist content.
* px-dropdown was broken up into two sub components to facilitate hoisting.
  * Adds JS to dynamically watch for a trigger element to be added to the trigger slot so we can avoid breaking the API. We can't just pass the trigger down because in v1 Shadow DOM slots passed down twice that are empty still wipe out any
default content.
  * Refactor px-dropdown-content to just listen for click event emitting from the trigger
  * Move all code that deals with items into px-dropdown-content to cleanly seperate concerns. px-dropdown is just a wrapper that connects the trigger and content together and passes properties and slotted content down.

v4.5.4
==================
* fixing demo pages for IE11

v4.5.3
==================
* update demo to be clearer

v4.5.2
==================
* revert simple_demo change

v4.5.1
==================
* add min width/height vars for product-switcher

v4.5.0
==================
* add mobile responsiveness
* add caret and header/footer slots to support px-product-switcher

v4.4.3
==================
* update tests

v4.4.2
==================
* fix keyboard a11y

v4.4.1
==================
* fix icon size (#70)

v4.4.0
==================
* allow disableSelect on individual items

v4.3.4
==================
* fix v4.3.1 to work in Polymer 1

v4.3.3
==================
* remove min btn width

v4.3.2
==================
* add disableSelect property for use in menus

v4.3.1
==================
* make _itemsChanged more flexible

v4.3.0
==================
* add app-localize-behavior (#68)

v4.2.2
==================
* fix sizing issues (#67)

v4.2.1
==================
* Add missing style var to docs

v4.2.0
==================
* Adds `trigger` slot to support developer-defined custom trigger, see docs for
  more information

v4.1.0
==================
* Polymer 1.x/2.x hybrid element support

v4.0.18
==================
* fix demo

v4.0.17
==================
* add device flags

v4.0.16
==================
* remove web-animations (#62)

v4.0.15
==================
* resolve version conflict for web-animations (#62)

v4.0.14
==================
* add null check (#59)

v4.0.13
==================
* expose variable to fix style of breadcrumbs

v4.0.12
==================
* handle items changes correctly, new boolean

v4.0.11
==================
* revert 4.0.10

v4.0.10
==================
* clear selections on items change

v4.0.9
==================
* add support for icons in the dropdown

v4.0.8
==================
* add missing style vars to docs

v4.0.7
==================
* fix typo

v4.0.6
==================
* add back px-dropdown-click event

v4.0.5
==================
* Fix comment for analyzer

v4.0.4
==================
* switch to px-utl:check icon

v4.0.3
==================
* runtime theming for demo

v4.0.2
==================
* update demo per design feedback

v4.0.1
==================
* Changed how search icon is positioned

v4.0.0
==================
* rebuild of the px-dropdown component using iron-dropdown and iron-selector
* added new icons
* code review fixes
* fix #50, #51, #52
* add prop for disableClear

v3.1.1
==================
* fix for failing FF unit test

v3.1.0
==================
* merge PR #36 to add keyboard support

v3.0.0
==================
* turned off new functionality from PR #32 by default

v2.5.1 (tag deleted)
==================
* fixed display issue with search box, added unit tests

v2.5.0 (tag deleted)
==================
* merge PR #32, add search and sort functionality

v2.4.5
==================
* changed position back to relative, fixed demo

v2.4.4
==================
* changed position to absolute

v2.4.3
==================
* improved accessibility

v2.4.2
==================
* fix disabled text color

v2.4.0
==================
* added chevron css vars

v2.3.1
==================
* remove old theming and remove shields from subcomponent

v2.3.0
==================
* standardized style variable naming

v2.2.11
==================
* fixed CodePen for subcomponent

v2.2.10
==================
* updated usage documentation

v2.2.9
==================
* Ensure tooltip is hidden when scrolling the dropdown content

v2.2.8
==================
* Ensure click on checkboxes don't throw an error

v2.2.7
==================
* Update demo with multiple pages

v2.2.6
==================
* added new demo component

v2.2.5
==================
* clear up checkbox-mode confusion from demo (#28)

v2.2.4
==================
* Update colors design to pick up new colors

v2.2.3
==================
* rebuild demo css

v2.2.2
==================
* changing ghp.sh to account for Alpha releases

v2.2.1
==================
* fixed event propogation per #26

v2.2.0
==================
* added capability to disable a dropdown item

v2.1.4
==================
* added styles for validation classes from px-forms-design

v2.1.3
==================
* fix missing comma in bower.json

v2.1.2
==================
* updating dropdown styles to match spec and adding checkbox mode to demo

v2.1.1
==================
* Updated iron-dropdown dependency

v2.1.0
==================
* Updated dependencies

v2.0.8
==================
* changing browser in wct testing from safari 8 to safari 10 on elcapitan

v2.0.7
==================
* added --px-dropdown-text-color css var

v2.0.6
==================
* changing all devDeps to ^

v2.0.5
==================
* Update px-theme to 2.0.1 and update test fixtures

v2.0.4
==================
* removing px-theme style call


v2.0.3
==================
* changing Gruntfile.js to gulpfile.js

v2.0.2
==================
* fixed style variables for consistency

v2.0.1
==================
* added the style header in the docs

v2.0.0
==================
* added css variables, and changed previous ones to match the BEM naming.

v1.0.1
==================
* bower updating px-demo-snippet

v1.0.0
===============
* accepted PR that fixed multiple checkbox behavior and standardized event names

v0.13.0
===============
* added property for disabled dropdown

v0.12.3
===============
* Updated dependencies

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
