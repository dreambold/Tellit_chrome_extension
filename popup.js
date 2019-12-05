var base_url = 'http://localhost/tellit/';

var dt = new Date();
var time = dt.getHours();
try {
	document.querySelector(".emoji-wysiwyg-editor").focus();
} catch (err) {
	setTimeout(function () {
		try {
			document.querySelector(".emoji-wysiwyg-editor").focus();
		} catch (err) {
			setTimeout(function () {
				try {
					document.querySelector(".emoji-wysiwyg-editor").focus();
				} catch (err) {
					console.log("There was an error while focusing the comment box : " + err);
				}
			}, 500);
		}
	}, 500);
}
//=========================================================================
var sortby;
var tab;
var activeTabUrl;
var show_reply = true;

//=======================Domcontent Loaded============================
document.addEventListener('DOMContentLoaded', function () {

	//========================Paste from Context menu copy========
	chrome.storage.sync.get(['key'], function (result) {
		if (typeof result.key !== undefined && result.key != null)
			document.querySelector('.emoji-wysiwyg-editor').innerHTML = '\"' + result.key + '\"' + '  ';
	});

	chrome.storage.local.clear(function () {
		var error = chrome.runtime.lastError;
		if (error) {
			console.error(error);
		}
	});
	// Close the dropdown if the user clicks outside of it
	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			for (var i = 0; i < dropdowns.length; i++) {
				var openDropdown = dropdowns[i];
				if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				}
			}
		}
	}

	//=========================Sort Comments=========================================
	$('#sort_by').click(function () {
		document.getElementById("dropdown").classList.toggle("show");
	});
	$('#by_upvote').click(function () {
		sort_comments('upvote');
	});
	$('#by_recent').click(function () {
		sort_comments('recent');
	});
	$('#by_comment').click(function () {
		sort_comments('comment');
	});

	function sort_comments(sortby) {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			tab = (tabs.length === 0 ? tabs : tabs[0]);
			activeTabUrl = tab.url;
			read_comment(activeTabUrl, sortby);
		});
	}

	$("#username").val(localStorage.getItem('username'));
	$("#newcomment").val(localStorage.getItem('newcomment'));

	// SET DAY/NIGHT MODE
	(time >= 7 && time < 19) ? daymode() : nightmode();
	// POST COMMENT
	document.getElementById('post').addEventListener('click', clicked);

	try {
		document.querySelector(".emoji-wysiwyg-editor").addEventListener('keypress', function (e) {
			if (e.keyCode == 13) {
				clicked();
			}
		});
	} catch (err) {
		setTimeout(function () {
			try {
				document.querySelector(".emoji-wysiwyg-editor").addEventListener('keypress', function (e) {
					if (e.keyCode == 13) {
						clicked();
					}
				});
			} catch (err) {
				setTimeout(function () {
					try {
						document.querySelector(".emoji-wysiwyg-editor").addEventListener('keypress', function (e) {
							if (e.keyCode == 13) {
								clicked();
							}
						});
					} catch (err) {
						console.log("There was an error while adding the Event Listener : " + err);
					}
				}, 500);
			}
		}, 500);
	}

	//======================resize popup=======================================
	var staticOffset = null;
	var textarea = $('#comment_history');
	$('.grippie').mousedown(startDrag);
	function startDrag(e) {
		staticOffset = textarea.height() - e.pageY;
		textarea.css('opacity', 0.25);
		$(document).mousemove(performDrag).mouseup(endDrag);
		return false;
	}
	function performDrag(e) {
		textarea.height(Math.max(10, staticOffset + e.pageY) + 'px');
		return false;
	}
	function endDrag(e) {
		$(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
		textarea.css('opacity', 1);
	}

	//=========================Show ads clicked=====================================
	$('#img_top, #show_text_top').click(function () {
		showAd('top');
	});
	$('#img, #show_text').click(function () {
		showAd('bottom');
	});

	//=========================Color Mode Change===================================
	$("#col1, #col2, #col3").click(function (event) {
		set_color(event);
	})
	//==================================emojiPicker===============================================
	emojiPicker = new EmojiPicker({
		emojiable_selector: '[data-emojiable=true]',
		assetsPath: 'lib/img/',
		popupButtonClasses: 'fa fa-smile-o'
	});
	emojiPicker.discover();

	//===================================tips bulb=========================
	$('#tips_handle').click(function () {
		show_tips();
	});

	var tips_flag = true;
	function show_tips() {
		(tips_flag == true) ? $('#tips').css('display', 'block') : $('#tips').css('display', 'none');
		tips_flag = !tips_flag;
	}
	//====================Readmore button after newcomment added=====================================

	$("div").on("click", "span.input_more", function () {
		readMore(event);
	});

	//==================user=====================
	var username = 'user' + Math.floor((Math.random() * 1000000) + 1);
	if (typeof localStorage.getItem('username') === 'null') {
		localStorage.setItem('username', username);
	}
	sort_comments('recent');
});

