# Px-dropdown

Px-dropdown is a select-like component in the Predix UI platform.

## Overview

px-dropdown is an element which can be placed in any element, and opens a customizable dropdown list.

## Usage

### Prerequisites
1. node.js
2. npm
3. bower
4. [webcomponents-lite.js polyfill](https://github.com/webcomponents/webcomponentsjs)

Node, npm and bower are necessary to install the component and dependencies. webcomponents.js adds support for web components and custom elements to your application.

### Getting Started

First, install the component via bower on the command line.

```
bower install https://github.com/PredixDev/px-dropdown.git --save
```

Second, import the component to your application with the following tag in your head.

```
<link rel="import" href="/bower_components/px-dropdown/px-dropdown.html"/>
```

Finally, use the component in your application:

```
<px-dropdown>
  <px-dropdown-text class="px-dropdown-text" display-value="Text"></px-dropdown-text>
  <px-dropdown-content class="px-dropdown-content" max-cont-character-width="10"
  extend-dropdown="true" extend-dropdown-by="15" items='[{"key":"one", "val": "One"}, {"key":"two", "val": "Two"}, {"key":"three", "val": "Three"}, {"key":"four", "val": "How now brown cow"}]'>
  </px-dropdown-content>
</px-dropdown>
```

<br />
<hr />

## Attributes (on px-dropdown-content)

#### extend-dropdown

*Type:* **Boolean** - (*Optional*) - *Default:* "false"

An attribute which specifies whether the dropdown should extend beyond the container it's in.

```
<px-dropdown-content
...
  extend-dropdown="true">
</px-dropdown--content>
```
#### extend-dropdown-by

*Type:* **Number** - (*Optional*) - *Default:* "15"

An attribute which specifies the amount -in pixels - that the dropdown should extend in width.
```
<px-dropdown-content
...
  extend-dropdown="true"
  extend-dropdown-by="15">
</px-dropdown--content>
```

#### items

*Type:* **Object** - (*Required*) - *Default:* ""

This is an array that holds either an object literal with a list of items, or an array of strings.
Please note that if you pass in an array of items, the value *key* must be set to **'val'**.

```
<px-dropdown-content
...
 items='[{"key":"one", "val": "One"}, {"key":"two", "val": "Two"}, {"key":"three", "val": "Three"}, {"key":"four", "val": "How now brown cow"}]'>
</px-dropdown-content>
```

#### max-cont-character-width

*Type:* **Number** - (*Optional*) - *Default:* "0"

A number which represents the number of characters allowed in the dropdown before the string is clipped, and has an ellipsis added to the end of it. Clipping a string means a px-tooltip component appears on hover with the full - unclipped - string in it.


```
<px-dropdown-content  
  max-cont-character-width="10"
  .... >
....
</px-dropdown-content>

```
<br />

## Attributes (on px-dropdown)

#### hide-chevron

*Type:* **Boolean** - (*Optional*) - *Default*: false

an attribute that allows you to hide the chevron.

```
<px-dropdown hide-chevron="true">
  ...
</px-dropdown>

```

#### bound-target

*Type:* **HTMLElement** - (*Optional*) - *Default*: null

If this attribute is set, its bounds will be used to contain the dropdown. The dropdown will resize and position itself to always be within those bounds.
This is typically a reference to an element, but it can also just be an element id.

```
<div id="someContainer">
  <px-dropdown bound-target="someContainer">
    ...
  </px-dropdown>
</div>

```

## Attributes (on px-dropdown-text)

#### display-value

*Type:* **String** - (*Optional*) - *Default*: ''

An attribute that is used to display the initial text showing up in the dropdown.

```
<px-dropdown-text display-value="Text"></px-dropdown-text>

```

<hr />


## Local Development

From the component's directory...

```
$ npm install
$ bower install
$ grunt sass
```

From the component's directory, to start a local server run:

```
$ grunt depserve
```

Navigate to the root of that server (e.g. http://localhost:8080/) in a browser to open the API documentation page, with link to the "Demo" / working examples.

### LiveReload

By default grunt watch is configured to enable LiveReload and will be watching for modifications in your root directory as well as `/css`.

Your browser will also need to have the LiveReload extension installed and enabled. For instructions on how to do this please refer to: [livereload.com/extensions/](http://livereload.com/extensions/).

Disable LiveReload by removing the `livereload` key from the configuration object or explicitly setting it to false.


### DevMode
Devmode runs `grunt depserve` and `grunt watch` concurrently so that when you make a change to your source files and save them, your preview will be updated in any browsers you have opened and turned on LiveReload.
From the component's directory run:

```
$ grunt devmode
```

### GE Coding Style Guide
[GE JS Developer's Guide](https://github.com/GeneralElectric/javascript)

<br />
<hr />

## Known Issues

Please use [Github Issues](https://github.com/PredixDev/px-dropdown/issues) to submit any bugs you might find.
