// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-dropdown', function() {
    var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
        px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
        px_dropcell = px_dropdown_content.$$('#dropcell');

    // testCase({
    //   'description': 'checks if dropdown opens on container click',
    //   'eventChain': [
    //     {
    //       'root': px_dropcell,
    //       'eventString': 'click'
    //     }
    //   ],
    //   'assertFunction': function() {
    //     var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
    //        px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
    //        dropdown = px_dropdown_content.$$('#dropdown');
    //       return dropdown.hidden;
    //   }
    // });
    //test if dropdown opens and closes on clicks
    test('checks if dropdown opens on container click',
     function(done){
       var dropcell = document.querySelector('#dropcell'),
       clickHandle = function() {
         assert.isTrue(document.querySelector('#dropdown').style.display !== 'none');
         done();
       };
       dropcell.addEventListener('click', clickHandle);
       dropcell.dispatchEvent(new Event('click'));
       dropcell.removeEventListener('click',clickHandle);
     }
   );
   test('checks if extendDropdown is true, and if so, checks the width, else, check width of dropdown ',
    function(done){
      var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
         px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
         dropcell = px_dropdown.$$('#dropcell'),
         dropcellWidth = dropcell.offsetWidth,
         dropdown = px_dropdown_content.$$('#dropdown'),
         dropdownWidth = dropdown.offsetWidth;

         dropcell.dispatchEvent(new Event('click'));

         if (px_dropdown_content.extendDropdown) {
           var extendWidth = px_dropdown_content.extendDropdownBy,
               extendDropdownBy = px_dropdown_content.extendDropdownBy,
               calculated_dropdown = dropcellWidth + extendDropdownBy + 2; //2px border around dropdown
           assert.isTrue(calculated_dropdown === dropdownWidth);
        } else {
          assert.isTrue(dropcellWidth === dropdownWidth);
        }
        done();
    }
  );
   test('checks if dropdown closes on container click after open',
    function(done){
      var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
         px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
         dropcell = px_dropdown.$$('#dropcell'),
         dropdown = px_dropdown_content.$$('#dropdown'),
         clickHandle = function() {
             assert.isTrue(dropdown.hidden);
             done();
         };
      dropcell.dispatchEvent(new Event('click'));
      dropcell.addEventListener('click', clickHandle);
      dropcell.dispatchEvent(new Event('click'));
      dropcell.removeEventListener('click', clickHandle);
    }
  );

  test('check if max-cont-character-width has a value, if so so, is there an ellipsis, and px-tooltip',
   function(done){
     var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
        px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
        dropcell = px_dropdown.$$('#dropcell'),
        dropdown = px_dropdown_content.$$('#dropdown');

     dropcell.addEventListener('click', function() {
       var elemList = Polymer.dom(px_dropdown_content.root).querySelectorAll('.px-dropdown--listitem');
       Array.prototype.forEach.call(elemList, function(li) {
         var maxChar = px_dropdown_content.maxContCharacterWidth;
         if (maxChar && li.textContent.trim().length > maxChar) {
           var pxTooltip = Polymer.dom(px_dropdown_content).querySelector('px-tooltip');
           assert.isTrue(pxTooltip !== null);
           done();
         }
       });
     });
     dropcell.dispatchEvent(new Event('click'));
   }
 );

 test('check that element fires off click event',
  function(done) {
    var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
       px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
       dropcell = px_dropdown.$$('#dropcell'),
       dropdown = px_dropdown_content.$$('#dropdown'),
       dropdown_li = Polymer.dom(dropdown).querySelector('li');

    var li_click = function(e) {
      //assert.equal(e.detail.srcElement, dropdown_li);
      done();
    };

    //dropcell.dispatchEvent(new Event('click'));
    px_dropdown.addEventListener('px-dropdown-click', li_click);
    dropdown_li.dispatchEvent(new Event('click'));
    px_dropdown.removeEventListener('px-dropdown-click', li_click);
  });

test('compare passed items to what\'s on the dropdown itself',
function(done) {
  var px_dropdown = Polymer.dom(document).querySelector('px-dropdown'),
     px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
     dropcell = px_dropdown.$$('#dropcell'),
     dropdown = px_dropdown_content.$$('#dropdown'),
     items = Polymer.dom(document).querySelector('px-dropdown-content').items,
     LIs = dropdown.querySelectorAll('li');

     Array.prototype.forEach.call(LIs,function(li, index) {
       assert.equal(li.firstChild.textContent.trim(), items[index].val);
       done();
     });

});
  });
}