//==========================Save Unposted Comment==============================

try {
	document.querySelector(".emoji-wysiwyg-editor").addEventListener('keypress', function (e) {
		var unpostedcomment = document.querySelector(".emoji-wysiwyg-editor").innerHTML;
		localStorage.setItem('newcomment', unpostedcomment);
	});
} catch (err) {
	setTimeout(function () {
		try {
			document.querySelector(".emoji-wysiwyg-editor").addEventListener('keypress', function (e) {
				var unpostedcomment = document.querySelector(".emoji-wysiwyg-editor").innerHTML;
				localStorage.setItem('newcomment', unpostedcomment);
			});
		} catch (err) {
			setTimeout(function () {
				try {
					document.querySelector(".emoji-wysiwyg-editor").addEventListener('keypress', function (e) {
						var unpostedcomment = document.querySelector(".emoji-wysiwyg-editor").innerHTML;
						localStorage.setItem('newcomment', unpostedcomment);
					});
				} catch (err) {
					console.log("There was an error while saving the unposted comment : " + err);
				}
			}, 500);
		}
	}, 500);
}

//========================================================================
//==========================after clicked post==============================
function clicked(e) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		tab = (tabs.length === 0 ? tabs : tabs[0]);
		activeTabUrl = tab.url;
		var newcomment = document.getElementById('newcomment').value;
		var username = document.getElementById('username').value;
		if (newcomment != '') {
			if (username == '') {
				username = "Anonymous";
			}
			username == "Anonymous" ? localStorage.setItem('username', "") : localStorage.setItem('username', username);

			send_request(activeTabUrl, newcomment, username);
		}
	});
	$('#first_comment').html('');
	localStorage.setItem('newcomment', "")
}

//=======================add new comment to server====================================

function send_request(current_url, newcomment, username, ref_id) {
	// Sending and receiving data in JSON format using POST method
	var xhr = new XMLHttpRequest();
	var url = base_url + "add_comment.php";
	newcomment = newcomment.replace(/\"/g, '\\"');
	var bgImg;
	if (document.body.style.backgroundImage == "url('images/troll_back.png')") {
		bgImg = "url('images/troll_back.png')";
	}
	var data = {
		url: current_url,
		comment: newcomment,
		username: username,
		ref_id: ref_id,
		bg_img: bgImg
	};
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			chrome.storage.local.clear(function () {
				var error = chrome.runtime.lastError;
				if (error) {
					console.error(error);
				}
			});
		}
	};
	xhr.open("POST", url, true);
	xhr.send(JSON.stringify(data));

	var str1 = "<div class='comment_history' ";
	if (newcomment.length > 25) {
		var newcommen2 = newcomment.substr(0, 25);
		str1 += "<span class='readmore_bold'>" + newcommen2 + "</span>" +
			"<span class='readless_bold' style='display:none;'>" + newcomment + "</span>" + "...&nbsp;&nbsp;" +
			"<span style='color: blue; border:solid blue 1px; cursor: pointer;' class='read_more input_more'>Read More </span>";
	} else {
		str1 += "<span>" + newcomment + "</span>";
	}
	str1 += "<div class='vote_div'>" +
		"<img class='upvote' src='images/upvote.png'>" +
		"<i class='upvote_num'>" + 0 + "</i>" +
		"<img class='downvote' src='images/downvote.png'>" +
		"<i class='downvote_num'>" + 0 + "</i>" +
		"<i style='color:#d9534f;'>" + "&nbsp&nbsp&nbsp" + username + "</i>" +
		share_link + "</div></div>";
	// add comments
	if (!ref_id) {
		$('#comment_history').append(str1);
	}
	// Check if Troll mode
	if (document.body.style.backgroundImage == "url('images/troll_back.png')") { }
	// CONTROL SCROLL to the bottom position
	var element = document.getElementById('comment_history');
	element.scrollTop = element.scrollHeight - element.clientHeight;

	$('.emoji-wysiwyg-editor').html('');
	$('#username').val('');

	// Delete reply area 
	$('.replyarea').remove();
}


