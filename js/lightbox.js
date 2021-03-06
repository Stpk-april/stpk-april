﻿/**
 * Lightbox v2.7.1
 * by Lokesh Dhakar - http://lokeshdhakar.com/projects/lightbox2/
 *
 * @license http://creativecommons.org/licenses/by/2.5/
 * - Free for use in both personal and commercial projects
 * - Attribution requires leaving author name, author link, and the license info intact



*changed history - (stpk-april.bitbucket.org) 
 
to show charactor in caption
 
 	if(!('charac' in window)) return "Image " + curImageNum + " of " + albumSize;
	else return "Charactor " + curImageNum + " of " + albumSize;

 
 to insert iframe
 $("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a><iframe class='lb-iframe' style='position:absolute; left:0px; padding:4px;' src='' frameborder='0' allowfullscreen></iframe></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo($('body'));

 if(self.album[imageNumber].link.indexOf('dummy')!=-1){
		$('.lb-iframe').show();
		$('.lb-iframe').attr('src', self.album[imageNumber].iframe);
		$('.lb-iframe').attr('width', '100%');
		$('.lb-iframe').attr('height', '100%');
	}
 else{
		$('.lb-iframe').hide();
		$('.lb-iframe').attr('src', '');
		$('.lb-iframe').attr('width', '0%');
		$('.lb-iframe').attr('height', '0%');
	}
	



	$('#inout').hide();
	$('#zomin').click(function(){
		$('#zomin').hide();
		$('#zomout').show();
			lightbox.changeImage(lightbox.currentImageIndex,1);
	});
	$('#zomout').click(function(){
			$('#zomout').hide();
			$('#zomin').show();
		lightbox.changeImage(lightbox.currentImageIndex,0);
	});

	+) pan zoom in

 */

var def_top;
var def_left;
var nowimage=true;
 
