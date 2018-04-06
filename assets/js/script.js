
var content;
var suggested;


var days =["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]



function retrieveView(view){
	const container = $('#container');
	$.ajax({
		 type: "GET",
		 url: '/activities/' + view,
		 contentType: "text/plain",
		 success: function(data){
      if (data){
          container.html(data);
      }
		}
	});
}




$(document).ready(function(){
	suggested = $( ".suggested" ).draggable({
		helper:'clone'
	});

	content = $('.content');
	//drawCalendar();
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
	var htmlText = '<tr id="datebar"><td colspan=8>'+'month' + '</td></tr><tr><td class="time"></td>';

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

function loadPlan(){
	updateURL("/plan","Happify | Plan");
	retrieveView('plan')
}

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


function updateURL(url, title){
	if (history.pushState) {
  	window.history.pushState("", title, url);
	} else {
	  document.location.href = "/"+url;
		document.title = title;
	}
}

$(document).ready(function() {
});