//=========================Read comment from Server========================================
var share_link = '';

var comment_count = 0;

function read_comment(current_url, sortby, ref_id) {
	// Sending and receiving data in JSON format using POST method
	var xhr = new XMLHttpRequest();
	var url = base_url + "read_comment.php";
	if (ref_id) ref_id = ref_id.replace('i', '');
	var data = {
		url: current_url,
		sortby: sortby,
		ref_id: ref_id
	};

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(JSON.parse(this.responseText));
			var res = this.responseText;
			var str = '';

			if (!ref_id) {
				$("#comment_history").html('');
				if (JSON.parse(res)['nodata'] == "false") {
					var comment = JSON.parse(res)['comment'];
					var username = JSON.parse(res)['username'];
					var id = JSON.parse(res)['id'];
					var upvote = JSON.parse(res)['upvote'];
					var downvote = JSON.parse(res)['downvote'];
					var tree = JSON.parse(res)['tree'];
					var child = JSON.parse(res)['child'];

					if (typeof child !== 'undefined') console.log(child);

					var count = tree.length;
					(count != 0) ? $('.fa-warning').css("display", "none") : $('.fa-warning').css("display", "block");

					for (var i = 0; i < count; i++) {
						share_link = '<div class="navbar">' +
							'<div class="dropdown_share">' +
							'<i class="fa fa-share" style="font-size:13px"></i>' +
							'<div class="dropdown-content_share">' +
							'<a href="https://www.google.com" target="_blank">' +
							'<i class="fa fa-globe" style="color:darksalmon; "></i>' +
							'</a>' +
							'<a href="https://www.youtube.com" target="_blank">' +
							'<i class="fa fa-youtube" style="color:darksalmon "></i>' +
							'</a>' +
							'<a href="https://www.twitter.com" target="_blank">' +
							'<i class="fa fa-twitter" style="color:darksalmon "></i>' +
							'</a>' +
							'<a href="https://www.facebook.com" target="_blank">' +
							'<i class="fa fa-facebook" style="color:darksalmon "></i>' +
							'</a>' +
							'<a href="https://www.github.com" target="_blank">' +
							'<i class="fa fa-github" style="color:darksalmon "></i>' +
							'</a>' +
							'</div>' +
							'</div>' +
							'</div>';
						var ii = tree[i].id;
						tree[i].children != null ? viewReplies = "ViewReplies" : viewReplies = "";

						if (upvote[ii] > 0) {
							if (comment[ii].length > 25) {
								var commen1 = comment[ii].substr(0, 25);

								str += "<div class='comment_history' id='i" + id[ii] + "'>" +
									"<i style='color:#d9534f;'>" + "&nbsp" + username[ii] + "</i><br/>" +
									"<b class='readmore_bold'>" + commen1 + "</b>" +
									"<b class='readless_bold' style='display:none;'>" + comment[ii] + "</b>...&nbsp;&nbsp;" +
									"<span style='border:solid 1px; cursor: pointer;' class='read_more'>Read More </span>";
							} else {
								str += "<div class='comment_history' id='i" + id[ii] + "'>" +
									"<i style = 'color:#d9534f;'>" + "&nbsp&nbsp&nbsp" + username[ii] + "</i><br/>" +
									"<b>" + comment[ii] + "</b>";
							}
						}
						else if (upvote[ii] == 0) {
							if (comment[ii].length > 25) {
								var commen2 = comment[ii].substr(0, 25);
								str += "<div class='comment_history' id='i" + id[ii] + "'>" +
									" <i style='color:#d9534f;'>" + "&nbsp&nbsp&nbsp" + username[ii] + "</i><br/>" +
									"<span class='readmore_bold'>" + commen2 + "</span><span class='readless_bold' style='display:none;'>" + comment[ii] + "</span>" +
									"...&nbsp;&nbsp;" +
									"<span style='border:solid 1px; cursor: pointer;' class='read_more'>Read More </span>";
							} else {
								str += "<div class='comment_history' id='i" + id[ii] + "'>" +
									" <i style = 'color:#d9534f;'>" + "&nbsp&nbsp&nbsp" + username[ii] + "</i><br/>" +
									"<span>" + comment[ii] + "</span>";
							}
						}
						str += "<div class='vote_div'>" +
							" 	<img class='upvote' name='" + id[ii] + "' src='images/upvote.png'>" +
							" 	<i class='upvote_num'>" + upvote[ii] + "</i>" +
							" 	<img name='" + id[ii] + "' class='downvote' src='images/downvote.png'>" +
							" 	<i class='downvote_num'>" + downvote[ii] + "</i>" +
							" 	<a class='reply' id='i" + id[ii] + "'>&nbsp;&nbsp; Reply</a>" +
							share_link +
							"</div>" +
							"<a class='view-replies' id='i" + ii + "'>" + viewReplies + "</a></div>";
					}
				}
				else {
					count = 0;
					str = "<h2 id='first_comment'>" + "Be the first comment!" + "</h2>";
				}

				$('#comment_history').append(str);
			}
			else {
				str = '<div style="padding-left: 20px">';
				if (JSON.parse(res)['nodata'] == "false") {
					comment = JSON.parse(res)['comment'];
					username = JSON.parse(res)['username'];
					id = JSON.parse(res)['id'];
					upvote = JSON.parse(res)['upvote'];
					downvote = JSON.parse(res)['downvote'];
					tree = JSON.parse(res)['tree'];
					child = JSON.parse(res)['child'];

					if (typeof child !== 'undefined') console.log(child);

					// var count = tree.length;
					// (count != 0) ? $('.fa-warning').css("display", "none") : $('.fa-warning').css("display", "block");
					console.log(Object.keys(username));
					var len = Object.keys(username).length;
					for (var j = 0; j < len; j++) {
						ii = Object.keys(comment)[j];
						// var j = tree[i].id;
						// tree[i].children != null ? viewReplies = "ViewReplies" : viewReplies = "";

						if (upvote[ii] > 0) {
							if (comment[ii].length > 25) {
								commen1 = comment[ii].substr(0, 25);

								str += "<div class='' id='i" + id[ii] + "'>" +
									"<i style='color:#d9534f;'>" + "&nbsp" + username[ii] + "</i> ::  " +
									"<b class='readmore_bold'>" + commen1 + "</b>" +
									"<b class='readless_bold' style='display:none;'>" + comment[ii] + "</b>...&nbsp;&nbsp;" +
									"<span style='border:solid 1px; cursor: pointer;' class='read_more'>Read More </span>";
							} else {
								str += "<div class='' id='i" + id[ii] + "'>" +
									"<i style = 'color:#d9534f;'>" + "&nbsp&nbsp&nbsp" + username[ii] + "</i> ::  " +
									"<b>" + comment[ii] + "</b>";
							}
						}
						else if (upvote[ii] == 0) {
							if (comment[ii].length > 25) {
								var commen2 = comment[ii].substr(0, 25);
								str += "<div class='' id='i" + id[ii] + "'>" +
									" <i style='color:#d9534f;'>" + "&nbsp&nbsp&nbsp" + username[ii] + "</i> ::  " +
									"<span class='readmore_bold'>" + commen2 + "</span><span class='readless_bold' style='display:none;'>" + comment[ii] + "</span>" +
									"...&nbsp;&nbsp;" +
									"<span style='border:solid 1px; cursor: pointer;' class='read_more'>Read More </span>";
							} else {
								str += "<div class='' id='i" + id[ii] + "'>" +
									" <i style = 'color:#d9534f;'>" + "&nbsp&nbsp&nbsp" + username[ii] + "</i> ::  " +
									"<span>" + comment[ii] + "</span>";
							}
						}

						tree != null ? viewReplies = "ViewReplies" : viewReplies = "";
						str += "<div class='vote_div'>" +
							" 	<img class='upvote' name='" + id[ii] + "' src='images/upvote.png'>" +
							" 	<i class='upvote_num'>" + upvote[ii] + "</i>" +
							" 	<img name='" + id[ii] + "' class='downvote' src='images/downvote.png'>" +
							" 	<i class='downvote_num'>" + downvote[ii] + "</i>" +
							" 	<a class='reply' id='i" + id[ii] + "'>&nbsp;&nbsp; Reply</a>" +
							"</div>" +
							"<a class='view-replies' id='i" + j + "'>" + viewReplies + "</a></div>";
					}
				}

				ref_id = '#i' + ref_id;
				$(ref_id).append(str + "</div>");
			}



			// ========================ADD VIEW REPLIES FUNCTION=====================
			$('.view-replies').click(function () {
				getReplies($(this).attr('id'));
			});
			//==========================ADD EVENTS TO NEW ELEMENTS=========================
			var element = document.getElementById('comment_history');
			element.scrollTop = element.scrollHeight - element.clientHeight;
			//==========================append counter number==================================
			$(".counter").empty();
			$(".counter").append(count);
			//============================event when click upvote============================
			$('.upvote').click(function (event) {
				click_vote(event, 'true');
			});
			//============================event when click downvote===========================
			$('.downvote').click(function (event) {
				click_vote(event, 'false');
			});
			//============================event when click readmore============================
			$('.read_more').click(function (event) {
				readMore(event);
			});
			//===================================================================================
			$(".reply").click(function (event) {
				// $('.replyarea').remove();
				if ($(this).parent().parent().has('.replyarea').length == 1) $('.replyarea').remove();
				// if (show_reply) {
				// if ($('.replyarea').length > 0) $('.replyarea').remove();
				else $(this).parent().after("<div class='replyarea'><textarea id='new_reply' style='background: transparent; width: 90%;'></textarea>  <a class='submit_reply' title='Submit'><i class=' fa fa-send-o'></i></a></div>");
				// }


				// SET DAY/NIGHT MODE
				(time >= 7 && time < 19) ? $("#new_reply").css('color', 'black') : $("#new_reply").css('color', 'red');

				// show_reply = !show_reply;
				$('.submit_reply').click(function () {
					var ref_id = $(this).parent().parent().attr('id').replace('i', '');
					console.log(ref_id)

					chrome.tabs.query({
						active: true,
						currentWindow: true
					}, function (tabs) {
						tab = (tabs.length === 0 ? tabs : tabs[0]);
						activeTabUrl = tab.url;
						var newcomment = $('#new_reply').val();
						var username = $('#username').val();
						if (newcomment != '') {
							if (username == '') {
								username = "Anonymous";
							}
							username == "Anonymous" ? localStorage.setItem('username', "") : localStorage.setItem('username', username);
							send_request(activeTabUrl, newcomment, username, ref_id);
						}
					});
					$('#first_comment').html('');
					localStorage.setItem('newcomment', "")
				});

			});
			//==========================drop down share link===============================
			$('.dropbtn_share').click(function (event) {
				var share_link_id = event.target.parentElement.children[1].id;
				document.getElementById(share_link_id).display('none');
			});
		}
	};
	xhr.open("POST", url, true);
	xhr.send(JSON.stringify(data));
}
//==============================Get Replies============================
function getReplies(ref_id) {
	read_comment(activeTabUrl, '', ref_id);
}

