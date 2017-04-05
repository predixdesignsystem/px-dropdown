var getStyle = function (el, style) {
  return window.getComputedStyle(el, null).getPropertyValue(style);
};
function runCustomTests() {

  suite('Custom Automation Tests for px-dropdown', function () {
    var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
      px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
      px_dropcell = px_dropdown_content.$$('#dropcell');

    test('checks if dropdown opens on container click',
      function (done) {
        var dropcell = document.querySelector('#dropcell'),
          clickHandle = function () {
            assert.isTrue(document.querySelector('#dropdown').style.display !== 'none');
            done();
          };
        dropcell.addEventListener('click', clickHandle);
        dropcell.click();
        dropcell.removeEventListener('click', clickHandle);
      }
    );

    test('checks if extendDropdown is true, and if so, checks the width, else, check width of dropdown ',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropcell = px_dropdown.$$('#dropcell'),
          dropcellWidth = dropcell.offsetWidth,
          dropdown = px_dropdown_content.$$('#dropdown'),
          dropdownWidth = dropdown.offsetWidth;

        var clickHandle = function () {
          if (px_dropdown_content.extendDropdown) {
            var extendWidth = px_dropdown_content.extendDropdownBy,
              extendDropdownBy = px_dropdown_content.extendDropdownBy,
              calculated_dropdown = dropcellWidth + extendDropdownBy;
            assert.isTrue(calculated_dropdown === dropdownWidth);
          } else {
            assert.isTrue(dropcellWidth === dropdownWidth);
          }
          done();
        };

        dropcell.addEventListener('click', clickHandle);
        dropcell.click();
        dropcell.removeEventListener('click', clickHandle);
      }
    );

    test('checks if dropdown closes on container click after open',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropcell = px_dropdown.$$('#dropcell'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          clickHandle = function () {
            assert.isTrue(dropdown.hidden);
            done();
          };
        dropcell.click();
        dropcell.addEventListener('click', clickHandle);
        dropcell.click();
        dropcell.removeEventListener('click', clickHandle);
      }
    );

    test('check if max-cont-character-width has a value, and if so, is there a px-tooltip?',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropcell = px_dropdown.$$('#dropcell'),
          dropdown = px_dropdown_content.$$('#dropdown');

        dropcell.addEventListener('click', function () {
          var elemList = Polymer.dom(px_dropdown_content.root).querySelectorAll('.px-dropdown--listitem');
          Array.prototype.forEach.call(elemList, function (li) {
            var maxChar = px_dropdown_content.maxContCharacterWidth;
            if (maxChar && li.textContent.trim().length > maxChar) {
              var pxTooltip = Polymer.dom(li).querySelector('px-tooltip');
              expect(pxTooltip).to.not.be.null;
            }
          });
          done();
        });
        dropcell.click();
      }
    );

    test('check that element fires off click event',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropcell = px_dropdown.$$('#dropcell'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          dropdown_li = Polymer.dom(dropdown).querySelector('li');

        var li_click = function (e) {
          var target = e.detail.target || e.detail.srcElement;
          assert.equal(target, dropdown_li);
          done();
        };
        px_dropdown.addEventListener('px-dropdown-click', li_click);
        dropdown_li.click();
        px_dropdown.removeEventListener('px-dropdown-click', li_click);
      });

    test('selecting an element changes displayValue and selectedKey',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropcell = px_dropdown.$$('#dropcell'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          dropdown_li = Polymer.dom(dropdown).querySelectorAll('li')[2];

        var li_click = function (e) {
          assert.equal(e.detail.val, 'Three');
          assert.equal(e.detail.key, 'three');
          assert.equal(px_dropdown.displayValue, 'Three');
          assert.equal(px_dropdown.selectedKey, 'three');
          done();
        };
        px_dropdown.addEventListener('px-dropdown-value-changed', li_click);
        dropdown_li.click();
        px_dropdown.removeEventListener('px-dropdown-value-changed', li_click);
      });

    test('selecting a disabled element does not fire a click event',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropcell = px_dropdown.$$('#dropcell'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          dropdown_li = Polymer.dom(dropdown).querySelectorAll('li')[4];

        var li_click = function (e) {
          assert.fail(null, null, 'should not be called');
          done();
        };
        px_dropdown.addEventListener('px-dropdown-value-changed', li_click);
        var spy = sinon.spy(px_dropdown_content, 'fire');
        dropdown_li.click();
        px_dropdown.removeEventListener('px-dropdown-value-changed', li_click);
        assert(spy.neverCalledWith('px-dropdown-click'));
        done();
      });


    test('compare passed items to what\'s on the dropdown itself',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropcell = px_dropdown.$$('#dropcell'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          items = Polymer.dom(document).querySelector('px-dropdown-content').items,
          LIs = dropdown.querySelectorAll('li');

        Array.prototype.forEach.call(LIs, function (li, index) {
          if (li.firstChild.textContent.trim() === items[index].val) {
            assert.equal(li.firstChild.textContent.trim(), items[index].val);
          }
        });
        done();
      });
    test('checks if Hide Chevron actaully hides the chevron',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_2'),
          chevron = px_dropdown.$$('px-dropdown-chevron');
        expect(chevron).to.be.null;
        done();
      }
    );
    test('check if dropdown closes on outside click',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_3'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          dropcell = px_dropdown.$$('#dropcell'),
          title = Polymer.dom(document).querySelector('#title');

        clickHandle = function () {
          assert.isTrue(dropdown.hidden);
          done();
        };

        //open dropdown
        dropcell.click();
        title.addEventListener('click', clickHandle);
        title.click();
        title.removeEventListener('click', clickHandle);
      }
    );
    test('check if dropdown does not close on outside click when preventCloseOnOutsideClick is set',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_3'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          dropcell = px_dropdown.$$('#dropcell'),
          title = Polymer.dom(document).querySelector('#title');

        px_dropdown.preventCloseOnOutsideClick = true;

        clickHandle = function () {
          assert.isFalse(dropdown.hidden);
          done();
        };

        //open dropdown
        dropcell.click();
        title.addEventListener('click', clickHandle);
        title.click();
        title.removeEventListener('click', clickHandle);
      }
    );
    test('check if checkbox mode enables checkboxes',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_check'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('#px_dropdown_content_check'),
          checkboxes = px_dropdown_content.$.dropdown.querySelectorAll('input');

        //we should have some checkboxes
        assert.isTrue(checkboxes.length > 0);
        done();
      }
    );
    test('check if checkbox for disabled item is disabled',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_check'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('#px_dropdown_content_check'),
          checkboxes = px_dropdown_content.$.dropdown.querySelectorAll('input');

        //some checkboxes are disabled, others are not
        assert.isFalse(checkboxes[9].disabled);
        assert.isTrue(checkboxes[10].disabled);
        done();
      }
    );
    test('check if in checkbox mode we can toggle check state',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_check'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('#px_dropdown_content_check'),
          dropcell = px_dropdown.$$('#dropcell'),
          items = px_dropdown_content.$.dropdown.querySelectorAll('li'),
          checkbox1 = items[value = 0].querySelector('input'),
          checkbox2 = items[value = 1].querySelector('input');

        //first item should be checked
        assert.isTrue(checkbox1.checked);
        //second item unchecked
        assert.isFalse(checkbox2.checked);

        clickHandle = function () {
          //first element must now be unchecked, second still unchecked
          assert.isFalse(checkbox1.checked);
          assert.isFalse(checkbox2.checked);

          //dropdown must still be opened
          assert.isTrue(px_dropdown_content.menuOpen);

          done();
        };

        //open dropdown
        dropcell.click();

        //try clicking first element...
        checkbox1.addEventListener('click', clickHandle);
        checkbox1.click();
        checkbox1.removeEventListener('click', clickHandle);
      }
    );
    test('Check that search box appears when in search mode',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_4'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('.px-dropdown-content'),
          items = px_dropdown_content.$.dropdown.querySelectorAll('li'),
          input = items[0].children[0];
        assert.isTrue(input.classList.contains('input--search'));
        done();
      }
    );
    test('Sort mode: items can be sorted by values or keys',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_4'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('.px-dropdown-content'),
          items = px_dropdown_content.$.dropdown.querySelectorAll('li');
        px_dropdown_content.sortMode = 'val';
        items = px_dropdown_content.$.dropdown.querySelectorAll('li');
        assert.equal(items[1].textContent.trim(), 'eight');
        px_dropdown_content.sortMode = 'key';
        items = px_dropdown_content.$.dropdown.querySelectorAll('li');
        assert.equal(items[1].textContent.trim(), 'One');
        done();
      }
    );


    test('Keyboard space: px-dropdown should open upon pressing space',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropdown_content_div = px_dropdown.querySelector('#dropdown');
        assert.isTrue(px_dropdown_content_div.hasAttribute('hidden'));
        MockInteractions.pressSpace(px_dropdown);
        assert.isFalse(px_dropdown_content_div.hasAttribute('hidden'));
        done();
      });

    test('Keyboard down: px-dropdown item should get focus on pressing down arrow',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropcell = px_dropdown.$$('#dropcell'),
          px_dropdown_content_div = px_dropdown.querySelector('#dropdown');

        //Make sure dropdown is open before running the tests.
        if (px_dropdown_content_div.hasAttribute('hidden')) {
          MockInteractions.pressSpace(px_dropdown);
        }

        MockInteractions.pressAndReleaseKeyOn(px_dropcell, 40);

        var firstItem = px_dropdown_content_div.querySelector('li.px-dropdown--listitem');
        assert.isTrue(firstItem.classList.contains('highlighted'));

        done();
      });

    test('Keyboard enter: px-dropdown item should be selected on pressing enter',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropcell = px_dropdown.$$('#dropcell'),
          px_dropdown_content_div = px_dropdown.querySelector('#dropdown'),
          firstItem = px_dropdown_content_div.querySelector('li.px-dropdown--listitem');

        //Make sure dropdown is open before running the tests.
        if (px_dropdown_content_div.hasAttribute('hidden')) {
          MockInteractions.pressSpace(px_dropdown);
        }

        //Make sure first item is highlighted
        if (!firstItem.classList.contains('highlighted')) {
          MockInteractions.pressAndReleaseKeyOn(px_dropcell, 40);
          assert.isTrue(firstItem.classList.contains('highlighted'));
        }

        var li_click = function (e) {
          assert.equal(e.detail.val, 'One');
          assert.equal(e.detail.key, 'one');
          assert.equal(px_dropdown.displayValue, 'One');
          assert.equal(px_dropdown.selectedKey, 'one');
          done();
        };

        px_dropdown.addEventListener('px-dropdown-value-changed', li_click);

        MockInteractions.pressEnter(firstItem);
      });

    test('Keyboard esc: px-dropdown should close',
      function (done) {
        var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
          px_dropcell = px_dropdown.$$('#dropcell'),
          px_dropdown_content_div = px_dropdown.querySelector('#dropdown');

        //Make sure dropdown is open before running the tests.
        if (px_dropdown_content_div.hasAttribute('hidden')) {
          MockInteractions.pressSpace(px_dropdown);
        }

        MockInteractions.pressAndReleaseKeyOn(px_dropcell, 27);

        var firstItem = px_dropdown_content_div.querySelector('li.px-dropdown--listitem');
        assert.isTrue(px_dropdown_content_div.hasAttribute('hidden'));
        done();
      });


  });


}
