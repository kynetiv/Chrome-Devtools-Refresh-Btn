chrome.devtools.panels.create("Refresh",
    "refresh16.png",
    "refresh.html",
    function(panel) {
        function redirectToElementsPanel(tabId, changes, tabObject) {
            if (changes.status == "complete") {
                // remove listener so only devtools.refresh will redirect to elements tab
                chrome.tabs.onUpdated.removeListener(redirectToElementsPanel);
                // no history of devtools' devtabs, so send back to elements tab after refresh is complete
                return chrome.devtools.inspectedWindow.eval('inspect(document.body)');
            }
        }

        panel.onShown.addListener(function(window){
            // reload current page
            chrome.devtools.inspectedWindow.reload({ignoreCache: true});
            // add redirect listener
            chrome.tabs.onUpdated.addListener(redirectToElementsPanel);
        });
    }
);