//==============================Handle vote==============================================
function click_vote(event, vote) {
	var nam = localStorage.getItem('username');
	var activeTabUrl;
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function (tabs) {
		var tab = (tabs.length === 0 ? tabs : tabs[0]);
		activeTabUrl = tab.url;
	});

	var xhr = new XMLHttpRequest();
	var url = base_url + "vote.php";
	var data = {
		id: event.target.name,
		vote: vote,
		name: nam
	};

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			var xhrResult = xhr.response;
			if (xhrResult == 'yes') {
				if (vote == 'true') {
					var currentValue = event.target.parentNode.children[1].innerHTML;
					event.target.parentNode.children[1].innerHTML = parseInt(currentValue) + 1;
					console.log(event.target.parentNode.text);
				} else {
					var currentValue = event.target.parentNode.children[3].innerHTML;
					event.target.parentNode.children[3].innerHTML = parseInt(currentValue) + 1;
				}
			}
		}
	};
	xhr.open("POST", url, true);
	xhr.send(JSON.stringify(data));
}
//==========================Advertise image click event=====================================
var show_ad_flag = true, show_ad_flag_top = true;
function showAd(pos) {
	var deg, imgId, textId, sourceId;
	if (pos == 'top') {
		imgId = 'img_top';
		textId = "show_text_top";
		sourceId = "source_img_top";
		show_ad_flag_top = !show_ad_flag_top;
	} else {
		imgId = 'img';
		textId = "show_text";
		sourceId = "source_img";
		show_ad_flag = !show_ad_flag;
	}
	var img = document.getElementById(imgId);
	if (!show_ad_flag && pos == "bottom") {
		document.getElementById(textId).innerHTML = 'Hide Advertisment';
		document.getElementById(sourceId).style.display = 'block';
		deg = -90;
	} else if (pos == "bottom") {
		document.getElementById(textId).innerHTML = 'Show Advertisment';
		document.getElementById(sourceId).style.display = 'none';
		deg = 0;
	}
	if (!show_ad_flag_top && pos == "top") {
		document.getElementById(textId).innerHTML = 'Hide Advertisment';
		document.getElementById(sourceId).style.display = 'block';
		deg = -90;
	} else if (pos == "top") {
		document.getElementById(textId).innerHTML = 'Show Advertisment';
		document.getElementById(sourceId).style.display = 'none';
		deg = 0;
	}
	img.style.webkitTransform = 'rotate(' + deg + 'deg)';
	img.style.mozTransform = 'rotate(' + deg + 'deg)';
	img.style.msTransform = 'rotate(' + deg + 'deg)';
	img.style.oTransform = 'rotate(' + deg + 'deg)';
	img.style.transform = 'rotate(' + deg + 'deg)';


}


