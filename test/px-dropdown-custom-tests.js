describe('Custom Automation Tests for px-dropdown', function (done) {
  let px_dropdown;
  let px_dropdown_content;
  let px_dropdown_button;

  beforeEach(function(done){
    px_dropdown = fixture('dropdown-fixture');
    flush(()=>{
      px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown');
      px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button');
      done();
    });
  });

  it('Keyboard space: px-dropdown should open upon pressing space',
    function (done) {
      let px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown');
      assert.isTrue(px_dropdown_content.hasAttribute('aria-hidden'));
      MockInteractions.pressSpace(px_dropdown);
      assert.isFalse(px_dropdown_content.hasAttribute('aria-hidden'));
      done();
    }
  );

  it('Keyboard down: px-dropdown item should get focus on pressing down arrow',
    function (done) {
      let px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
          px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
          firstItem = px_dropdown_content.querySelector('.dropdown-option');

      //Make sure dropdown is open before running the tests.
      if (px_dropdown_content.hasAttribute('aria-hidden')) {
        MockInteractions.pressSpace(px_dropdown);
      }

      MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 40);

      assert.isTrue(firstItem.classList.contains('focused'));

      done();
    }
  );

  it('Keyboard enter: px-dropdown item should be selected on pressing enter',
    function (done) {
      let px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
          px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
          firstItem = px_dropdown_content.querySelector('.dropdown-option');

      px_dropdown.selected = null;

      //Make sure dropdown is open before running the tests.
      if (px_dropdown_content.hasAttribute('aria-hidden')) {
        MockInteractions.pressSpace(px_dropdown);
      }


      if (!firstItem.classList.contains('focused')) {
        MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 40);
        flush(()=>{
          assert.isTrue(firstItem.classList.contains('focused'));
        });
      }
      //Make sure first item is highlighted

      var item_click = function (e) {
        flush(()=>{
          assert.equal(e.detail.val, 'One');
          assert.equal(e.detail.key, '1');
          assert.equal(px_dropdown.selected, '1');
          done();
        });
      };

      px_dropdown.addEventListener('px-dropdown-selection-changed', item_click);

      MockInteractions.pressEnter(firstItem);
    }
  );

  it('Checks if dropdown opens on container click',
    function (done) {
      var clickHandle = function () {
          setTimeout(function() {
            assert.isTrue(px_dropdown_content.style.display !== 'none');
            done();
          }.bind(this),50);
        }.bind(this);
      var px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button');
      px_dropdown_button.addEventListener('click', clickHandle);
      px_dropdown_button.click();
      px_dropdown_button.removeEventListener('click', clickHandle);
    }
  );

  it('Selecting an element changes selected property',
    function (done) {
      let dropdown_option = Polymer.dom(px_dropdown.root).querySelectorAll('.dropdown-option')[2];
      var item_click = function (e) {
        flush(function(){
          assert.equal(e.detail.val, 'Three');
          assert.equal(e.detail.key, '3');
          assert.equal(px_dropdown.selected, '3');
          done();
        });
      };
      px_dropdown.addEventListener('px-dropdown-selection-changed', item_click);
      dropdown_option.click();
      px_dropdown.removeEventListener('px-dropdown-selection-changed', item_click);
    }
  );

  it('Compare passed items to what is on the dropdown itself',
    function (done) {
      let px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
          selector = Polymer.dom(px_dropdown.root).querySelector('#selector'),
          divs = Polymer.dom(selector.root).querySelectorAll('div'),
          items = px_dropdown.items;

      Array.prototype.forEach.call(divs, function (div, index) {
        assert.equal(div.textContent.trim(), items[index].val);
      });
      done();
    }
  );

  it('checks if Hide Chevron actually hides the chevron',
    function (done) {
      px_dropdown.hideChevron = true;
      let chevron = Polymer.dom(px_dropdown.root).querySelector('iron-icon');
      expect(chevron).to.be.null;
      done();
    }
  );

  it('check if dropdown closes on outside click',
    function (done) {
      px_dropdown_button.click();
      flush(()=>{
        assert.isTrue(px_dropdown.opened);
        async.whilst(
          function() {
            return px_dropdown.opened;
          },
          function(callback) {
            px_dropdown.parentElement.click();
            setTimeout(callback, 1000);
          },
          function (err, n) {
            assert.isFalse(px_dropdown.opened);
            done();
          }
        )
      });
    }
  );

  it('check if dropdown does not close on outside click when preventCloseOnOutsideClick is set',
    function (done) {
      let title = Polymer.dom(document).querySelector('#title');

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
});

