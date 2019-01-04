/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function flushAndRender(cb) {
  flush(() => {
    requestAnimationFrame(() => {
      cb();
    });
  });
}

describe("Custom Automation Tests for px-dropdown", function(done) {
  let px_dropdown;
  let px_dropdown_content;
  let px_dropdown_button;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-fixture");
    flush(() => {
      px_dropdown_content = px_dropdown.$.content.$.dropdown;
      px_dropdown_button = px_dropdown.$.trigger.$.trigger;
      done();
    });
  });

  it("Selecting item with a long value constrains the content to max-width", function(done) {
    let dropdown_option = px_dropdown_content.querySelectorAll(
      ".dropdown-option"
    )[3];
    var item_click = function(e) {
      flush(function() {
        assert.equal(e.detail.key, "4");
        assert.equal(px_dropdown.selected, "4");
        assert.equal(
          e.detail.val,
          "A very long value to test that the trigger and content widths can be constrained"
        );
        const triggerSize = px_dropdown_button.getBoundingClientRect();

        expect(Math.trunc(triggerSize.width) == 400).to.be.true;
        done();
      });
    };
    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
  });

  it("Selecting item with a short value has no width constraint", function(done) {
    let dropdown_option = px_dropdown_content.querySelectorAll(
      ".dropdown-option"
    )[0];
    var item_click = function(e) {
      flush(function() {
        assert.equal(e.detail.key, "1");
        assert.equal(px_dropdown.selected, "1");
        assert.equal(e.detail.val, "One");
        const triggerSize = px_dropdown_button.getBoundingClientRect();
        expect(triggerSize.width < 400).to.be.true;
        done();
      });
    };
    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
  });

  it("Keyboard space: px-dropdown should open upon pressing space", function(done) {
    assert.isTrue(px_dropdown_content.hasAttribute("aria-hidden"));
    MockInteractions.pressSpace(px_dropdown);
    assert.isFalse(px_dropdown_content.hasAttribute("aria-hidden"));
    done();
  });

  it("Keyboard down: px-dropdown item should get focus on pressing down arrow", function(done) {
    let firstItem = px_dropdown_content.querySelector(".dropdown-option");

    //Make sure dropdown is open before running the tests.
    if (px_dropdown_content.hasAttribute("aria-hidden")) {
      MockInteractions.pressSpace(px_dropdown);
    }

    MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 40);

    assert.isTrue(firstItem.classList.contains("focused"));

    done();
  });

  it("Keyboard enter: px-dropdown item should be selected on pressing enter", function(done) {
    let firstItem = px_dropdown_content.querySelector(".dropdown-option");

    px_dropdown.selected = null;

    //Make sure dropdown is open before running the tests.
    if (px_dropdown_content.hasAttribute("aria-hidden")) {
      MockInteractions.pressSpace(px_dropdown);
    }

    if (!firstItem.classList.contains("focused")) {
      MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 40);
      flush(() => {
        assert.isTrue(firstItem.classList.contains("focused"));
      });
    }
    //Make sure first item is highlighted

    var item_click = function(e) {
      flush(() => {
        assert.equal(e.detail.val, "One");
        assert.equal(e.detail.key, "1");
        assert.equal(px_dropdown.selected, "1");
        done();
      });
    };

    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);

    MockInteractions.pressEnter(firstItem);
  });

  it("Checks if dropdown opens on container click", function(done) {
    px_dropdown.$.trigger.click();
    flushAndRender(() => {
      assert.isTrue(px_dropdown_content.style.display !== "none");
      done();
    });
  });

  it("Selecting an element changes selected property", function(done) {
    let dropdown_option = px_dropdown_content.querySelectorAll(
      ".dropdown-option"
    )[2];
    var item_click = function(e) {
      flush(function() {
        assert.equal(e.detail.val, "Three");
        assert.equal(e.detail.key, "3");
        assert.equal(px_dropdown.selected, "3");
        done();
      });
    };
    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
  });

  it("Selecting an element changes _displayValueSelected property", function(done) {
    let dropdown_option = px_dropdown_content.querySelectorAll(
      ".dropdown-option"
    )[2];
    var item_click = function(e) {
      flush(function() {
        assert.equal(px_dropdown._displayValueSelected, "Three");
        done();
      });
    };
    assert.isUndefined(px_dropdown._displayValueSelected);
    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
  });

  it("Compare passed items to what is on the dropdown itself", function(done) {
    let selector = px_dropdown.$.content.$.selector,
      divs = Polymer.dom(selector.root).querySelectorAll("div"),
      items = px_dropdown.items;

    Array.prototype.forEach.call(divs, function(div, index) {
      assert.equal(div.textContent.trim(), items[index].val);
    });
    done();
  });

  it("checks if Hide Chevron actually hides the chevron", function(done) {
    px_dropdown.hideChevron = true;
    let chevron = Polymer.dom(px_dropdown.root).querySelector("iron-icon");
    expect(chevron).to.be.null;
    done();
  });

  it("check if dropdown closes on outside click", function(done) {
    const title = Polymer.dom(document).querySelector("#title");
    px_dropdown.$.trigger.click();

    flushAndRender(() => {
      assert.isTrue(px_dropdown.opened);
      title.click();
      flushAndRender(() => {
        assert.isFalse(px_dropdown.opened);
        done();
      });
    });
  });

  it("check if dropdown closes on trigger click", function(done) {
    px_dropdown.$.trigger.click();

    flushAndRender(() => {
      assert.isTrue(px_dropdown.opened);
      px_dropdown.$.trigger.click();
      flushAndRender(() => {
        assert.isFalse(px_dropdown.opened);
        done();
      });
    });
  });

  it("check if dropdown does not close on outside click when preventCloseOnOutsideClick is set", function(done) {
    const title = Polymer.dom(document).querySelector("#title");
    px_dropdown.preventCloseOnOutsideClick = true;

    px_dropdown.$.trigger.click();

    flushAndRender(() => {
      // click outside the dropdown
      title.click();

      flushAndRender(() => {
        assert.isTrue(px_dropdown.opened);
        done();
      });
    });
  });
});