//==============================color mode =======================================
var styleElement = document.createElement("style");

function set_color(e) {
	var set_color = e.target.id;
	switch (set_color) {
		case "col1":
			daymode();
			break;
		case "col2":
			trollmode();
			break;
		case "col3":
			nightmode();
			break;
		default:
	}
	document.getElementsByTagName("head")[0].appendChild(styleElement);
}

//====================================Handle Readmore================================
var readMoreFlag = true;
function readMore(event) {
	if (readMoreFlag) {
		event.target.innerHTML = "Read Less";
		event.target.parentNode.children[1].style.display = 'inline';
		event.target.parentNode.children[0].style.display = 'none';
	} else {
		event.target.innerHTML = "Read More";
		event.target.parentNode.children[1].style.display = 'none';
		event.target.parentNode.children[0].style.display = 'inline';
	}
	readMoreFlag = !readMoreFlag;
}

// ======================Change Theme=======================
function daymode() {
	document.body.style.backgroundImage = "";
	$(".addclass").css("border-bottom-color", "black");
	$("body, #newcomment, .emoji-wysiwyg-editor, #username, .dropbtn, #post").css("border-color", "black");
	$("body, #post, #newcomment, #username, .dropbtn, .dropdown-content").css("background-color", "white");
	$("body, #username,#post, .emoji-wysiwyg-editor, .dropbtn, .dropdown-content, #new_reply").css("color", "black");
	$("#mask").css("background-color", "rgb(105, 45, 45, 0)");
	$(".header_devider").css("background-color", "black");
	$(".dropdown-content").css("border-color", "white");
	$(".dropdown-content").find("button").css({ "background-color": "white", "color": "black", "border": "none" });
	styleElement.appendChild(document.createTextNode("div ::-webkit-scrollbar{width:9px;} div::-webkit-scrollbar-track {box - shadow: inset 0 0 5px grey; border-radius: 5px;} div ::-webkit-scrollbar-thumb {background: grey;border-radius: 5px;} div::-webkit-scrollbar-thumb:hover {background: grey;} "));
	document.getElementsByClassName('tellit_img')[0].src = "images/tellit.png";
	document.getElementsByClassName('tellit_img')[1].src = "images/tellit.png";
}

