/** ***************************************

	TABLE OF CONTENTS
	---------------------------
		1. Box Effect
		2. Counter
		3. Text Animation
		4. Subscribe
		5. Subscribe input field

 **  ***************************************/

/******************************************************************
*******************************		1. BOX EFECT
******************************************************************/
	( function ( $ ) {
	    'use strict';
		$(document).ready(function() {

			var	main_section_elements 		= $('.logo, .main-paragraph, .subscribe-form, .switch-button-1, .text-effect'),
				main_section_elements_2		= $('.logo, .main-paragraph, .subscribe-form, .switch-button-1'),
				counter_section_elements 	= $('#counter-area'),
				contact_section_elements 	= $('#contact'),
				divider 					= $('.divider'),
				box_object 					= $('.box-object'),
				box_object_inner_border		= $('.box-object-inner-border'),
				contact_details_icon 		= $('.contact-details-icon'),
				contact_details_text		= $('.contact-details-text'),
				counterActive 				= false,
				contactActive 				= false,
				divider_effect				= true;

			setTimeout(function() {
				box_object.addClass('box-to-romb');
			}, 3000);

			setTimeout(function() {
				main_section_elements_2.removeClass('hide-effect');
				main_section_elements_2.addClass('show-effect');
			}, 6000);

			$('.switch-button-1').click(function(){

				open_box();
				hide_main();
				show_counter();
				setTimeout(function() {
					counterActive = true;
					contactActive = false;
				}, 2200);

			});

			$('.switch-button-2').click(function(){

				hide_counter();
				show_contact();
				setTimeout(function() {
					counterActive = false;
					contactActive = true;
				}, 2000);

			});

			$('.switch-button-3').click(function() {

				close_box();
				hide_contact();
				show_main();
				setTimeout(function() {
					contactActive = false;
					counterActive = false;
				}, 2000);

			});

			function open_box() {
				box_object.removeClass('box-to-romb');
				box_object_inner_border.removeClass('border-animation-4');
				box_object_inner_border.addClass('border-animation-2');
			}

			function close_box() {
				box_object.addClass('box-to-romb');
				box_object_inner_border.removeClass('border-animation-2');
				box_object_inner_border.removeClass('border-animation-3');
				box_object_inner_border.addClass('border-animation-4');
			}

			function show_main() {
				main_section_elements.addClass('show-effect');
				main_section_elements.removeClass('hide-effect');
			}

			function hide_main() {
				main_section_elements.removeClass('show-effect');
				main_section_elements.addClass('hide-effect');
			}

			function show_counter() {
				counter_section_elements.removeClass('hide-effect');
				counter_section_elements.addClass('show-effect');
				setTimeout(function(){
					divider.addClass('divider-effect');
				}, 100);
				show_countdown();
			}

			function hide_counter() {
				counter_section_elements.removeClass('show-effect');
				counter_section_elements.addClass('hide-effect');
				if( divider_effect ) {
					divider.removeClass('divider-effect');
				}
			}

			function show_contact() {
				contact_section_elements.removeClass('hide-effect');
				contact_section_elements.addClass('show-effect');
				box_object_inner_border.removeClass('border-animation-2');
				box_object_inner_border.addClass('border-animation-3');
				setTimeout(function() {
					contact_details_icon.addClass('contact-details-icon-effect');
					contact_details_text.addClass('contact-details-text-effect');
					divider.addClass('divider-effect');
				}, 100);
				divider_effect = false;
			}

			function hide_contact() {
				contact_section_elements.removeClass('show-effect');
				contact_section_elements.addClass('hide-effect');
				contact_details_icon.removeClass('contact-details-icon-effect');
				contact_details_text.removeClass('contact-details-text-effect');
			}

			function show_countdown() {
				setTimeout(function() {
					$('.days-wrap').addClass('countdown-wrap-active');
				}, 1000);
				setTimeout(function() {
					$('.hours-wrap').addClass('countdown-wrap-active');
				}, 1200);
				setTimeout(function() {
					$('.minutes-wrap').addClass('countdown-wrap-active');
				}, 1400);
				setTimeout(function() {
					$('.seconds-wrap').addClass('countdown-wrap-active');
				}, 1600);
				setTimeout(function() {
					$('.countdown-rotate').addClass('countdown-rotate-active')
				}, 1000);
			}
			

			if( $(window).width() > 768 ) {
				setTimeout(function() {
					$('html').bind('DOMMouseScroll mousewheel', function(e){
						var wheel = e.originalEvent.wheelDelta || e.originalEvent.detail*(-1);
						if(wheel/120 < 0) {
							if (!counterActive && !contactActive) {
								open_box();
								hide_main();
								show_counter();
								hide_contact();
								setTimeout(function() {
									counterActive = true;
									contactActive = false;
								}, 2200);
							}
							else if (counterActive && !contactActive){
								hide_counter();
								show_contact();
								setTimeout(function() {
									counterActive = false;
									contactActive = true;
								}, 2000);
							}
						}
					});
					$('html').bind('DOMMouseScroll mousewheel', function(e){
						var wheel = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;
						if(wheel / 120 > 0) {
							if (contactActive === true && counterActive === false) {
								hide_contact();
								show_counter();
								setTimeout(function() {
									counterActive = true;
									contactActive = false;
								}, 2000);
							}	
						}
					});
				}, 9000);
			}
		});
	} ( jQuery ) );