describe("Custom Automation Tests for search feature px-dropdown", function(done) {
  let px_dropdown;
  let px_dropdown_content;
  let px_dropdown_button;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-search-fixture");
    flush(() => {
      px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector(
        "#dropdown"
      );
      px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector(
        "#trigger"
      );
      done();
    });
  });

  it("Check that search box appears when in search mode", function(done) {
    flush(() => {
      let input = Polymer.dom(px_dropdown.$.content.root).querySelector(
        ".search__box"
      );
      assert.isTrue(input.classList.contains("text-input"));
      done();
    });
  });
});

describe("Custom Automation Tests for sort feature px-dropdown", function(done) {
  let px_dropdown;
  let px_dropdown_content;
  let px_dropdown_button;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-sort-fixture");
    flush(() => {
      px_dropdown_content = px_dropdown.$.content.$.dropdown;
      px_dropdown_button = px_dropdown.$.trigger.$.trigger;
      done();
    });
  });

  it("Sort mode: items can be sorted by keys", function(done) {
    let selector = px_dropdown.$.content.$.selector,
      divs = Polymer.dom(selector.root).querySelectorAll("div");

    assert.equal(divs[0].textContent.trim(), "Four");
    px_dropdown.sortMode = "key";
    divs = Polymer.dom(selector.root).querySelectorAll("div");
    assert.equal(divs[0].textContent.trim(), "One");
    done();
  });

  it("Sort mode: items can be sorted by values", function(done) {
    let selector = px_dropdown.$.content.$.selector,
      divs = Polymer.dom(selector.root).querySelectorAll("div");

    assert.equal(divs[0].textContent.trim(), "Four");
    px_dropdown.sortMode = "val";
    divs = Polymer.dom(selector.root).querySelectorAll("div");
    assert.equal(divs[0].textContent.trim(), "Four");
    done();
  });
});

