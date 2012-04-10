/* 
 * Change Font size base in a DOM element
 * Using jQuery
 */
 
(function($) {

	$.fn.fontResizer = function( options ) {
			
		var opts = $.extend( {}, $.fn.fontResizer.defaults, options);
		
		return this.each(function() {

			var $this = $(this);
			var o = $.metadata ? $.extend({}, opts, $this.metadata()) : opts;
			
			// if jQuery Cookie is available, store user's preferences
			if ( typeof( $.cookie ) != 'undefined' )  { 
				//console.log( typeof( $.cookie ));
				var $cookie_name = "fontResizer_cookie";
				var originalFontSize = $this.css("font-size");
				
				// if exists load saved value, otherwise store it
				if( $.cookie( $cookie_name ) ) {
					var $getSize = $.cookie( $cookie_name );
					$this.css({fontSize : $getSize + ($getSize.indexOf("px")!=-1 ? "" : "px")}); // IE fix for double "pxpx" error
				} else {
					$.cookie($cookie_name, originalFontSize);
				}
				
			}
			
			// LAUNCH ACTIONS
			var increaseLink = $(  o.increaseLinkSelector.toString() );
			var decreaseLink = $(  o.decreaseLinkSelector.toString() );

			increaseLink.live( 'click', function( e ) {
				e.preventDefault();
				e.stopPropagation();
				
				var currentFontSize = $this.css("font-size");
				var currentFontSizeNum = parseFloat(currentFontSize, 10);
				var newFontSize = currentFontSizeNum + 2;
				if (newFontSize < 17) {
					$this.css({fontSize : newFontSize});
					if ( typeof( $.cookie ) != 'undefined' )  {  $.cookie($cookie_name, newFontSize); }
				}
				return false;			
			});

			decreaseLink.live( 'click', function( e ) {
				e.preventDefault();
				e.stopPropagation();

				var currentFontSize = $this.css("font-size");
				var currentFontSizeNum = parseFloat(currentFontSize, 10);
				var newFontSize = currentFontSizeNum - 2;
				if (newFontSize > 9) {
					$this.css({fontSize : newFontSize});
					if ( typeof( $.cookie ) != 'undefined' )  {  $.cookie($cookie_name, newFontSize); }
				}
				return false;			
			});


		});
	
	}
	
})(jQuery);

// Default Values
$.fn.fontResizer.defaults = {
	increaseLinkSelector: '.fontPlus', 
	decreaseLinkSelector: '.fontMinus'
};

