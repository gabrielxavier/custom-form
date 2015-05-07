$.customForm = function( selector, settings ){

	var customForm = { selector : selector, defaults : {}, vars: {}, functions : {} };

	customForm.defaults = {}
	$.extend( customForm.defaults, settings );

	customForm.functions = {
		init : function( targets ){
			if(  !$(targets).length ){
				//Atribui a exceção caso o elemento  não for encontrado.
				customForm.vars.exception = "Não foi possível encontrar os elementos";
				//Retorna indicando que o plugin não foi inicializado.
			}else{
						$( targets ).each(function(){

							if( $(this).is('select') ){
								$(this).wrap('<div class="select-custom"></div>').parent().prepend('<span class="value"></span>');
								$(this).on('change.customForm', customForm.functions._customSelect).each( customForm.functions._customSelect );
							}

							if( $(this).is('input[type="file"]') ){
								$(this).wrap('<div class="file-custom"></div>').parent().prepend('<span class="value"></span>');
								$(this).on('change.customForm', customForm.functions._customFile).each( customForm.functions._customFile );
							}

							if( $(this).is('input[type="checkbox"]') ){
								$(this).wrap('<div class="checkbox-custom"></div>');
								$(this).on('click.customForm', customForm.functions._customCheckbox).each( customForm.functions._customCheckbox );
							}

							if( $(this).is('input[type="radio"]') ){
								$(this).wrap('<div class="radio-custom"></div>');
								$(this).on('click.customForm', customForm.functions._customRadio).each( customForm.functions._customRadio );
							}
			
						});

						$( customForm.selector )
							.on('focus.customForm',  			 customForm.functions._changeState)
							.on('blur.customForm',   			 customForm.functions._changeState)
							.on('mouseenter.customForm',   customForm.functions._changeState)
							.on('mouseleave.customForm',   customForm.functions._changeState);
				 	}

			return customForm;
		},
		destroy: function( targets ){

			$( targets ).each(function(){
				$this = $(this);

				if( $this.is('select') || $this.is('input[type="file"]') )
					$this.parent().find('.value').remove();

				$this.unwrap();

			});

			$( targets )
				.off('focus.customForm')
				.off('blur.customForm')
				.off('mouseenter.customForm')
				.off('mouseleave.customForm')
				.off('click.customForm')
				.off('change.customForm');

			return customForm;
		},
		apply: function(targets)
		{
			customForm.functions.init(targets);
			
			return customForm;
		},
		_customSelect: function(event){
			$this = event.delegateTarget ? $(event.delegateTarget) : $(this);
			
			$this.parent().find('.value').text( $this.find('option:selected').text() );
		},
		_customFile: function(event){
			$this = event.delegateTarget ? $(event.delegateTarget) : $(this);
			
			$this.parent().find('.value').text( $this.val() );
		},
		_customCheckbox: function(event){
			$this = event.delegateTarget ? $(event.delegateTarget) : $(this);

			if ($this.is(':checked')) {
				$this.parent().addClass('checked');
			}else{
				$this.parent().removeClass('checked');
			}
		},
		_customRadio: function(event){
			$(customForm.selector).filter('input[type="radio"]').each(function(){
				$this = $(this);
				
				if ( $this.is(':checked')) {
					$this.parent().addClass('checked');
				}else{
					$this.parent().removeClass('checked');
				}
			});
		},
		_changeState: function(event){
			if( event.type == "focus" )
				$(event.delegateTarget).parent().addClass('focus');

			if( event.type == "blur" )
				$(event.delegateTarget).parent().removeClass('focus');

			if( event.type == 'mouseenter' )
				$(event.delegateTarget).parent().addClass('hover');

			if( event.type == 'mouseleave' )
				$(event.delegateTarget).parent().removeClass('hover');
		}
	}
	//Retorna o retorno da função que inicializa o plugin.
	return customForm.functions.init( customForm.selector );
};