describe("Custom Automation Tests for multiple display values feature px-dropdown", function(done) {
  let px_dropdown;
  let px_dropdown_button;
  let dropdown_option;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-multi-select-values-fixture");
    flush(() => {
      px_dropdown_button = px_dropdown.$.trigger.$.trigger;
      done();
    });
  });

  it("Trigger label is 'One, Two, Three' as section count is <= display-value-count", function(done) {
    assert.equal(
      px_dropdown._displayValueSelected,
      "One, Two, Three",
      "expected trigger value to be 'One, Two, Three'"
    );
    done();
  });

  it("Trigger label is '4 selected' as section count is > display-value-count", function(done) {
    px_dropdown_content = px_dropdown.$.content.$.dropdown;
    px_dropdown_button = px_dropdown.$.trigger.$.trigger;
    dropdown_option = Polymer.dom(px_dropdown.$.content.root).querySelectorAll(
      ".dropdown-option"
    )[3];

    var item_click = function(e) {
      assert.equal(
        px_dropdown._displayValueSelected,
        "4 selected",
        "expected trigger value to be '4 selected'"
      );
      done();
    };
    px_dropdown_button.click();
    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
  });
});

describe("Close with esc key tests for px-dropdown", function(done) {
  let px_dropdown;
  let px_dropdown_content;
  let px_dropdown_button;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-fixture");
    flush(() => {
      px_dropdown_content = px_dropdown.$.content.$.dropdown;
      px_dropdown_button = px_dropdown.$.trigger.$.trigger;
      done();
    });
  });

  it("Keyboard esc: px-dropdown should close", function() {
    let firstItem = px_dropdown_content.querySelector(".dropdown-option");

    //Make sure dropdown is open before running the tests.
    if (px_dropdown_content.hasAttribute("aria-hidden")) {
      MockInteractions.pressSpace(px_dropdown);
    }

    MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 27);

    assert.isTrue(px_dropdown_content.hasAttribute("aria-hidden"));
  });
});

describe("Multi select tests for px-dropdown", function(done) {
  let px_dropdown;
  let px_dropdown_button;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-multi-element-fixture");
    flush(() => {
      px_dropdown_button = px_dropdown.$.trigger.$.trigger;
      done();
    });
  });

  it("Check if in multi mode we can toggle an item", function(done) {
    let selector = px_dropdown.$.content.$.selector,
      divs = Polymer.dom(selector.root).querySelectorAll("div");

    assert.isFalse(
      divs[0].classList.contains("iron-selected"),
      "first item should NOT be selected"
    );
    assert.isTrue(
      divs[1].classList.contains("iron-selected"),
      "second item should be selected"
    );
    assert.isFalse(
      divs[2].classList.contains("iron-selected"),
      "third item should NOT be selected"
    );
    assert.isFalse(
      divs[3].classList.contains("iron-selected"),
      "fourth item should NOT be selected"
    );

    var clickHandle = function() {
      flush(() => {
        assert.isTrue(divs[0].classList.contains("iron-selected"));
        assert.isTrue(px_dropdown.opened);
        done();
      });
    };

    px_dropdown.$.trigger.click();
    divs[0].addEventListener("click", clickHandle);
    divs[0].click();
  });
});

describe("Disabled element tests for px-dropdown", function(done) {
  let px_dropdown;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-disabled-element-fixture");
    flush(() => {
      done();
    });
  });

  it("Selecting a disabled element does not fire a click event", function(done) {
    (px_dropdown_content = px_dropdown.$.content.$.dropdown),
      (px_dropdown_button = px_dropdown.$.trigger.$.trigger),
      (dropdown_option = Polymer.dom(
        px_dropdown.$.content.root
      ).querySelectorAll(".dropdown-option")[1]);

    dropdown_option.disabled = true;
    var item_click = function(e) {
      assert.fail(null, null, "should not be called");
      done();
    };
    px_dropdown_button.click();
    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
    done();
  });
});

