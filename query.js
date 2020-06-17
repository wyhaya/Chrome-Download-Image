

(() => {
    chrome.runtime.onMessage.addListener((value, sender, sendResponse) => {
        let list = Array.from(document.querySelectorAll('img')).map((item) => item.src)
        sendResponse(list)
    })
})()



