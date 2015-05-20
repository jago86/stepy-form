/*!
 * Stepy step v0.2.1
 * https://github.com/jago86/stepy-form.git
 *
 * Copyright (c) 2015 Jairo Ushiña
 * Released under the MIT license
 *
 * Date: 2015-05-19T17:22:50
 */
(function( $ ) {
	var methods = {
		init : function() { 
			var form=this
			var counter=1, nextStep, prevStep
			var numberSteps=form.children(".stepy-step").length
			var options=arguments[0]

			form.children(".stepy-step").each(function() {
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
			form.children(".stepy-step").hide().addClass("stepy-step-off").filter(".stepy-step-1").show().removeClass("stepy-step-off").addClass("stepy-step-on")
			//add event for call the steps in buttons
			form.find(".stepy-next, .stepy-prev").on('click', function(event){
				event.preventDefault()
				privateMethods._callStep.apply(this, form)
			})
		},
		
		goStep : function (step) {
			var contextForm=this //formulario al que se hace referencia
			var stepGo=step
			var stepFrom=contextForm.find(".stepy-step-on").attr("data-stepy-step")
			var classStepGo="stepy-step-" + stepGo
			var classStepFrom= "stepy-step-" + stepFrom
			var direction=["left", "right"]
			if (stepGo != stepFrom)
			{
				if (stepGo < stepFrom) 
				{
					direction=["right", "left"]
				}
				contextForm.find("."+classStepFrom).toggle( "slide", 
					{
						direction: direction[0]
					}, 
					function(){ 
						contextForm.find( "."+classStepGo ).toggle( "slide", 
							{
								direction: direction[1]
							})
						.addClass('stepy-step-on')
						.removeClass('stepy-step-off')
						opts.onChangeStep.call(contextForm.find( "."+classStepGo ).get(0))
				 	})
				.removeClass('stepy-step-on')
				.addClass('stepy-step-off')
			}
		},
		goStepOfElement : function(selector) {
			if($(selector).length)
			{
				$(selector).each(function(){
					var stepFather=privateMethods._getStepFather.apply($(this))
					var formFather=privateMethods._getFormFather.apply($(this))
					methods.goStep.apply(formFather, [stepFather.attr("data-stepy-step")])
				})
			}
			else
			{
				$.error(selector + " doesn't exist")
			}
		}
	};

	var privateMethods = {
		_getStepFather : function() { 
		  return $( this ).closest(".stepy-step")
		},
		_getFormFather : function() { 
		  return $( this ).closest("form")
		},
		_callStep : function() {
			var context=arguments[0]
			var stepGo=$(this).attr("data-stepy-call") //this contiene el elemento jquery con el boton presionado
			methods.goStep.apply($(context), [stepGo])
		},
	};
 
    $.fn.stepyform = function(method) {
    		// If function exist, call it
			if ( methods[method] ) {
				var args = Array.prototype.slice.call( arguments, 1 )
				this.each(function(){
					methods[ method ].apply( $(this), args)
				})
			} else if ( typeof method === 'object' || ! method ) {
				//If there's no parameters
				//or the parameter is a configuration object
				//call init
				opts = $.extend( {}, $.fn.stepyform.defaults, arguments[0])
				this.each(function(){
					methods.init.apply( $(this) )
				})
				
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