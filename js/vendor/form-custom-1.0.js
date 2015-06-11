$.customForm = function( selector, settings ){

	var customForm = this;
	customForm.selector = selector;
	customForm.vars = {};
	customForm.defaults = {
		autoApply : true
	}
	$.extend( customForm.defaults, settings );

	function init( )
	{
		if(  !$(customForm.selector).length ){
				//Atribui a exceção caso o elemento  não for encontrado.
				customForm.vars.exception = "Não foi possível encontrar os elementos";
				//Retorna indicando que o plugin não foi inicializado.
			}else{
					$( customForm.selector ).each(function(){

						$this = $(this);

						if( $this.is('select') ){
							$this.wrap('<div class="select-custom"></div>').parent().prepend('<span class="value"></span>');
							$this.on('change.customForm', _customSelect).each( _customSelect );
						}

						if( $this.is('input[type="file"]') ){
							$this.wrap('<div class="file-custom"></div>').parent().prepend('<span class="value"></span>');
							$this.on('change.customForm', _customFile).each( _customFile );
						}

						if( $this.is('input[type="checkbox"]') ){
							$this.wrap('<div class="checkbox-custom"></div>');
							$this.on('click.customForm', _customCheckbox).each( _customCheckbox );
						}

						if( $this.is('input[type="radio"]') ){
							$this.wrap('<div class="radio-custom"></div>');
							$this.on('click.customForm', _customRadio).each( _customRadio );
						}
		
					});

					$( customForm.selector )
						.on('focus.customForm',  	   _changeState)
						.on('blur.customForm',   	   _changeState)
						.on('mouseenter.customForm',   _changeState)
						.on('mouseleave.customForm',   _changeState);
			 	}

		return customForm;
	}

	function _customSelect(event)
	{
		$this = event.delegateTarget ? $(event.delegateTarget) : $(this);
			
		$this.parent().find('.value').text( $this.find('option:selected').text() );
	}

	function _customFile(event)
	{
		$this = event.delegateTarget ? $(event.delegateTarget) : $(this);
		
		$this.parent().find('.value').text( ($this.val()) ?  $this.val() : 'Nenhum arquivo selecionado.' );
	}

	function _customCheckbox(event)
	{
		$this = event.delegateTarget ? $(event.delegateTarget) : $(this);

		if ($this.is(':checked')) {
			$this.parent().addClass('checked');
		}else{
			$this.parent().removeClass('checked');
		}
	}

	function _customRadio(event)
	{
		$(customForm.selector).filter('input[type="radio"]').each(function(){
			$this = $(this);
			
			if ( $this.is(':checked')) {
				$this.parent().addClass('checked');
			}else{
				$this.parent().removeClass('checked');
			}
		});
	}

	function _changeState(event)
	{
		if( event.type == "focus" )
			$(event.delegateTarget).parent().addClass('focus');

		if( event.type == "blur" )
			$(event.delegateTarget).parent().removeClass('focus');

		if( event.type == 'mouseenter' )
			$(event.delegateTarget).parent().addClass('hover');

		if( event.type == 'mouseleave' )
			$(event.delegateTarget).parent().removeClass('hover');
	}
	
	customForm.destroy = function ()
	{
		$(  customForm.selector ).each(function(){
			$this = $(this);

			if( $this.is('select') || $this.is('input[type="file"]') )
				$this.parent().find('.value').remove();

			$this.unwrap();

		});

		$(  customForm.selector )
			.off('focus.customForm')
			.off('blur.customForm')
			.off('mouseenter.customForm')
			.off('mouseleave.customForm')
			.off('click.customForm')
			.off('change.customForm');

		return customForm;
	}

	customForm.refresh = function(){
		$( customForm.selector ).each(function(){

			if( $(this).is('select') ){
				$(this).each( _customSelect );
			}

			if( $(this).is('input[type="file"]') ){
				$(this).each( _customFile );
			}

			if( $(this).is('input[type="checkbox"]') ){
				$(this).each( _customCheckbox );
			}

			if( $(this).is('input[type="radio"]') ){
				$(this).each( _customRadio );
			}

		});

		return customForm;
	}

	customForm.apply = function(){
		init();

		return customForm;
	}

	if( customForm.defaults.autoApply == true ){
		return init();
	}else{
		return customForm;
	}
};