describe("Test the different px-dropdown states of disabled, read-only and disabled-viewable", function(done) {
  let px_dropdown;
  let px_dropdown_content;
  let px_dropdown_button;
  let dropdown_option;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-fixture");
    flush(() => {
      px_dropdown_content = px_dropdown.$.content.$.dropdown.querySelector(
        ".dropdown-content"
      );
      px_dropdown_button = px_dropdown.$.trigger.$.trigger;
      dropdown_option = Polymer.dom(
        px_dropdown.$.content.root
      ).querySelectorAll(".dropdown-option")[1];
      done();
    });
  });

  it("When dropdown is set to disabled, read-only and disabled-viewable the dropdown can not be opened as disabled takes priority", function(done) {
    px_dropdown.setAttribute("disabled", "");
    px_dropdown.setAttribute("disabled-visible", "");
    px_dropdown.setAttribute("read-only", "");

    var item_click = function(evt) {
      assert.fail(null, null, "should not be able to open dropdown");
      done();
    };
    px_dropdown.addEventListener("trigger-tapped", item_click);
    px_dropdown_button.click();

    assert.isTrue(
      px_dropdown.hasAttribute("disabled"),
      "expected dropdown-content to have class disabled"
    );
    px_dropdown.removeEventListener("trigger-tapped", item_click);
    done();
  });

  it("When dropdown is set to disabled the dropdown can not be opened", function(done) {
    px_dropdown.setAttribute("disabled", "");
    px_dropdown.removeAttribute("disabled-visible");
    px_dropdown.removeAttribute("read-only");

    var item_click = function(evt) {
      assert.fail(null, null, "should not be able to open dropdown");
      done();
    };
    px_dropdown.addEventListener("trigger-tapped", item_click);
    px_dropdown_button.click();

    assert.isTrue(
      px_dropdown.hasAttribute("disabled"),
      "expected dropdown-content to have class disabled"
    );
    px_dropdown.removeEventListener("trigger-tapped", item_click);
    done();
  });

  it("When dropdown is set to read only the items can not be selected", function(done) {
    px_dropdown.setAttribute("read-only", "");
    px_dropdown.removeAttribute("disabled-visible");
    px_dropdown.removeAttribute("disabled");

    var item_click = function(e) {
      assert.fail(null, null, "should not be able to select read only items");
      done();
    };
    px_dropdown_button.click();

    assert.isTrue(
      px_dropdown.hasAttribute("read-only"),
      "expected dropdown-content to have class read-only"
    );

    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
    done();
  });

  it("When dropdown is set to disabled-viewable the items can viewed but not selected", function(done) {
    px_dropdown.setAttribute("disabled-viewable", "");
    px_dropdown.removeAttribute("disabled");
    px_dropdown.removeAttribute("read-only");

    var item_click = function(evt) {
      assert.fail(null, null, "should not be able to select read only items");
      done();
    };
    px_dropdown_button.click();

    assert.isTrue(
      px_dropdown.hasAttribute("disabled-viewable"),
      "expected dropdown-content to have class disabled-viewable"
    );

    px_dropdown.addEventListener("px-dropdown-selection-changed", item_click);
    dropdown_option.click();
    px_dropdown.removeEventListener(
      "px-dropdown-selection-changed",
      item_click
    );
    done();
  });
});

describe("Custom trigger tests for px-dropdown", function() {
  let px_dropdown;
  let px_dropdown_custom_trigger;

  beforeEach(function(done) {
    px_dropdown = fixture("dropdown-custom-trigger-fixture");
    flush(() => {
      px_dropdown_custom_trigger = Polymer.dom(px_dropdown).querySelector(
        "#custom-trigger"
      );
      done();
    });
  });

  it("Distributes the custom trigger in the `trigger` slot", function() {
    const triggerSize = px_dropdown_custom_trigger.getBoundingClientRect();
    expect(triggerSize.width > 0).to.be.true;
    expect(triggerSize.height > 0).to.be.true;
  });

  it("Opens the dropdown when the user clicks on the custom trigger", function() {
    MockInteractions.tap(px_dropdown_custom_trigger);

    flush(() => {
      expect(px_dropdown.opened).to.be.true;
    });
  });
});
