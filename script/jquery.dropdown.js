(function ($) {
	$.fn.DropDown = function(options) {

		// default the options
		var options = $.extend({
			'Type' 			: 	'Single',  //specifies the selection type, Single or Multi
			'AllText'		: 	'All items',
			'NoneText' 		: 	'Please Select', 
			'ShowHeader' 	: 	false, 
			'ItemClass' 	: 	null, 
			'HideSource' 	: 	true
		}, options);
		
		if ($(this).attr('multiple'))
			options.Type = 'Multi';
		
		//console.log(options);

		this.each(function(){
			var source = $(this);
			var selected = source.find("option[selected"); // get the selected options
			var caret = '<span class="caret"></span>';
			var id_offset = source.attr("name") + "option_";
			var theoptions = $('option', source); // get all the options

			var ele = $('<dl></dl>').addClass("dropdown").addClass((options.Type == 'Single' ? "singleselect" : "multiselect"));
			var selecttext = $('<dt>' + caret + options.NoneText + '</dt>');
			selectoptions = '<dd><ul>';
			i = 0;
			if (options.ShowHeader)
			{
				selectoptions += '<li><div class="dropdownHeader">' + 
					'<button class="DropDownSelectAll">Select All</button>' + 
					'<button class="DropDownDeSelectAll">Deselect All</button>' + 
					'</div></li>';
			}

			theoptions.each(function(){
				selectoptions += '<li ' + (options.ItemClass === null ? '' : 'class="' + options.ItemClass + '"') + '>' +
								 (options.Type == 'Single' ? '<label  data-value="' + $(this).val() + '">' + $(this).text() + '</label>' : 
								  '<input type="checkbox" id="' +id_offset + i + '" value="' + $(this).val() + '"><label for="' + id_offset + i + '" data-value="' + 
								  $(this).val() + '"><span></span>' + $(this).text() + '</label></li>');
				i++;
			});
			selectoptions += '</ul></dd>';
			ele.append(selecttext).append(selectoptions);

			// get the text widths of the other parts to get the widest width
			var width = source.width();

  			var html_calc = '<span id="textmeasurewidth">' + options.AllText + '</span>';
  			$('body').append(html_calc);
  			var m_width = $('#textmeasurewidth').width();
  			$('#textmeasurewidth').remove();
  			if (m_width > width)width = m_width;
  
  			html_calc = '<span id="textmeasurewidth">' + options.NoneText + '</span>';
  			$('body').append(html_calc);
  			m_width = $('#textmeasurewidth').width();
  			$('#textmeasurewidth').remove();
  			if (m_width > width)width = m_width;
  			width += 48;
  			
			ele.width(width);

			// add it after the original element
			source.after(ele);
			if (options.HideSource)
				source.hide();
			MenuEle = ele.find("ul");
			
			// click events
			ele.find("dt").click(function(){
				ele.find("ul").hide();
				ele.find("ul").hide().toggle();
			});

			if (options.Type == 'Single'){
				ele.find("li label").click(function(){
					ele.find("dt").html($(this).text() + caret);
					// set the original source value
					source.val($(this).attr("data-value"));
					ele.find("ul").hide();
					//MenuEle.hide();
				});
			} else {
				// multi select
				ele.find("li label").click(function(){
					var isChecked = $(this).parent().find('input').attr("checked");
					if (ele.find("dt").text() == options.NoneText)
						ele.find("dt").html("");
					
					if (isChecked)
					{
						// remove it
						var textval = ele.find("dt").text();
						var regex = new RegExp($(this).text() + "(, )?", "gi");
						textval = textval.replace(regex, "");
						if (textval.substr(textval.length-2, textval.length) == ", ")
						{
							textval = textval.substr(0, textval.length-2);
						}
						console.log("'" + textval + "'");
						ele.find("dt").html((textval.trim() == "" ? options.NoneText : textval ) + caret);
						source.find("option[value='" + $(this).attr("data-value") + "']").attr("selected", false);
					} else {
						var textval = ele.find("dt").text() + ", " + $(this).text();
						console.log(ele.find("dt").text() + ", " + $(this).text());
						ele.find("dt").html((ele.find("dt").text() == "" ?  
							textval.substr(1, textval.length) : 
							textval)  + caret);
						// set the original source value
						source.find("option[value='" + $(this).attr("data-value") + "']").attr("selected", true);
					}
					
					
				});

				if (options.ShowHeader)
				{
					// select all
					MenuEle.find(".DropDownSelectAll").click(function(e){
						e.preventDefault();
						MenuEle.find("input:checkbox").attr("checked", true);
						source.find("option").attr("selected", true);
						ele.find("dt").html(options.AllText + caret);
					});
					// deselect all
					MenuEle.find(".DropDownDeSelectAll").click(function(e){
						e.preventDefault();
						MenuEle.find("input:checkbox").attr("checked", false);
						source.find("option").attr("selected", false);
						ele.find("dt").html(options.NoneText + caret);
					})
					
				}
		

			}
		});

		$(document).click(function(e) {
			if (!$(e.target).closest('.dropdown').length) {
		    	$('.dropdown dd ul').hide();
		    	MenuEle.hide();
		  	}
		});
	};
}(jQuery));