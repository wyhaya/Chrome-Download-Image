
(() => {

    const copyContent = (text) => {
        let input = document.createElement('input')
        input.value = text
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        input.parentNode.removeChild(input)
    }
   
    chrome.tabs.query({
        active: true,
        currentWindow: true,
    }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, '123', (list) => {
            let main = document.querySelector('main')
            list.forEach((src) => {
                let div = document.createElement('div')

                let img = document.createElement('img')
                img.src = src
                div.appendChild(img)

                let popup = document.createElement('popup')

                let open = document.createElement('a')
                open.innerText = 'Open in Tab'
                open.addEventListener('click', () => {
                    chrome.tabs.create({
                        url: src,
                        selected: false
                    })
                })
                popup.appendChild(open)

                let copy = document.createElement('a')
                copy.innerText = 'Copy link'
                copy.addEventListener('click', () => {
                    copyContent(src)
                    copy.innerText = 'Copied !'
                    setTimeout(() => {
                        copy.innerText = 'Copy link'
                    }, 1000)
                })
                popup.appendChild(copy)

                let download = document.createElement('a')
                download.innerText = 'Download'
                download.href = src
                download.download = ''
                popup.appendChild(download)
                
                div.appendChild(popup)
                main.appendChild(div)
            })
        })
    })

})()