function trollmode() {
	document.body.style.backgroundColor = "#2c4600";
	document.body.style.backgroundImage = "url('images/troll_back.png')";
	if (time >= 7 && time < 19) {
		$("#mask").css("background-color", "rgb(44, 70, 0, 0.8)");
		// $('.mask').css("background-color", "rbg(44, 70, 0, 0.7)");
	} else {
		$("#mask").css("background-color", "rgb(105, 45, 45, 0.8)");
		// $('#mask').css("background-color", "rbg(55, 70, 19, 0.7)");
	}
	document.body.style.bordercolor = "#ffffff";
	$(".addclass").css("border-bottom-color", "#ffffff");
	$("#newcomment").css("border-color", "#ffffff");
	$("#newcomment").css("background-color", "#2c4600");
	$("#post").css("border-color", "#ffffff");
	$("#newcomment").css("color", "#ffffff");
	$(".emoji-wysiwyg-editor").css("border-color", "#ffffff");
	$("#username").css("background-color", "rgb(44, 70, 0, 0)");
	$("#username").css("border-color", "#ffffff");
	$("#username, #new_reply").css("color", "#ffffff");
	$(".emoji-wysiwyg-editor").css("color", "#ffffff");
	$(".emoji-items-wrap1").css("background", "#2c4600");
	$(".header_devider").css("background-color", "#fff");
	$(".read_more").css("color", "black");
	$(".dropbtn").css("background", "transparent");
	$(".dropbtn").css("border-color", "black");
	$(".dropbtn").css("color", "white");
	$(".dropbtn").css("opacity", "0.8");
	$(".dropdown-content").css("background-color", "rgb(131, 86, 85)");
	$(".dropdown-content").css("color", "black");
	$(".dropdown-content").css("border-color", "white");
	$(".dropdown-content").find("button").css("background", "rgb(131, 86, 85)");
	$(".dropdown-content").find("button").css("color", "white");
	$(".dropdown-content").find("button").css("border", "none");
	$(".dropdown-content").find("button").css("opacity", "0.8");
	styleElement.appendChild(document.createTextNode("div ::-webkit-scrollbar{width:9px;} div::-webkit-scrollbar-track {box - shadow: inset 0 0 5px white; border-radius: 5px;} div ::-webkit-scrollbar-thumb {background: #ffffff;border-radius: 5px;} div::-webkit-scrollbar-thumb:hover {background: #ffffff;} "));
	document.getElementById('post').style.backgroundColor = "rgb(44, 70, 0, 0)";
	document.getElementById('post').style.color = "#ffffff";
	document.body.style.color = "#ffffff";
	document.getElementsByClassName('tellit_img')[0].src = "images/tellit.png";
	document.getElementsByClassName('tellit_img')[1].src = "images/tellit.png";
}

