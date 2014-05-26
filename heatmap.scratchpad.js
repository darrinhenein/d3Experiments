// Elements.

'use strict';

var elements = [
  'add-ons-button',
  'alltabs-button',
  'back-button',
  'bookmarks-menu-button',
  'characterencoding-button',
  'copy-button',
  'cut-button',
  'developer-button',
  'downloads-button',
  'e10s-button',
  'email-link-button',
  'feed-button',
  'find-button',
  'forward-button',
  'fullscreen-button',
  'home-button',
  'menu-button-button',
  'new-tab-button',
  'new-window-button',
  'open-file-button',
  'paste-button',
  'preferences-button',
  'print-button',
  'privatebrowsing-button',
  'save-page-button',
  'sidebar-button',
  'social-share-button',
  'sync-button',
  'tabsclose-button',
  'tabview-button',
  'urlbar-go-button',
  'urlbar-reload-button',
  'urlbar-stop-button',
  'webrtc-status-button',
  'zoom-in-button',
  'zoom-out-button',
  'zoom-reset-button',

  'BMB_bookmarksPopup',
  'BMB_bookmarksToolbarPopup',
  'BMB_unsortedBookmarksPopup',
  'bookmarks-bar-chevron',
  'bookmarks-bar-container',
  'bookmarks-bar-item',
  'bookmarks-bar-overflowed-item',
  'edit-controls',
  'history-panelmenu',
  'menubar-items',
  'menubar-menu',
  'menubar-menuitem',
  'menubar-other',
  'nav-bar',
  'PanelUI-contents',
  'PanelUI-menu-button',
  'personal-bookmarks',
  'PersonalToolbar',
  'PlacesChevron',
  'PlacesToolbarItems',
  'searchbar',
  'search-container',
  'tabbrowser-tabs',
  'TabsToolbar',
  'toolbar-menubar',
  'urlbar-container',
  'zoom-controls'
];

// Get the browser into the right mode.
const STATE_START = Ci.nsIWebProgressListener.STATE_START;
const STATE_STOP = Ci.nsIWebProgressListener.STATE_STOP;
var myListener = {
    QueryInterface: XPCOMUtils.generateQI(['nsIWebProgressListener',
                                           'nsISupportsWeakReference']),
    onLocationChange: function(aProgress, aRequest, aURI) {
      if (aURI.spec === 'about:customizing') {
        setTimeout(function () {
          window.content.location = 'about:config';
        }, 1000);
      } else if (aURI.spec === 'about:config') {
        setTimeout(function () {
          gBrowser.removeProgressListener(myListener);
          window.content.back();
        }, 1000);
      }
      return true;
    }
};

// Get the browser into the right mode.
gBrowser.addProgressListener(myListener);
window.content.location = 'about:customizing';

var locs = 'id,x,y,width,height\n';

elements.forEach(i => {
  let element = document.getElementById(i);
  if (element) {
    let bounds = element.getBoundingClientRect();
    locs += i + ',' + bounds.x + ',' + bounds.y + ',' + bounds.width + ',' + bounds.height + '\n';
  } else {
    locs += i + ',-1,-1,0,0\n';
  }
});
console.log(locs);
