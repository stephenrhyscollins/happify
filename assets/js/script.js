
var container, nav;
var url = "/subscribe";
var applicationServerKey = "BEF0_P-MjVHaQKSJOxT-7LsxuuAer4IS3i3K8wi7ntdCnkvdk72y6OcCuJUIVCjOZ4TCC3Ne5GbD8gyWwuXtKns";

var swRegistration = null;
var days =["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];


$(document).ready(function(){
	container = $('main');
	nav = $('#nav');
  resize();

	var url = String(document.location);
	url = url.split("#");
	if(url.length > 1 && url[1].length > 0){populateContent(url[1], container, nav.find('#'+url[1]));}

	suggested = $( ".suggested" ).draggable({
		helper:'clone'
	});

  	$('#nav').click(loadPartial);
    $('#title').click(toggleMenu);
    //setupLinks();
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
      if(status=="granted"){
				console.log(status);
			}
		});
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then(function(reg){
        navigator.serviceWorker.ready.then(function(reg){
	          if(checkPushNotificationSupport(reg) && !isSubscribed(reg)){
	            subscribe(reg);
	          };
        });
    });
	});

function loadPartial(e){
    //check the user clicked an item in the list not just the list
    if(e.target != e.currentTarget){
			populateContent(e.target.id, container, $(e.target), true);
      document.title = "Happify | " + e.target.id;
    }
	}

	function changeSelectedTab(selectedTab){
		var nav = $("#nav");
		selectedTab.parent().find(".selected").removeClass("selected");
		selectedTab.addClass('selected');
    if($(window).width() < 750){

    }
  }



function populateContent(view, container, selectedTab, push){
	$.ajax({
		 type: "GET",
		 url: '/activities/' + view,
		 contentType: "text/plain",
		 success: function(data){
      if (data){
          container.html(data);
					if(push){history.pushState(view, null, '#'+view);}
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
		populateContent(state, $('main'), nav.find('#'+state), false);
}





function toggleMenu(){
  $('main').toggleClass('full');
  $('#left').toggleClass('hidden');
  $('#menu_button').toggleClass('icon-change');
}

function resize() {
  setTimeout(function(){
    var wrapper = $('#wrapper');
    console.log((window.innerHeight-$('header').height()));
    wrapper.height((window.innerHeight-$('header').height()));
    $('body').height(window.innerHeight);
    wrapper.children().height((window.innerHeight-$('header').height()));
  } , 100);
}




function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: 'images/checkmark.png'},
          {action: 'close', title: 'Close notification',
            icon: 'images/xmark.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
};



function handleSWRegistration(reg) {
    if (reg.installing) {
        console.log('Service worker installing');
    } else if (reg.waiting) {
        console.log('Service worker installed');
    } else if (reg.active) {
        console.log('Service worker active');
    }

    return reg;
};

function checkPushNotificationSupport(reg){
  return ((reg.showNotification) && ('PushManager' in window));
}

function isSubscribed(reg){
  // We need the service worker registration to check for a subscription
  navigator.serviceWorker.ready.then(function (reg) {
    // Do we already have a push message subscription?
    reg.pushManager.getSubscription()
        .then(function (subscription) {
            return(subscription);
        })
        .catch(function (err) {
            console.log('Error during getSubscription()', err);
        });
});}

function subscribe(reg){
    var subscribeParams = {userVisibleOnly: true};
    console.log("h");
    //Setting the public key of our VAPID key pair.
    subscribeParams.applicationServerKey = urlB64ToUint8Array(applicationServerKey);
;

    reg.pushManager.subscribe(subscribeParams)
        .then(function (subscription) {
            sendSubscriptionToServer({
              endpoint  : subscription.endpoint,
              encodkey : subscription.getKey('p256dh'),
              auth : subscription.getKey('auth')
            });
        })
        .catch(function (e) {
            // A problem occurred with the subscription.
            console.log('Unable to subscribe to push.', e);
        });
      };

function sendSubscriptionToServer(subscriptionData) {
    var encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(subscriptionData.encodkey)));
    var encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(subscriptionData.auth)));
		console.log(encodedKey);
		console.log(encodedAuth);
		console.log(subscriptionData.endpoint);
    $.ajax({
        type: 'POST',
        url: '/subscribe',
        data: {publicKey: encodedKey, auth: encodedAuth, notificationEndPoint: subscriptionData.endpoint },
				dataType: 'application/json',
        success: function (response) {
            console.log('Subscribed successfully! ' + JSON.stringify(response));
        }
    });
};

  /*var fullscreen = false;
    document.documentElement.addEventListener("click", function() {
      if (fullscreen)
        document.webkitExitFullscreen();
      else
        document.documentElement.webkitRequestFullscreen();

      fullscreen = !fullscreen;
    });*/

/*function setupLinks(){
  if(("standalone" in window.navigator) && window.navigator.standalone){
    var noddy, remotes = false;
    document.addEventListener('click', function(event) {
      noddy = event.target;
      while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
        noddy = noddy.parentNode;
      }
      if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)){
        event.preventDefault();
        document.location.href = noddy.href;
      }
    },false);
  }
}*/



/*$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();x

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
};*/

function drawCalendar(date){
	/*build table data here todo*/
	var htmlText = '<tr id="datebar"><td colspan=8>'+'month' + '</td></tr><tr><td class="time"></td>';

	for(var d=0; d<7; d++){
		htmlText += '<td>' + days[d] + '</td>';
	};

	htmlText += "</tr>";

	for(var h=0; h<24;h++){
		htmlText += '<tr><td class="time">'+h+'</td>';
		for( d=0; d<7; d++){
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
};


function updateURL(url, title){
	if (history.pushState) {

			console.log('pushstate');
  	window.history.pushState("", title, url);
	} else {
		console.log('document location');
	  document.location.href = "/"+url;
		document.title = title;
	}
};




function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
