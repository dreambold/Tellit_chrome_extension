var base_url = 'http://localhost/tellit/';

chrome.contextMenus.create({
  id: "Quote",
  title: "Copy a Quote",
  contexts: ["all"]
});

// chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 25] });
// chrome.browserAction.setBadgeText({ text: '12' });
//Taking Action while cliking any of the Menu Items

// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     chrome.browserAction.setIcon({
//       path: request.newIconPath,
//       tabId: sender.tab.id
//     });
//   });

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   alert('updated from background');
// });
chrome.tabs.onActivated.addListener(function (activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function (tab) {


    var xhr = new XMLHttpRequest();
    var url = base_url + "read_comment.php";
    var data = {
      url: tab.url,
      sortby: 'recent'
    };

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var res = this.responseText;
        // console.log(Object.keys(JSON.parse(res)['tree']).length);
        if (JSON.parse(res)['nodata'] != "false") {
          chrome.browserAction.setBadgeBackgroundColor({ color: [255, 255, 0, 255] });
          chrome.browserAction.setBadgeText({ text: "0" });
        } else {
          chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 255] });
          var count = Object.keys(JSON.parse(res)['tree']).length;
          chrome.browserAction.setBadgeText({ text: count.toString() });
        }
      }
    }
    //============================event when click upvote============================
    xhr.open("POST", url, true);
    xhr.send(JSON.stringify(data));
    // chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0] });
    // chrome.browserAction.setBadgeText({ text: "AA" });
  });
});



function read_comment(current_url, sortby, ref_id) {
  // Sending and receiving data in JSON format using POST method
  var xhr = new XMLHttpRequest();
  var url = base_url + "read_comment.php";
  if (ref_id) ref_id = ref_id.replace('i', '');
  var data = {
    url: current_url,
    sortby: 'recent'
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var res = this.responseText;

      if (JSON.parse(res)['nodata'] != "false") {
        count = 0;
      }


      if (count == 0) {
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 255, 0, 255] });
        chrome.browserAction.setBadgeText({ text: count.toString() });
      } else {
        chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 255] });
        chrome.browserAction.setBadgeText({ text: count.toString() });
      }
    }
  }
  //============================event when click upvote============================

  xhr.open("POST", url, true);
  xhr.send(JSON.stringify(data));
}


//=================================================
chrome.contextMenus.onClicked.addListener(function (info, tab) {

  // function copyToClipboard(info) {
  // var tempNode = document.getElementById("temp");
  // tempNode.value = info.selectionText; // <-- Selected text
  // tempNode.select();
  document.execCommand('copy', false, null);
  var t = document.createElement("textarea");
  document.body.appendChild(t);

  t.innerHTML = info.selectionText;
  console.log(t.innerHTML);
  console.log(document.getElementsByTagName('textarea'));

  chrome.storage.sync.set({ key: info.selectionText }, function () {
    console.log('Value is set to ' + info.selectionText);
  });
});

//================Notification show==========================================

function notification_show(e) {
  var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
  var hour = time[1] % 12 || 12;               // The prettyprinted hour.
  var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
  new Notification(hour + time[2] + ' ' + period, {
    icon: 'imageinfo-48.png',
    body: e
  });
}
// ==================================================================