/******************************************************************
*******************************		2. COUNTER
******************************************************************/
	( function (  ) {
	    'use strict';

		var Month 		= counter.setMonth;
		var Day 		= counter.setDay;
		var Year 		= counter.setYear;
		var target_date = new Date(Month +','+ Day +','+ Year).getTime();
		 
		var days, hours, minutes, seconds;
		 
		var countdownDays 	 = document.getElementById("days");
		var countdownHours 	 = document.getElementById("hours");
		var countdownMinutes = document.getElementById("minutes");
		var countdownSeconds = document.getElementById("seconds");

		setInterval(function () {
		 
			var current_date = new Date().getTime();
			var seconds_left = (target_date - current_date) / 1000;

			days = parseInt(seconds_left / 86400);
			seconds_left = seconds_left % 86400;

			hours = parseInt(seconds_left / 3600);
			seconds_left = seconds_left % 3600;

			minutes = parseInt(seconds_left / 60);
			seconds = parseInt(seconds_left % 60);


//			days 	= (String(days).length >= 2) ? days : '0' + days;
//	    	hours 	= (String(hours).length >= 2) ? hours : '0' + hours;
//	    	minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
//	    	seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

//			countdownDays.innerHTML = days;
//			countdownHours.innerHTML = hours;
//			countdownMinutes.innerHTML = minutes;
//			countdownSeconds.innerHTML = seconds;

		 
		}, 1000);

		var numberOfIcons 	= $('.layer-soc').length,
			iconWidth 		= $('.layer-soc').outerWidth(true),
			totalIconsWidth	= numberOfIcons * iconWidth;

		$('.icon-center').css({
			width: totalIconsWidth
		});

	} () );
	

/******************************************************************
*******************************		3. TEXT ANIMATION
******************************************************************/
	( function ( $ ) {
	    'use strict';
		$(document).ready(function() {

			$(".text-animation-phrases > h2").lettering('words').children("span").lettering().children("span").lettering(); 
			
			var span_delay = 3;

			for ( var i = 2, l = $('.text-animation-phrases h2').length; i < l; i++ ) {
				$( ".text-animation-phrases h2:nth-child(" + i + ") > span > span > span " ).css({
					'-webkit-animation-delay': span_delay + 's',
					'-moz-animation-delay': span_delay + 's',
					'animation-delay': span_delay + 's',
				});
				span_delay += 4;
			}

			$( ".text-animation-phrases h2:nth-child(" + $('.text-animation-phrases h2').length + ") > span > span > span " ).css({
				'-webkit-animation': 'FadeIn 2s linear ' + span_delay + 's forwards',
				'-moz-animation': 'FadeIn 2s linear ' + span_delay + 's forwards',
				'animation': 'FadeIn 2s linear ' + span_delay + 's forwards',
			});

			if( $(window).width() <= 768 ) {

				$( ".text-animation-phrases h2" ).each(function( index ) {

					var h2_split = $( this ).text().split(" ");
					
					h2_split.pop();

					if( h2_split.length == 3 ) {

						$( this ).find('> span:nth-child(1)').css('margin-top', '-40px');
						$( this ).find('> span:nth-child(2)').css('margin-top', '0px');
						$( this ).find('> span:nth-child(3)').css('margin-top', '40px');

					} 

					 if( h2_split.length == 2 ) {
						// console.log(2);
						$( this ).find('> span:nth-child(1)').css('margin-top', '-30px');
						$( this ).find('> span:nth-child(2)').css('margin-top', '30px');
					}
					
				});
			}

		});
	} ( jQuery ) );

