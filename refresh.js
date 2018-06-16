chrome.devtools.panels.create("Refresh",
    "refresh16.png",
    "refresh.html",
    function(panel) {
        panel.onShown.addListener(function(window){

            // reload current page
            chrome.devtools.inspectedWindow.reload({ignoreCache: true});

            chrome.tabs.onUpdated.addListener(function (tabId, changes, tabObject) {
                if (changes.status == "complete") {
                    // no history of devtools' devtabs, so send back to elements tab after refresh is complete
                    chrome.devtools.inspectedWindow.eval('inspect(document.body)')
                }
            });
        });
    }gi
);
