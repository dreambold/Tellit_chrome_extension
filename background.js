
chrome.contextMenus.create({
  id: "Quote",
  title: "Copy a Quote",
  contexts: ["all"]
});

//Taking Action while cliking any of the Menu Items
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