/******************************************************************
*******************************		4. SUBSCRIBE
******************************************************************/
	( function ( $ ) {
	    'use strict';
		$(document).ready(function() {

			// Event on submit subscribe form
			$('.submit-form-icon, .submit-mobile').on('click', function() {

				// Get value from input field
	          	var email = $('.subscribe-email-field').val(),
					emailTo = '',
					apiKey = '',
					listID = '',
					is_email_enabled = false,
					is_mailchimp_enabled = false;

				// Subscribe via email
				if( subscribe.emailTo ) {
					is_email_enabled = true;
					emailTo = subscribe.emailTo;
				}
				// Subscribe via mailchimp
				if( subscribe.apiKey && subscribe.listID ) {
					is_mailchimp_enabled = true;
					apiKey = subscribe.apiKey;
					listID = subscribe.listID;
				}

	          	// Ajax request for sending mails
	            $.ajax({
					type: 'POST',
					url: 'assets/subscribe.php',
					data: {
						// Mailchimp service
						via_mailchimp: is_mailchimp_enabled,
						// Subscribe via email service
						via_email: is_email_enabled,
						// Field value
						email: email,
						// Your email
						email_to: emailTo,
						// Mailchimp api key
						api_key: apiKey,
						// Mailchimp list id
						list_id: listID,
						// Server success message
						success_msg: subscribe.successMsg
					},
					dataType: 'json',
					success: function(json) {
		                if(json.valid === 0) {
		                	// Set response text below field
		                	$('.subscribe-email-label').removeClass('subscribe-email-label-animation-default');
		                	$('.subscribe-email-field').removeClass('subscribe-email-field-animation-default');
		                	$('.subscribe-email-label').addClass('subscribe-email-label-animation-error');
		                	$('.subscribe-email-field').addClass('subscribe-email-field-animation-error');
		                }
		                else {
		                	// Set response text below field
		                	$('.subscribe-email-label').addClass('subscribe-email-label-animation-default');
		                	$('.subscribe-email-field').addClass('subscribe-email-field-animation-default');
		                	$('.subscribe-email-label').removeClass('subscribe-email-label-animation-error');
		                	$('.subscribe-email-field').removeClass('subscribe-email-field-animation-error');
		                	$('.subscribe-email-field').val(json.message);
		                	setInterval(function() {
		                		$('.subscribe-email-field').val('');
		                		$('.subscribe-form').removeClass('subscribe-email-field-on-focus');
		                	}, 2000);
		                }
	              	},
	              	error: function (jqXHR, textStatus, errorThrown) {
	                    console.log(textStatus, errorThrown);
	                }

	          });

	          return false;

	        });

		});
	} ( jQuery ) );
	

/******************************************************************
*******************************		5. SUBSCRIBE INPUT FIELD
******************************************************************/

	/*!
	 * classie - class helper functions
	 * from bonzo https://github.com/ded/bonzo
	 * 
	 * classie.has( elem, 'my-class' ) -> true/false
	 * classie.add( elem, 'my-new-class' )
	 * classie.remove( elem, 'my-unwanted-class' )
	 * classie.toggle( elem, 'my-class' )
	 */

	/*jshint browser: true, strict: true, undef: true */
	/*global define: false */

	( function( window ) {

	'use strict';

		// class helper functions from bonzo https://github.com/ded/bonzo

		function classReg( className ) {
		  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
		}

		// classList support for class management
		// altho to be fair, the api sucks because it won't accept multiple classes at once
		var hasClass, addClass, removeClass;

		if ( 'classList' in document.documentElement ) {
		  	hasClass = function( elem, c ) {
		    	return elem.classList.contains( c );
		  	};
		  	addClass = function( elem, c ) {
		    	elem.classList.add( c );
		  	};
		  	removeClass = function( elem, c ) {
		    	elem.classList.remove( c );
		  	};
		}
		else {
		  	hasClass = function( elem, c ) {
		    	return classReg( c ).test( elem.className );
		  	};
		  	addClass = function( elem, c ) {
		    	if ( !hasClass( elem, c ) ) {
		    		elem.className = elem.className + ' ' + c;
		    	}
		  	};
		  	removeClass = function( elem, c ) {
		    	elem.className = elem.className.replace( classReg( c ), ' ' );
		  	};
		}

		function toggleClass( elem, c ) {
		  	var fn = hasClass( elem, c ) ? removeClass : addClass;
		  	fn( elem, c );
		}

		var classie = {
			// full names
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			// short names
			has: hasClass,
			add: addClass,
			remove: removeClass,
			toggle: toggleClass
		};

		// transport
		if ( typeof define === 'function' && define.amd ) {
		  	// AMD
		  	define( classie );
		} else {
		  	// browser global
		  	window.classie = classie;
		}

	})( window );

	(function() {

		// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( 'input.subscribe-email-field' ) ).forEach( function( inputEl ) {
			// in case the input is already filled..
			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'subscribe-email-field-on-focus' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'subscribe-email-field-on-focus' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'subscribe-email-field-on-focus' );
			}
		}

	})();
