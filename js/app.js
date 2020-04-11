(function ($) {
    "use strict";
	var transparent = true;
	var hasTransparent = false;
	$().ready(function(){
		if($('nav[role="navigation"]').hasClass('navbar-transparent')){
			hasTransparent = true;
		}
		$('[rel="tooltip"]').tooltip();

		if(screen.width <= 768)
		{
			/* Add the class (manual-flip), to flip the card manually in movil */
			$('.team-container').addClass('manual-flip');
		}else{
			/* Animate */
			$('.animate').addClass("hidden-animate").viewportChecker({
				classToAdd: 'visible-animate animated fadeInUp',
				offset: 100
			});
			$('.animate-left').addClass("hidden-animate").viewportChecker({
				classToAdd: 'visible-animate animated slideInLeft',
				offset: 100
			});
			$('.animate-right').addClass("hidden-animate").viewportChecker({
				classToAdd: 'visible-animate animated slideInRight',
				offset: 100
			});
		}
		/* Owl portfolio*/
		$('#portfolio-carousel').owlCarousel({
			items:1,
			loop:true,
			margin:10,
			autoplay:true,
			autoplayTimeout:4000,
			autoplayHoverPause:true
		});
		/* Owl client*/
		$('#client-carousel').owlCarousel({
			items:7,
			loop:false,
			margin:15,
			nav:false,
			autoplay:true,
			autoplayTimeout:3000,
			autoplayHoverPause:true,
			responsiveClass:true,
			responsive:{
				0:{
					items:3,
				},
				600:{
					items:6,
				},
				1000:{
					items:7,
				}
			}
		});
		//Function to flip the card manually
		$('.team').on('click', 'button', function(){
			var $card = $(this).closest('.team-container');
			//console.log($card);
			if($card.hasClass('hover')){
				$card.removeClass('hover');
			} else {
				$card.addClass('hover');
			}
		});

		//Send message, from contact form.
		$('#contact-send').validator().on('submit', function(event){
		  if (event.isDefaultPrevented()){
		  }else{
		        event.preventDefault(); // Stop browser loading
		        var url = "php/contact.php";
		        $(".btn-mimu").html("SENDING...");
		        $.ajax({
		        	type: "POST",
		        	url: url,
		        	data: $(this).serialize(),
		        	success: function (data){
		        		var messageAlert = 'alert-' + data.info.type;
	                    var messageText = data.info.message;
	                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
	                    if(data.info.type == "success"){
	                    	$('#contact-send').find('.messages').html(alertBox);
	                    	$('#contact-send')[0].reset();	                    	
		                	$(".btn-mimu").addClass("disabled");
	                    }else{
	                    	$('#contact-send').find('.messages').html(alertBox);
	                    }
		                $(".btn-mimu").html("SUBMIT");
		            }
		        });
  			}
	    });
	    
	});
	/* Navbar transparent*/
	$(document).scroll(function() {
		if(hasTransparent){
			if( $(this).scrollTop() > 20 ) {
				if(transparent) {
					transparent = false;
					$('nav[role="navigation"]').removeClass('navbar-transparent');
					$('nav[role="navigation"]').addClass('navbar-default');
				}
			} else {
				if( !transparent ) {
					transparent = true;
					$('nav[role="navigation"]').addClass('navbar-transparent');
					$('nav[role="navigation"]').removeClass('navbar-default');
				}
			}
		}
	});

})(jQuery);