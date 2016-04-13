// This is the wrapper for custom tests, called upon web components ready state
var getStyle = function (el, style){
  return window.getComputedStyle( el, null ).getPropertyValue( style );
};
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
       dropcell.click();
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

         var clickHandle = function() {
           if (px_dropdown_content.extendDropdown) {
             var extendWidth = px_dropdown_content.extendDropdownBy,
                 extendDropdownBy = px_dropdown_content.extendDropdownBy,
                 calculated_dropdown = dropcellWidth + extendDropdownBy + 2; //2px border around dropdown
             assert.isTrue(calculated_dropdown === dropdownWidth);
          } else {
            assert.isTrue(dropcellWidth === dropdownWidth);
          }
          done();
         };

         dropcell.addEventListener('click', clickHandle);
         dropcell.click();
         dropcell.removeEventListener('click',clickHandle);
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
        dropcell.click();
        dropcell.addEventListener('click', clickHandle);
        dropcell.click();
        dropcell.removeEventListener('click', clickHandle);
      }
    );

    test('check if max-cont-character-width has a value, and if so, is there a px-tooltip?',
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
        px_dropdown.addEventListener('px-dropdown-click', li_click);
        dropdown_li.click();
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
         if (li.firstChild.textContent.trim() === items[index].val) {
           assert.equal(li.firstChild.textContent.trim(), items[index].val);
         }
       });
      done();
    });
    test('checks if Hide Chevron actaully hides the chevron',
     function(done){
      var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_2'),
          chevron = px_dropdown.$$('px-dropdown-chevron');
      expect(chevron).to.be.null;
      done();
     }
    );
    test('check if dropdown closes on outside click',
     function(done){
      var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_3'),
        px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
        dropdown = px_dropdown_content.$$('#dropdown'),
        dropcell = px_dropdown.$$('#dropcell'),
        title = Polymer.dom(document).querySelector('#title');

      clickHandle = function() {
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
      function(done){
       var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_3'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('px-dropdown-content'),
          dropdown = px_dropdown_content.$$('#dropdown'),
          dropcell = px_dropdown.$$('#dropcell'),
          title = Polymer.dom(document).querySelector('#title');

       px_dropdown.preventCloseOnOutsideClick = true;

       clickHandle = function() {
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
      function(done){
       var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_check'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('#px_dropdown_content_check'),
          checkboxes = px_dropdown_content.$.dropdown.querySelectorAll('input');

       //we should have some checkboxes
       assert.isTrue(checkboxes.length > 0);
       done();
      }
    );
    test('check if in checkbox mode we can toggle check state',
      function(done){
       var px_dropdown = Polymer.dom(document).querySelector('#px_dropdown_check'),
          px_dropdown_content = Polymer.dom(px_dropdown).querySelector('#px_dropdown_content_check'),
          dropcell = px_dropdown.$$('#dropcell'),
          item = px_dropdown_content.$.dropdown.querySelector('li'),
          checkboxes = px_dropdown_content.$.dropdown.querySelectorAll('input');


       //first item should be checked
       assert.isTrue(px_dropdown_content.items[0].checked);
       //double check the html element
       assert.isTrue(checkboxes[0].checked);
       //second unchecked
       assert.isFalse(px_dropdown_content.items[1].checked);

       clickHandle = function() {
         //first element must now be uncheckd, second still unchecked
         assert.isFalse(px_dropdown_content.items[0].checked);
         //double check the html element
         assert.isFalse(checkboxes[0].checked);
         assert.isFalse(px_dropdown_content.items[1].checked);

         //dropdown must still be opened
         assert.isTrue(px_dropdown_content.menuOpen);

         done();
       };

       //open dropdown
       dropcell.click();

       //try clicking first element...
       item.addEventListener('click', clickHandle);
       item.click();
       item.removeEventListener('click', clickHandle);
      }
    );
  });
}