function nightmode() {
	document.body.style.backgroundImage = "";
	document.body.style.backgroundColor = "black";
	document.body.style.bordercolor = "#d9534f";
	$(".addclass").css("border-bottom-color", "#d9534f");
	$("#newcomment").css("border-color", "#d9534f");
	$("#newcomment").css("background-color", "black");
	$("#post").css("border-color", "#d9534f");
	$("#post").css("background-color", "black");
	$("#newcomment").css("color", "#d9534f");
	$(".emoji-wysiwyg-editor").css("border-color", "#d9534f");
	$("#username").css("background-color", "black");
	$("#username").css("border-color", "#d9534f");
	$("#username").css("color", "#d9534f");
	$(".emoji-wysiwyg-editor").css("color", "#d9534f");
	$(".emoji-items-wrap1").css("background", "black");
	$(".header_devider").css("background-color", "#d9534f");
	$(".dropbtn").css("background-color", "black");
	$(".dropbtn").css("border-color", "#d9534f");
	$(".dropbtn").css("color", "#d9534f");
	$(".dropdown-content").css("background-color", "black");
	$(".dropdown-content").css("color", "#d9534f");
	$(".dropdown-content").css("border-color", "#d9534f");
	$(".dropdown-content").find("button").css("background-color", "black");
	$(".dropdown-content").find("button").css("color", "#d9534f");
	$(".dropdown-content").find("button").css("border", "none4f");
	$("#new_reply").css('color', 'red');
	styleElement.appendChild(document.createTextNode("div ::-webkit-scrollbar{width:9px;} div::-webkit-scrollbar-track {box - shadow: inset 0 0 5px #d9534f; border-radius: 5px;} div ::-webkit-scrollbar-thumb {background: #d9534f;border-radius: 5px;} div::-webkit-scrollbar-thumb:hover {background: #d9534f;} "));
	document.getElementById('post').style.color = "#d9534f";
	document.body.style.color = "#d9534f";
	$("#mask").css("background-color", "rgb(105, 45, 45, 0)");
	document.getElementsByClassName('tellit_img')[0].src = "images/tellit_inverted.png";
	document.getElementsByClassName('tellit_img')[1].src = "images/tellit_inverted.png";
}
