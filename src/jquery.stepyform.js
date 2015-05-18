(function( $ ) {
	var methods = {
		init : function() { 
			var counter=1, nextStep, prevStep
			var numberSteps=this.children(".stepy-step").length
			var options=arguments[0]
			// console.log(opts)
			// arguments[0].fun()

			this.children(".stepy-step").each(function() {
				// add step number in div
				var divStep = $( this );
				divStep.addClass("stepy-step-" + counter)
				divStep.attr("data-stepy-step", counter)

				// add previous button
				if (counter > 1) 
				{
					prevStep=counter-1
					var prevBtn=$("<a>")
					prevBtn
					.attr(opts.navButtonsAttrs)
					.attr({
						"data-stepy-call": prevStep,
						"href": "#",
					})
					.addClass("stepy-prev")
					.addClass(opts.prevButtonsClass)
					.html(opts.prevButtonText)

					divStep.append(prevBtn)
				};
				// add next button
				if (counter < numberSteps) 
				{
					nextStep=counter+1
					var nextBtn=$("<a>")
					nextBtn
					.attr(opts.navButtonsAttrs)
					.attr({
						"data-stepy-call": nextStep,
						"href": "#",
					})
					.addClass("stepy-next")
					.addClass(opts.nextButtonsClass)
					.html(opts.nextButtonText)

					divStep.append(nextBtn)
				};
				counter++

			});
			// hide divs
			this.children(".stepy-step").hide().addClass("off").filter(".stepy-step-1").show().removeClass("off").addClass("on")
			//add event for call the steps in buttons
			this.find(".stepy-next, .stepy-prev").on('click', function(event){
				methods.goStep.apply(this)
				event.preventDefault()
			})
		},
		goStep : function() {
			var stepGo=$(this).attr("data-stepy-call")
			var stepFrom=methods._getStepFather.apply(this)
			var classStepGo="stepy-step-" + stepGo
			var classStepFrom= "stepy-step-" + stepFrom
			var direction=["left", "right"]
			if (stepGo != stepFrom)
			{
				if (stepGo < stepFrom) 
				{
					direction=["right", "left"]
				}
				$("."+classStepFrom).toggle( "slide", 
					{
						direction: direction[0]
					}, 
					function(){ 
						$( "."+classStepGo ).toggle( "slide", 
							{
								direction: direction[1]
							})
						.addClass('on')
						.removeClass('off')
						opts.onChangeStep.call($( "."+classStepGo ).get(0))
				 	})
				.removeClass('on')
				.addClass('off')
			}
		},
		_getStepFather : function( element ) { 
		  return $( this ).parents()
			.map(function() {
				if($(this).hasClass("stepy-step"))
				{
					return $(this).attr('data-stepy-step')
				}
			}).get().join()
		},
	};
 
    $.fn.stepyform = function(method) {
		// If function exist, call it
		if ( methods[method] ) {
			opts = $.extend( {}, $.fn.stepyform.defaults, Array.prototype.slice.call( arguments, 1 ))
			methods[ method ].apply( this, opts)
		} else if ( typeof method === 'object' || ! method ) {
			//If there's no parameters
			//or the parameter is a configuration object
			//call init
			opts = $.extend( {}, $.fn.stepyform.defaults, arguments[0])
			methods.init.apply( this )
		} else {
			// Else, show error
			$.error( method 
			+ ' is not a jQuery.stepystep function' );
		}  
		return this;
    };

	var opts
    // Default options
	$.fn.stepyform.defaults = {
	    navButtonsAttrs: {},
		prevButtonText: "Previous",
		nextButtonText: "Next",
	    prevButtonsClass: "",
	    nextButtonsClass: "",
	    onChangeStep: function(){},
	};
}( jQuery ));