(function() {
  // Use local alias
  var $ = jQuery;

  var LightboxOptions = (function() {
    function LightboxOptions() {
      this.fadeDuration                = 500;
      this.fitImagesInViewport         = true;
      this.resizeDuration              = 700;
      this.positionFromTop             = 40;
      this.showImageNumberLabel        = true;
      this.alwaysShowNavOnTouchDevices = false;
      this.wrapAround                  = false;
    }
    
    // Change to localize to non-english language
    LightboxOptions.prototype.albumLabel = function(curImageNum, albumSize) {
		if($('title').attr('id')!='ch_prof') return "Image " + curImageNum + " of " + albumSize;
		else return "Charactor " + curImageNum + " of " + albumSize;
	};

    return LightboxOptions;
  })();


  var Lightbox = (function() {
    function Lightbox(options) {
      this.options           = options;
      this.album             = [];
      this.currentImageIndex = void 0;
      this.init();
    }

    Lightbox.prototype.init = function() {
      this.enable();
      this.build();
    };

    // Loop through anchors and areamaps looking for either data-lightbox attributes or rel attributes
    // that contain 'lightbox'. When these are clicked, start lightbox.
    Lightbox.prototype.enable = function() {
      var self = this;
      $('body').on('click', 'a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]', function(event) {
        self.start($(event.currentTarget));
        return false;
      });
    };

    // Build html for the lightbox and the overlay.
    // Attach event handlers to the new DOM elements. click click click
    Lightbox.prototype.build = function() {
      var self = this;
      $("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a><iframe class='lb-iframe' style='position:absolute; left:0px; padding:4px;' src='' frameborder='0' allowfullscreen></iframe></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo($('body'));
	  if($('title').attr('id')=='evtv'){
	  $('#lightbox').draggable()
	  }
      // Cache jQuery objects
      this.$lightbox       = $('#lightbox');
      this.$overlay        = $('#lightboxOverlay');
      this.$outerContainer = this.$lightbox.find('.lb-outerContainer');
      this.$container      = this.$lightbox.find('.lb-container');

      // Store css values for future lookup
      this.containerTopPadding = parseInt(this.$container.css('padding-top'), 10);
      this.containerRightPadding = parseInt(this.$container.css('padding-right'), 10);
      this.containerBottomPadding = parseInt(this.$container.css('padding-bottom'), 10);
      this.containerLeftPadding = parseInt(this.$container.css('padding-left'), 10);
      
      // Attach event handlers to the newly minted DOM elements
      this.$overlay.hide().on('click', function() {
		$('#inout').hide();
		$('.lb-outerContainer').css('cursor','auto');
        self.end();
		$('#lightbox').css({'left':def_left,'top':def_top});
		$('.lb-data .lb-closeContainer .lb-close').removeClass('ext').css({'position':'relative','left':'auto','top':'auto'});
        return false;
      });

      this.$lightbox.hide().on('click', function(event) {
        if ($(event.target).attr('id') === 'lightbox') {
		$('#inout').hide();
		$('.lb-outerContainer').css('cursor','auto');
		self.end();
		$('#lightbox').css({'left':def_left,'top':def_top});
		$('.lb-data .lb-closeContainer .lb-close').removeClass('ext').css({'position':'relative','left':'auto','top':'auto'});
        }
        return false;
      });

      this.$outerContainer.on('click', function(event) {
        if ($(event.target).attr('id') === 'lightbox') {
		$('#inout').hide();
		$('.lb-outerContainer').css('cursor','auto');
		self.end();
		$('#lightbox').css({'left':def_left,'top':def_top});
		$('.lb-data .lb-closeContainer .lb-close').removeClass('ext').css({'position':'relative','left':'auto','top':'auto'});
        }
        return false;
      });
      this.$lightbox.find('.lb-prev').on('click', function() {
        if (self.currentImageIndex === 0) {
          self.changeImage(self.album.length - 1);
        } else {
          self.changeImage(self.currentImageIndex - 1);
        }
        return false;
      });

      this.$lightbox.find('.lb-next').on('click', function() {
        if (self.currentImageIndex === self.album.length - 1) {
          self.changeImage(0);
        } else {
          self.changeImage(self.currentImageIndex + 1);
        }
        return false;
      });
	  
      this.$lightbox.find('.lb-loader, .lb-close').on('click', function() {
		$('#inout').hide();
		$('.lb-outerContainer').css('cursor','auto');
		self.end();
		$('#lightbox').css({'left':def_left,'top':def_top});
		$('.lb-data .lb-closeContainer .lb-close').removeClass('ext').css({'position':'relative','left':'auto','top':'auto'});
        return false;
      });
    };

    // Show overlay and lightbox. If the image is part of a set, add siblings to album array.
    Lightbox.prototype.start = function($link) {
      var self    = this;
      var $window = $(window);

      $window.on('resize', $.proxy(this.sizeOverlay, this));
      $('select, object, embed').css({
        visibility: "hidden"
      });

      this.sizeOverlay();

      this.album = [];
      var imageNumber = 0;

      function addToAlbum($link) {
        self.album.push({
          link: $link.attr('href'),
          iframe: $link.attr('data-iframe') || $link.attr('href'),
          title: $link.attr('data-title') || $link.attr('title')
        });
      }

      // Support both data-lightbox attribute and rel attribute implementations
      var dataLightboxValue = $link.attr('data-lightbox');
      var $links;

      if (dataLightboxValue) {
        $links = $($link.prop("tagName") + '[data-lightbox="' + dataLightboxValue + '"]');
        for (var i = 0; i < $links.length; i = ++i) {
          addToAlbum($($links[i]));
          if ($links[i] === $link[0]) {
            imageNumber = i;
          }
        }
      } else {
        if ($link.attr('rel') === 'lightbox') {
          // If image is not part of a set
          addToAlbum($link);
        } else {
          // If image is part of a set
          $links = $($link.prop("tagName") + '[rel="' + $link.attr('rel') + '"]');
          for (var j = 0; j < $links.length; j = ++j) {
            addToAlbum($($links[j]));
            if ($links[j] === $link[0]) {
              imageNumber = j;
            }
          }
        }
      }
      
      // Position Lightbox
      var top  = $window.scrollTop() + this.options.positionFromTop;
      var left = $window.scrollLeft();
      this.$lightbox.css({
        top: top + 'px',
        left: left + 'px'
      }).fadeIn(this.options.fadeDuration);
		$('#inout').fadeIn(this.options.fadeDuration);
      this.changeImage(imageNumber);
    };
    // Hide most UI elements in preparation for the animated resizing of the lightbox.
    Lightbox.prototype.changeImage = function(imageNumber, option) {
	  option=(option==null)? -1:option;
	  if(option==-1){
		  $('#zomout').hide();        
		  $('#zomin').show();        
	  }
	  ch_zoom=true;
	  var self = this;
      this.disableKeyboardNav();
      var $image = this.$lightbox.find('.lb-image');
      this.$overlay.fadeIn(this.options.fadeDuration);

      $('.lb-loader').fadeIn('slow');
      this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();

      this.$outerContainer.addClass('animating');

      // When image to show is preloaded, we send the width and height to sizeContainer()
      var preloader = new Image();
      preloader.onload = function() {
        var $preloader, imageHeight, imageWidth, maxImageHeight, maxImageWidth, windowHeight, windowWidth;
        $image.attr('src', self.album[imageNumber].link);

        $preloader = $(preloader);

        $image.width(preloader.width);
        $image.height(preloader.height);
		/* added */
		if(self.album[imageNumber].link.indexOf('dummy')!=-1){
			$('.lb-iframe').show();
			$('.lb-iframe').attr('src', self.album[imageNumber].iframe);
			$('.lb-iframe').attr('width', '100%');
			$('.lb-iframe').attr('height', '100%');
		}
		else{
			$('.lb-iframe').hide();
			$('.lb-iframe').attr('src', '');
			$('.lb-iframe').attr('width', '0%');
			$('.lb-iframe').attr('height', '0%');
		}
		
	
        if (self.options.fitImagesInViewport&&self.album[imageNumber].iframe.indexOf('.html')==-1&&option!=1&&nowimage==true) {
        // Fit image inside the viewport.
        // Take into account the border around the image and an additional 10px gutter on each side.
		  ch_zoom=false;
          windowWidth    = $(window).width();
          windowHeight   = $(window).height();
          maxImageWidth  = windowWidth - self.containerLeftPadding - self.containerRightPadding - 20;
          maxImageHeight = windowHeight - self.containerTopPadding - self.containerBottomPadding - 120;
		console.log(windowHeight);
          // Is there a fitting issue?
          if ((preloader.width > maxImageWidth) || (preloader.height > maxImageHeight)) {
            if ((preloader.width / maxImageWidth) > (preloader.height / maxImageHeight)) {
              imageWidth  = maxImageWidth;
              imageHeight = parseInt(preloader.height / (preloader.width / imageWidth), 10);
              $image.width(imageWidth);
              $image.height(imageHeight);
            } else {
              imageHeight = maxImageHeight;
              imageWidth = parseInt(preloader.width / (preloader.height / imageHeight), 10);
              $image.width(imageWidth);
              $image.height(imageHeight);
            }
        }
		if($('title').attr('id')=='evtv'){		
			$('#lightbox').draggable('disable');
			def_left=$('#lightbox').css('left');
			def_top=$('#lightbox').css('top');
		}

        }
        self.sizeContainer($image.width(), $image.height());
      };

      preloader.src          = this.album[imageNumber].link;
      this.currentImageIndex = imageNumber;
    };

    // Stretch overlay to fit the viewport
    Lightbox.prototype.sizeOverlay = function() {
      this.$overlay
        .width($(document).width())
        .height($(document).height());
    };

    // Animate the size of the lightbox to fit the image we are showing
    Lightbox.prototype.sizeContainer = function(imageWidth, imageHeight) {
      var self = this;
      
      var oldWidth  = this.$outerContainer.outerWidth();
      var oldHeight = this.$outerContainer.outerHeight();
      var newWidth  = imageWidth + this.containerLeftPadding + this.containerRightPadding;
      var newHeight = imageHeight + this.containerTopPadding + this.containerBottomPadding;
      
      function postResize() {
        self.$lightbox.find('.lb-dataContainer').width(newWidth);
        self.$lightbox.find('.lb-prevLink').height(newHeight);
        self.$lightbox.find('.lb-nextLink').height(newHeight);
        self.showImage();
      }

      if (oldWidth !== newWidth || oldHeight !== newHeight) {
        this.$outerContainer.animate({
          width: newWidth,
          height: newHeight
        }, this.options.resizeDuration, 'swing', function() {
          postResize();
        });
      } else {
        postResize();
      }
    };

    // Display the image and it's details and begin preload neighboring images.
    Lightbox.prototype.showImage = function() {
      this.$lightbox.find('.lb-loader').hide();
      this.$lightbox.find('.lb-image').fadeIn('slow');
      this.updateNav();
      this.updateDetails();
      this.preloadNeighboringImages();
      this.enableKeyboardNav();
    };
	var ch_zoom=false;
    // Display previous and next navigation if appropriate.
    Lightbox.prototype.updateNav = function() {
      // Check to see if the browser supports touch events. If so, we take the conservative approach
      // and assume that mouse hover events are not supported and always show prev/next navigation
      // arrows in image sets.
      var alwaysShowNav = false;
      try {
        document.createEvent("TouchEvent");
        alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices)? true: false;
      } catch (e) {}
	 if(ch_zoom==false) this.$lightbox.find('.lb-nav').show();
	 else this.$lightbox.find('.lb-nav').hide();
      if (this.album.length > 1) {
        if (this.options.wrapAround) {
          if (alwaysShowNav) {
            this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
          }
          this.$lightbox.find('.lb-prev, .lb-next').show();
        } else {
          if (this.currentImageIndex > 0) {
            this.$lightbox.find('.lb-prev').show();
            if (alwaysShowNav) {
              this.$lightbox.find('.lb-prev').css('opacity', '1');
            }
          }
          if (this.currentImageIndex < this.album.length - 1) {
            this.$lightbox.find('.lb-next').show();
            if (alwaysShowNav) {
              this.$lightbox.find('.lb-next').css('opacity', '1');
            }
          }
        }
      }
    };

    // Display caption, image number, and closing button.
    Lightbox.prototype.updateDetails = function() {
      var self = this;

      // Enable anchor clicks in the injected caption html.
      // Thanks Nate Wright for the fix. @https://github.com/NateWr
      if (typeof this.album[this.currentImageIndex].title !== 'undefined' && this.album[this.currentImageIndex].title !== "") {
        this.$lightbox.find('.lb-caption')
          .html(this.album[this.currentImageIndex].title)
          .fadeIn('fast')
          .find('a').on('click', function(event){
            location.href = $(this).attr('href');
          });
      }
    
      if (this.album.length > 1 && this.options.showImageNumberLabel) {
        this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn('fast');
      } else {
        this.$lightbox.find('.lb-number').hide();
      }
      this.$outerContainer.removeClass('animating');    
      this.$lightbox.find('.lb-dataContainer').fadeIn(this.options.resizeDuration, function() {
        return self.sizeOverlay();
      });
    };

    // Preload previous and next images in set.
    Lightbox.prototype.preloadNeighboringImages = function() {
      if (this.album.length > this.currentImageIndex + 1) {
        var preloadNext = new Image();
        preloadNext.src = this.album[this.currentImageIndex + 1].link;
      }
      if (this.currentImageIndex > 0) {
        var preloadPrev = new Image();
        preloadPrev.src = this.album[this.currentImageIndex - 1].link;
      }
    };

    Lightbox.prototype.enableKeyboardNav = function() {
      $(document).on('keyup.keyboard', $.proxy(this.keyboardAction, this));
    };

    Lightbox.prototype.disableKeyboardNav = function() {
      $(document).off('.keyboard');
    };

    Lightbox.prototype.keyboardAction = function(event) {
      var KEYCODE_ESC        = 27;
      var KEYCODE_LEFTARROW  = 37;
      var KEYCODE_RIGHTARROW = 39;
      var keycode = event.keyCode;
      var key     = String.fromCharCode(keycode).toLowerCase();
      if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
        this.end();
      } else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
        if (this.currentImageIndex !== 0) {
          this.changeImage(this.currentImageIndex - 1);
        } else if (this.options.wrapAround && this.album.length > 1) {
          this.changeImage(this.album.length - 1);
        }
      } else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
        if (this.currentImageIndex !== this.album.length - 1) {
          this.changeImage(this.currentImageIndex + 1);
        } else if (this.options.wrapAround && this.album.length > 1) {
          this.changeImage(0);
        }
      }
    };

    // Closing time. :-(
    Lightbox.prototype.end = function() {
      this.disableKeyboardNav();
      $(window).off("resize", this.sizeOverlay);
      this.$lightbox.fadeOut(this.options.fadeDuration);
      this.$overlay.fadeOut(this.options.fadeDuration);
      $('select, object, embed').css({
        visibility: "visible"
      });
    };

    return Lightbox;

  })();

  $(function() {
    var options  = new LightboxOptions();
    var lightbox = new Lightbox(options);
	if($('title').attr('id')=='evtv'){
	$('#inout').hide();
	$('#zomin').click(function(){
		$('#zomin').hide();
		$('#zomout').show();
		$('.lb-outerContainer').css('cursor','move');
		lightbox.changeImage(lightbox.currentImageIndex,1);
		lightbox.sizeOverlay();
		$('.lb-data .lb-closeContainer .lb-close').css({'position':'fixed','left':'0px','top':'50px'});
		if($('title').attr('id')!='ch_prof'){
		  $('#lightbox').draggable().draggable('enable');
		  }
	});
	$('#zomout').click(function(){
		$('#lightbox').css({'left':def_left,'top':def_top});
		$('.lb-outerContainer').css('cursor','auto');
		$('#zomout').hide();
		$('#zomin').show();
		lightbox.changeImage(lightbox.currentImageIndex,0);
		lightbox.sizeOverlay();
		$('.lb-data .lb-closeContainer .lb-close').removeClass('ext').css({'position':'relative','left':'auto','top':'auto'});
		});
	}
  });
}).call(this);