describe('Custom Automation Tests for search feature px-dropdown', function (done) {

  beforeEach(function(done){
    px_dropdown = fixture('dropdown-search-fixture');
    flush(()=>{
      px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown');
      px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button');
      done();
    });
  });

  it('Check that search box appears when in search mode',
    function (done) {
      flush(()=>{
        let input = Polymer.dom(px_dropdown.root).querySelector('#searchbox');
        assert.isTrue(input.classList.contains('text-input'));
        done();
      });
    }
  );

});

describe('Custom Automation Tests for sort feature px-dropdown', function (done) {

  beforeEach(function(done){
    px_dropdown = fixture('dropdown-sort-fixture');
    flush(()=>{
      px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown');
      px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button');
      done();
    });
  });

  it('Sort mode: items can be sorted by values or keys',
    function (done) {
      let px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('.px-dropdown-content'),
          selector = Polymer.dom(px_dropdown.root).querySelector('#selector'),
          divs = Polymer.dom(selector.root).querySelectorAll('div');

      assert.equal(divs[0].textContent.trim(), 'Four');
      px_dropdown.sortMode = 'key';
      divs = Polymer.dom(selector.root).querySelectorAll('div');
      assert.equal(divs[0].textContent.trim(), 'One');
      done();
    }
  );

  it('Sort mode: items can be sorted by values or keys',
    function (done) {
      let px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('.px-dropdown-content'),
          selector = Polymer.dom(px_dropdown.root).querySelector('#selector'),
          divs = Polymer.dom(selector.root).querySelectorAll('div');

      assert.equal(divs[0].textContent.trim(), 'Four');
      px_dropdown.sortMode = 'key';
      divs = Polymer.dom(selector.root).querySelectorAll('div');
      assert.equal(divs[0].textContent.trim(), 'One');
      done();
    }
  );

});


  //
  //
  //

  //

  //

  //

describe('Custom Automation Tests for px-dropdown', function (done) {
  let px_dropdown;
  let px_dropdown_content;
  let px_dropdown_button;

  beforeEach(function(done){
    px_dropdown = fixture('dropdown-fixture');
    flush(()=>{
      px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown');
      px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button');
      done();
    });
  });

  it('Keyboard esc: px-dropdown should close',
    function () {
      let firstItem = px_dropdown_content.querySelector('.dropdown-option');

      //Make sure dropdown is open before running the tests.
      if (px_dropdown_content.hasAttribute('aria-hidden')) {
        MockInteractions.pressSpace(px_dropdown);
      }

      MockInteractions.pressAndReleaseKeyOn(px_dropdown_button, 27);

      assert.isTrue(px_dropdown_content.hasAttribute('aria-hidden'));
    }
  );
});

describe('Multi select tests for px-dropdown', function (done) {
  let px_dropdown;

  beforeEach(function(done){
    px_dropdown = fixture('dropdown-multi-element-fixture');
    flush(()=>{
      px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button');
      done();
    });
  });

  it('Check if in multi mode we can toggle an item',
    function (done) {
      let selector = Polymer.dom(px_dropdown.root).querySelector('#selector'),
      divs = Polymer.dom(selector.root).querySelectorAll('div');

      assert.isFalse(divs[0].classList.contains('iron-selected'));
      assert.isTrue(divs[1].classList.contains('iron-selected'));
      assert.isFalse(divs[2].classList.contains('iron-selected'));
      assert.isFalse(divs[3].classList.contains('iron-selected'));

      var clickHandle = function () {
        flush(()=>{
          assert.isTrue(divs[0].classList.contains('iron-selected'));
          assert.isTrue(px_dropdown.opened);
          done();
        });
      };
      px_dropdown_button.click();
      divs[0].addEventListener('click', clickHandle);
      divs[0].click();
    }
  );
});

describe('Disabled element tests for px-dropdown', function (done) {
  let px_dropdown;

  beforeEach(function(done){
    px_dropdown = fixture('dropdown-disabled-element-fixture');
    flush(()=>{
      done();
    });
  });

  it('Selecting a disabled element does not fire a click event',
    function (done) {
      px_dropdown_content = Polymer.dom(px_dropdown.root).querySelector('#dropdown'),
      px_dropdown_button = Polymer.dom(px_dropdown.root).querySelector('#button'),
      dropdown_option = Polymer.dom(px_dropdown.root).querySelectorAll('.dropdown-option')[1];

      dropdown_option.disabled = true;
      var item_click = function (e) {
        assert.fail(null, null, 'should not be called');
        done();
      };
      px_dropdown_button.click();
      px_dropdown.addEventListener('px-dropdown-selection-changed', item_click);
      dropdown_option.click();
      px_dropdown.removeEventListener('px-dropdown-selection-changed', item_click);
      done();
    }
  );
});
