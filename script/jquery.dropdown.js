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
		
		//console.log(Settings);

		this.each(function(){
			var source = $(this);
			var caret = '<span class="caret"></span>';
			var id_offset = source.attr("name") + "option_";
			var options_full = $('option', source); // get all the options
			var options_checked = _getSelected(source);//source.find(":selected");// $('option:selected', source);//options_full.filter(':checked');// get all the checked options
		    var numChecked = options_checked.length;

		    //console.log(numChecked);
		    //console.log(options_checked);

		    function _getWidth(TEXT){
		    	var html_calc = '<span id="textmeasurewidth">' + TEXT + '</span>';
	  			$('body').append(html_calc);
	  			var m_width = $('#textmeasurewidth').width();
	  			$('#textmeasurewidth').remove();
	  			return m_width;
		    }

		    function _getSelected(){
		    	console.log("_getSelected = " + source.find(":selected").length);
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
		    			console.log(options_checked);
		    			if (options_checked.length == options_full.length)
		    			{
		    				DisplayText = Settings.AllText;
		    			} else {
		    				options_checked.each(function(idx, e){
		    					DisplayText += $(this).text() + ", ";
		    				});
		    				DisplayText = DisplayText.substr(0, (DisplayText.length - 2));
		    				console.log("WIDTH: " + _getWidth(DisplayText) + " >= " + (source.width()+48));
							if (_getWidth(DisplayText) >= (source.width()+48))
								DisplayText = numChecked + " " + Settings.NumSelectedText;
							break;
		    			}
		    	}
		    	ele.find("dt").html(DisplayText + caret);
		    	//if (Settings.Type == 'Single')
		    		//ele.find("dt").html($(this).text() + caret);
		    }
        	// This is the method that will be called for each iteration of the loop. It now
        	// has access to f1,f2,f3 but doesn't need to create a closure for each iteration.  
        		

				var ele = $('<dl></dl>').addClass("dropdown").addClass((Settings.Type == 'Single' ? "singleselect" : "multiselect"));
				var selecttext = $('<dt>' + caret + Settings.NoneText + '</dt>');
				selectoptions = '<dd><ul>';
				i = 0;
				if (Settings.ShowHeader)
				{
					selectoptions += '<li><div class="dropdownHeader">' + 
						'<button class="DropDownSelectAll">Select All</button>' + 
						'<button class="DropDownDeSelectAll">Deselect All</button>' + 
						'</div></li>';
				}

				options_full.each(function(){
					selectoptions += '<li ' + (Settings.ItemClass === null ? '' : 'class="' + Settings.ItemClass + '"') + '>';
					if (Settings.Type == 'Single')
						selectoptions += '<label data-value="' + $(this).val() + '">' + $(this).text() + '</label>';
					else /*if (Settings.ItemClass === null) {
						selectoptions += '<label for="' + id_offset + i + '" data-value="' + $(this).val() + '"> ' + 
								'<input type="checkbox" id="' +id_offset + i + '" value="' + $(this).val() + '"> <span></span>' + $(this).text() + '</label>';
					} else */{
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
					//ele.find("ul").hide();
					ele.find("ul").hide().toggle();
				});

				if (Settings.Type == 'Single'){
					ele.find("li label, li input:checkbox").click(function(){
						// set the original source value
						source.val($(this).attr("data-value"));
						_setDisplayText();
						ele.find("ul").hide();
						//MenuEle.hide();
					});
				} else {
					// multi select
					ele.find("li input:checkbox").change(function(e){
						//alert("Done");
					/*	source.val($(this).attr("data-value"));
						_setDisplayText();
						ele.find("ul").hide();
					})
					ele.find("li label").click(function(){*/
						var isChecked = $(this).parent().find('input').attr("checked");
						console.log(isChecked);

						//if (ele.find("dt").text() == Settings.NoneText)
						//	ele.find("dt").html("");
						/*if (isChecked)
							source.find("option[value='" + $(this).attr("data-value") + "']").attr("selected", false);
						else
							source.find("option[value='" + $(this).attr("data-value") + "']").attr("selected", true);

						console.log("option[value='" + $(this).attr("data-value") + "']");*/
						if (!isChecked)
							source.find("option[value='" + $(this).val() + "']").attr("selected", false);
						else
							source.find("option[value='" + $(this).val() + "']").attr("selected", true);

						console.log("option[value='" + $(this).val() + "']");
						_setDisplayText();
						/*if (isChecked)
						{
							// remove it
							source.find("option[value='" + $(this).attr("data-value") + "']").attr("selected", false);
							_getSelected(source);

							var textval = ele.find("dt").text();
							var regex = new RegExp($(this).text() + "(, )?", "gi");
							textval = textval.replace(regex, "");
							regex = new RegExp("[0-9]* " + Settings.NumSelectedText, "gi");
							textval = textval.replace(regex, "");
							
							if (textval.substr(textval.length-2, textval.length) == ", ")
								textval = textval.substr(0, textval.length-2);
							
							if (_getWidth(textval) >= (width - 48))
								textval = numChecked + " " + Settings.NumSelectedText;
							
							console.log("'" + textval + "'");
							ele.find("dt").html((textval.trim() == "" ? Settings.NoneText : textval ) + caret);
							
						} else {
							var textval = ele.find("dt").text() + ", " + $(this).text();
							
							textval = (ele.find("dt").text() == "" ?  textval.substr(1, textval.length) : textval);

							if (_getWidth(textval) >= (width - 48))
								textval = numChecked + " " + Settings.NumSelectedText;
							
							console.log(textval);
							
							ele.find("dt").html(textval  + caret);
							// set the original source value
							source.find("option[value='" + $(this).attr("data-value") + "']").attr("selected", true);
						}*/
						
						
					});

					if (Settings.ShowHeader)
					{
						// select all
						MenuEle.find(".DropDownSelectAll").click(function(e){
							e.preventDefault();
							//console.log(MenuEle.find("input:checkbox"));
							MenuEle.find("input:checkbox").each(function(){
								//console.log($(this));
								console.log("--" + $(this).attr("checked"));
								$(this).attr("checked", true);
								console.log("==" + $(this).attr("checked"));
							});
							//MenuEle.find("input[type='checkbox']").attr("checked", true);
							source.find("option").attr("selected", true);
							_setDisplayText();
						});
						// deselect all
						MenuEle.find(".DropDownDeSelectAll").click(function(e){
							e.preventDefault();
							MenuEle.find("input:checkbox").attr("checked", false);
							source.find("option").attr("selected", false);
							ele.find("dt").html(Settings.NoneText + caret);
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