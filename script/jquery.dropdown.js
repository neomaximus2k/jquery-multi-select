(function ($) {
	$.fn.DropDown = function(Settings) {

		// default the Settings
		var Settings = $.extend({
			'Type' 				: 	'Single',  //specifies the selection type, Single or Multi
			'AllText'			: 	'All items',
			'NoneText' 			: 	'Please Select', 
			'ShowHeader' 		: 	false, 
			'ItemClass' 		: 	null, 
			'HideSource' 		: 	true, 
			'NumSelectedText' 	: 	'items selected'
		}, Settings);
		
		if ($(this).attr('multiple'))
			Settings.Type = 'Multi';
		
		this.each(function(){
			var source = $(this);
			var caret = '<span class="caret"></span>';
			var id_offset = source.attr("name") + "option_";
			var options_full = $('option', source); // get all the options
			var options_checked = _getSelected(source);// get all the checked options
		    var numChecked = options_checked.length;

		    function _getWidth(TEXT){
		    	var html_calc = '<span id="textmeasurewidth">' + TEXT + '</span>';
	  			$('body').append(html_calc);
	  			var m_width = $('#textmeasurewidth').width();
	  			$('#textmeasurewidth').remove();
	  			return m_width;
		    }

		    function _getSelected(){
		    	return source.find(":selected");
		    }

		    function _setDisplayText()
		    {
		    	options_checked = _getSelected(source);
		    	numChecked = options_checked.length;
		    	var DisplayText = "";
		    	switch (options_checked.length) {
		    		case 0 :
		    			DisplayText = Settings.NoneText;
		    			break;
		    		case 1 : 
		    			DisplayText = options_checked.text();
		    			break;
		    		default : 
		    			if (options_checked.length == options_full.length)
		    				DisplayText = Settings.AllText;
		    			else {
		    				options_checked.each(function(idx, e){
		    					DisplayText += $(this).text() + ", ";
		    				});
		    				DisplayText = DisplayText.substr(0, (DisplayText.length - 2));
							if (_getWidth(DisplayText) >= (source.width()+48))
								DisplayText = numChecked + " " + Settings.NumSelectedText;
							break;
		    			}
		    	}
		    	ele.find("dt").html(DisplayText + caret);
		    }

			var ele = $('<dl></dl>').addClass("dropdown").addClass((Settings.Type == 'Single' ? "singleselect" : "multiselect"));
			var selecttext = $('<dt>' + caret + Settings.NoneText + '</dt>');
			selectoptions = '<dd><ul>';
			i = 0;
			if (Settings.ShowHeader){
				selectoptions += '<li><div class="dropdownHeader">' + 
					'<button class="DropDownSelectAll">Select All</button>' + 
					'<button class="DropDownDeSelectAll">Deselect All</button>' + 
					'</div></li>';
			}

			options_full.each(function(){
				selectoptions += '<li ' + (Settings.ItemClass === null ? '' : 'class="' + Settings.ItemClass + '"') + '>';
				if (Settings.Type == 'Single')
					selectoptions += '<label data-value="' + $(this).val() + '">' + $(this).text() + '</label>';
				else {
					selectoptions += '<input type="checkbox" id="' +id_offset + i + '" value="' + $(this).val() + '" ';
					selectoptions += '><label for="' + id_offset + i + '" data-value="' + $(this).val() + '"><span></span>' + $(this).text() + '</label>';
				}
				selectoptions += '</li>';
				i++;
			});
			selectoptions += '</ul></dd>';

			ele.append(selecttext).append(selectoptions);

			// do the selections
			if (numChecked > 0 && Settings.Type == 'Multi')
			{
				options_checked.each(function(){
					var val = $(this).val();
					ele.find("input:checkbox[value='" + val + "']").attr("checked", true);
				});
				
			}

			// get the text widths of the other parts to get the widest width
			var width = source.width();
			var m_width = _getWidth(Settings.AllText);				
  			if (m_width > width)width = m_width;
  
  			m_width = _getWidth(Settings.NoneText);
  			if (m_width > width)width = m_width;
  			
  			if (Settings.Type == "Multi")
  			{
  				m_width = _getWidth(options_full.length + " " + Settings.NumSelectedText);
  				if (m_width > width)width = m_width;
  			}
  			width += 48;
  			
			ele.width(width);
			ele.find("ul").width(width);

			// add it after the original element
			source.after(ele);
			if (Settings.HideSource)
				source.hide();
			MenuEle = ele.find("ul");
			
			// click events
			ele.find("dt").click(function(){
				$('.dropdown dd ul:visible').hide();
				ele.find("ul").hide().toggle();
			});

			if (Settings.Type == 'Single'){
				ele.find("li label, li input:checkbox").click(function(){
					// set the original source value
					source.val($(this).attr("data-value"));
					_setDisplayText();
					ele.find("ul").hide();
				});
			} else {
				// multi select
				ele.find("li input:checkbox").change(function(e){						
					var isChecked = $(this).parent().find('input').attr("checked");
					
					if (!isChecked)
						source.find("option[value='" + $(this).val() + "']").attr("selected", false);
					else
						source.find("option[value='" + $(this).val() + "']").attr("selected", true);

					_setDisplayText();					
				});

				if (Settings.ShowHeader)
				{
					// select all
					ele.find("ul .DropDownSelectAll").click(function(e){
						e.preventDefault();
						ele.find("ul input:checkbox").attr("checked", true);
						/*ele.find("ul input:checkbox").each(function(){
							$(this).attr("checked", true);
						});*/
						source.find("option").attr("selected", true);
						_setDisplayText();
					});
					// deselect all
					ele.find("ul .DropDownDeSelectAll").click(function(e){
						e.preventDefault();
						ele.find("ul input:checkbox").attr("checked", false);
						source.find("option").attr("selected", false);
						_setDisplayText();
					})
					
				}
		

			}

			_setDisplayText();
		});

		$(document).click(function(e) {

			//if (!$(e.target).closest(source).length) {
			if (!$(e.target).closest('.dropdown').length) {
		    	$('.dropdown dd ul').hide();
		    	MenuEle.hide();
		  	}
		});
	};
}(jQuery));