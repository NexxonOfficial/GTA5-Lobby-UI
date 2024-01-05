class Column {
    constructor(element) {
        this.element = element
    }

    SetColumnSelectable(toggle) {
        this.selectable = toggle
    }

    CreateDetailItem(leftText, rightText = "", description = null, color = null, seperator = false, closeGap = false, onClickFunction = false) {
        let detailItem = document.createElement('div')
        detailItem.classList.add('detail-item')
        
        if(color !== null) {
            if(color.includes('#')) {

            } else if (color.includes('rgba')) {
                let stripped = color.replace('rgba(', '').replace(')', '')
                detailItem.style.background = `rgba(${stripped}, 0.7)`
            } else if (color.includes('rgb')) {
                let stripped = color.replace('rgb(', '').replace(')', '')
                detailItem.style.background = `rgb(${stripped}, 0.7)`
            } else {
                detailItem.style.background = color
            }
        } else {
            detailItem.style.background = `rgb(0, 0, 0, 0.7)`
        }
        
        let left = document.createElement('div')
        left.classList.add('left')

        left.innerHTML = leftText

        let right = document.createElement('div')
        right.classList.add('right')

        right.innerHTML = rightText

        detailItem.appendChild(left)
        detailItem.appendChild(right)

        if(description !== null) {
            detailItem.dataset.description = description
        }

        if (seperator) {
            this.element.lastChild.style.marginBottom = 'unset'
            detailItem.style.marginTop = 'unset'
            detailItem.style.borderTop = '3px solid white'
            detailItem.style.paddingTop = '20px'
            detailItem.style.paddingBottom = '20px'
            detailItem.style.boxSizing = 'border-box'
        }

        if(closeGap) {
            this.element.lastChild.style.marginBottom = 'unset'
            detailItem.style.marginTop = 'unset'
        }

        if(onClickFunction) {
            detailItem.dataset.clickable = true
        }

        this.element.appendChild(detailItem)

        return detailItem
    }

    CreatePlayerItem(name, level = null, statusText = null, statusColor = null, crewTag = null, color = null, onClickFunction = null) {
        if(name.length > 24) {
            throw new Error(`Player name cannot exceed 24 character length. This is simply due to the menu's styling beginning to break if you go over this count. Player name that caused the exception: ${name}`)
        }

        if(statusText !== null && statusText.length > 12) {
            throw new Error(`Status text cannot exceed 12 character length. This is simply due to the menu's styling beginning to break if you go over this count. Status text that caused the exception: ${statusText}`)
        }
        
        let playerItem = document.createElement('div')
        playerItem.classList.add('player-item')
        
        if(color !== null) {
            if(color.includes('#')) {

            } else if (color.includes('rgba')) {
                let stripped = color.replace('rgba(', '').replace(')', '')
                playerItem.style.background = `rgba(${stripped}, 0.5)`
            } else if (color.includes('rgb')) {
                let stripped = color.replace('rgb(', '').replace(')', '')
                playerItem.style.background = `rgb(${stripped}, 0.5)`
            } else {
                playerItem.style.background = color
            }
        } else {
            playerItem.style.background = `rgb(0, 0, 0, 0.7)`
        }

        if(level !== null) {
            if(typeof level !== 'number') throw new Error(`Level was not a Number. Please ensure that the parameter for level is a Number. Level that caused the exception: ${level}`)
            let globeBelow = document.createElement('div')
            globeBelow.classList.add('globe')
            globeBelow.style.background = 'url(img/levelglobe_bg.png)'
            globeBelow.style.backgroundPosition = 'center'
            globeBelow.style.backgroundSize = 'cover'
            
            let globeText = document.createElement('p')
            globeText.classList.add('level-text')
            globeText.innerHTML = level

            switch(level.toString().length) {
                case 1:
                    globeText.style.fontSize = `2.2rem`
                    break
                case 2:
                    break
                case 3:
                    globeText.style.fontSize = `1.7rem`
                    break
                case 4:
                    globeText.style.fontSize = `1.4rem`
                    break
                default: throw new Error(`Level number cannot exceed 4 digits in length. This is due to the method having styling conditions on the number of digits this level number has. Level that caused the exception: ${level}`);
            }

            globeBelow.appendChild(globeText)

            playerItem.insertBefore(globeBelow, playerItem.firstChild)
        }   

        if(statusText !== null) {
            let statusTextEl = document.createElement('p')
            statusTextEl.classList.add('status-text')
            statusTextEl.innerHTML = statusText
            statusTextEl.style.backgroundColor = statusColor

            playerItem.insertBefore(statusTextEl, playerItem.firstChild)
        }

        if(crewTag !== null) {
            let crewTagEl = document.createElement('div')
            crewTagEl.classList.add('crew-tag')
            crewTagEl.innerHTML = crewTag

            playerItem.insertBefore(crewTagEl, playerItem.firstChild)
        }

        let playerName = document.createElement('p')
        playerName.classList.add('player-name')
        playerName.innerHTML = name

        if(crewTag !== null) {
            playerName.style.marginRight = 'unset'
        }

        if(onClickFunction !== null) {
            playerItem.setAttribute('onclick', onClickFunction)
        }

        playerItem.insertBefore(playerName, playerItem.firstChild)

        this.element.appendChild(playerItem)
        return playerItem
    }

    CreateDetailImageItem(imgSource, title = null) {
        let detailImageItem = document.createElement('div')
        detailImageItem.classList.add('detail-image-item')
        detailImageItem.style.background = `url(${imgSource})`
        detailImageItem.style.backgroundPosition = 'center'
        detailImageItem.style.backgroundSize = 'cover'

        if(title !== null) {
            let detailImageTitle = document.createElement('p')
            detailImageTitle.classList.add('detail-image-item-title')
            detailImageTitle.innerHTML = title

            detailImageItem.appendChild(detailImageTitle)
        }

        this.element.insertBefore(detailImageItem, this.element.secondChild)
        return detailImageItem
    }
}