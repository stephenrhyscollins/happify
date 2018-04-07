
var container, nav;


var days =["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]


function loadPartial(e){
    if(e.target != e.currentTarget){
			populateContent(e.target.id, container, $(e.target), true);
      document.title = "Happify | " + e.target.id;
    }
	}

	function changeSelectedTab(selectedTab){
		var nav = $("#nav");
		selectedTab.parent().find(".selected").removeClass("selected");
		selectedTab.addClass('selected');}



function populateContent(view, container, selectedTab, push){
	$.ajax({
		 type: "GET",
		 url: '/activities/' + view,
		 contentType: "text/plain",
		 success: function(data){
      if (data){
          container.html(data);
					if(push){history.pushState(view, null, '#'+view);};
					changeSelectedTab(selectedTab);
      }
		}
	});
}


window.onpopstate = function(e){
	if(e.state){
		refreshState(e.state);
	}
};

function refreshState(state){
		populateContent(state, $('#container'), nav.find('#'+state), false);
}



$(document).ready(function(){
	container = $('#container');
	nav = $('#nav');
	var url = String(document.location);
	url = url.split("#");
	if(url.length > 1 && url[1].length > 0){populateContent(url[1], container, nav.find('#'+url[1]));};

	suggested = $( ".suggested" ).draggable({
		helper:'clone'
	});

	$('#nav').click(loadPartial);


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

			console.log('pushstate');
  	window.history.pushState("", title, url);
	} else {
		console.log('document location');
	  document.location.href = "/"+url;
		document.title = title;
	}
}
