var datejs = require('datejs');

var content;
var suggested;

var days =["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]


$(document).ready(function(){
	suggested = $( ".suggested" ).draggable({
		helper:'clone'
	});

	content = $('#content');
	drawCalendar(datejs.Date.today());
});

$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();x

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};

function drawCalendar(date){
	/*build table data here todo*/
	var htmlText = '<tr id="datebar"><td colspan=8>'+date.getMonthName()+'</td></tr><tr><td class="time"></td>';

	for(var d=0; d<7; d++){
		htmlText += '<td>' + days[d] + '</td>';
	}

	htmlText += "</tr>";

	for(var h=0; h<24;h++){
		htmlText += '<tr><td class="time">'+h+'</td>';
		for(var d=0; d<7; d++){
			htmlText +='<td>event at '+h+'</td>';
		}
		htmlText +=	'</tr>';
	}
	content.find('#planner').html(htmlText);



};

function configureDragDrop(){
	var content = $('#content');
	content.droppable(
	{
		accept:'.event',
		drop: function(e, ui){
			var event = $(ui.draggable).clone();
			$(this).append(event);
		}
	}
	);
	content.find('#planner').append("");
}
