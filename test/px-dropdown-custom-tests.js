var getStyle = function (el, style) {
  return window.getComputedStyle(el, null).getPropertyValue(style);
};
function runCustomTests() {

  suite('Custom Automation Tests for px-dropdown', function () {
    var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_1'),
        px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
        px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button');

    test('Checks if dropdown opens on container click',
      function (done) {
        var clickHandle = function () {
            setTimeout(function() {
              assert.isTrue(document.querySelector('#dropdown').style.display !== 'none');
              done();
            },50);
          };
        px_dropdown_button.addEventListener('click', clickHandle);
        px_dropdown_button.click();
        px_dropdown_button.removeEventListener('click', clickHandle);
      }
    );

    test('Selecting an element changes selected property',
      function (done) {
        var dropdown_option = Polymer.dom(px_dropdown.root).querySelectorAll('.dropdown-option')[2];

        var item_click = function (e) {
          assert.equal(e.detail.val, 'Three');
          assert.equal(e.detail.key, '3');
          assert.equal(px_dropdown.selected, '3');
          done();
        };
        px_dropdown.addEventListener('px-dropdown-selection-changed', item_click);
        dropdown_option.click();
        px_dropdown.removeEventListener('px-dropdown-selection-changed', item_click);
      });

    test('Selecting a disabled element does not fire a click event',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_6'),
            px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
            px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
            dropdown_option = Polymer.dom(px_dropdown.root).querySelectorAll('.dropdown-option')[1];

        var item_click = function (e) {
          assert.fail(null, null, 'should not be called');
          done();
        };
        px_dropdown_button.click();
        px_dropdown.addEventListener('px-dropdown-selection-changed', item_click);
        dropdown_option.click();
        px_dropdown.removeEventListener('px-dropdown-selection-changed', item_click);
        done();
      });

    test('Compare passed items to what is on the dropdown itself',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_2'),
            px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
            selector = Polymer.dom(px_dropdown.root).querySelector('#selector'),
            divs = Polymer.dom(selector.root).querySelectorAll('div'),
            items = px_dropdown.items;

        Array.prototype.forEach.call(divs, function (div, index) {
          assert.equal(div.textContent.trim(), items[index].val);
        });
        done();
      });

    test('checks if Hide Chevron actaully hides the chevron',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_5'),
            chevron = Polymer.dom(px_dropdown.root).querySelector('iron-icon');
        expect(chevron).to.be.null;
        done();
      }
    );

    test('check if dropdown closes on outside click',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_3'),
            px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
            px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
            title = Polymer.dom(document).querySelector('#title'),
            clickHandle = function () {
              setTimeout(function() {
                assert.isFalse(px_dropdown.opened);
              },50);
              done();
            };

        px_dropdown_button.click();
        title.addEventListener('click', clickHandle);
        title.click();
        title.removeEventListener('click', clickHandle);
      }
    );

    test('check if dropdown does not close on outside click when preventCloseOnOutsideClick is set',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_2'),
            px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
            px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
            title = Polymer.dom(document).querySelector('#title');

        px_dropdown.preventCloseOnOutsideClick = true;

        clickHandle = function () {
          setTimeout(function() {
            assert.isTrue(px_dropdown.opened);
          },50);
          done();
        };

        //open dropdown
        px_dropdown_button.click();
        title.addEventListener('click', clickHandle);
        title.click();
        title.removeEventListener('click', clickHandle);
      }
    );

    test('Check if in multi mode we can toggle an item',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_7'),
            px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
            px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
            selector = Polymer.dom(px_dropdown.root).querySelector('#selector'),
            divs = Polymer.dom(selector.root).querySelectorAll('div');

        assert.isFalse(divs[0].classList.contains('iron-selected'));
        assert.isTrue(divs[1].classList.contains('iron-selected'));
        assert.isFalse(divs[2].classList.contains('iron-selected'));
        assert.isTrue(divs[3].classList.contains('iron-selected'));

        var clickHandle = function () {
          setTimeout(function() {
            assert.isTrue(divs[0].classList.contains('iron-selected'));
            assert.isTrue(px_dropdown.opened);
          },50);
          done();
        };

        px_dropdown_button.click();

        divs[0].addEventListener('click', clickHandle);
        divs[0].click();
        divs[0].removeEventListener('click', clickHandle);
      }
    );

    test('Check that search box appears when in search mode',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_9'),
          px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('.dropdown-content'),
          input = px_dropdown_content.children[0];
        assert.isTrue(input.classList.contains('input--search'));
        done();
      }
    );

    test('Sort mode: items can be sorted by values or keys',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_11'),
            px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('.px-dropdown-content'),
            selector = Polymer.dom(px_dropdown.root).querySelector('#selector'),
            divs = Polymer.dom(selector.root).querySelectorAll('div');

        assert.equal(divs[0].textContent.trim(), 'Four');
        px_dropdown.sortMode = 'key';
        divs = Polymer.dom(selector.root).querySelectorAll('div');
        assert.equal(divs[0].textContent.trim(), 'One');
        done();
      }
    );

    test('Keyboard space: px-dropdown should open upon pressing space',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_1'),
            px_dropdown_content = px_dropdown.querySelector('#dropdown');
        assert.isTrue(px_dropdown_content.hasAttribute('aria-hidden'));
        MockInteractions.pressSpace(px_dropdown);
        assert.isFalse(px_dropdown_content.hasAttribute('aria-hidden'));
        done();
      });

    test('Keyboard down: px-dropdown item should get focus on pressing down arrow',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_1'),
          px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
          px_dropdown_content = px_dropdown.querySelector('#dropdown'),
          firstItem = px_dropdown_content.querySelector('.dropdown-option');

        //Make sure dropdown is open before running the tests.
        if (px_dropdown_content.hasAttribute('aria-hidden')) {
          MockInteractions.pressSpace(px_dropdown);
        }

        MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 40);

        assert.isTrue(firstItem.classList.contains('highlighted'));

        done();
      });

    test('Keyboard enter: px-dropdown item should be selected on pressing enter',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_1'),
            px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
            px_dropdown_content = px_dropdown.querySelector('#dropdown'),
            firstItem = px_dropdown_content.querySelector('.dropdown-option');

        px_dropdown.selected = null;

        //Make sure dropdown is open before running the tests.
        if (px_dropdown_content.hasAttribute('aria-hidden')) {
          MockInteractions.pressSpace(px_dropdown);
        }

        //Make sure first item is highlighted
        if (!firstItem.classList.contains('highlighted')) {
          MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 40);
          assert.isTrue(firstItem.classList.contains('highlighted'));
        }

        var item_click = function (e) {
          assert.equal(e.detail.val, 'One');
          assert.equal(e.detail.key, '1');
          assert.equal(px_dropdown.selected, '1');
          done();
        };

        px_dropdown.addEventListener('px-dropdown-selection-changed', item_click);

        MockInteractions.pressEnter(firstItem);
      });

    test('Keyboard esc: px-dropdown should close',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_1'),
            px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
            px_dropdown_content = px_dropdown.querySelector('#dropdown'),
            firstItem = px_dropdown_content.querySelector('.dropdown-option');

        //Make sure dropdown is open before running the tests.
        if (px_dropdown_content.hasAttribute('aria-hidden')) {
          MockInteractions.pressSpace(px_dropdown);
        }

        MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 27);

        assert.isTrue(px_dropdown_content.hasAttribute('aria-hidden'));
        done();
      });

  });
}
