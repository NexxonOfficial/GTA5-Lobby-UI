window.onload = () => {
    let UIShowing = null

    function dummy() {

    }

    window.addEventListener('message', (event) => {
        switch(event.data.type) {
            case 'controlpress':
                HandleControlPress(event.data.control)
                break
            case 'baseCreate':
                HandleBaseCreate(1)
                break
            case 'createTitleAndSubtitle':
                HandleBaseTitleAndSubtitleCreate(event.data.title, event.data.subtitle)
                break
            case 'createColumn':
                HandleColumnCreation(event.data.headername)
                break
            case 'createDetailItem':
                HandleColumnDetailItemCreation(event.data.column, event.data.leftText, event.data.rightText, event.data.description, event.data.color, event.data.seperator, event.data.closeGap, event.data.onClickFunction)
                break
            case 'createPlayerItem':
                HandleColumnPlayerItemCreation(event.data.column, event.data.name, event.data.level, event.data.statusText, event.data.statusColor, event.data.crewTag, event.data.color, event.data.onClickFunction)
                break
            case 'createDetailImageItem':
                HandleColumnDetailImageItemCreation(event.data.column, event.data.imgSource, event.data.imgTitle)
                break
            case 'baseVisible':
                HandleBaseVisible()
                break
            case 'updatePlayerStatus':
                HandlePlayerStatusChange(event.data.playerName, event.data.statusText, event.data.statusColor)
                break
            default: break;
        }
    })

    function HandleControlPress(control) {
        switch(control) {
            case 32 || 172:
                UIShowing.HandleControlPressUp()
                break
            case 33 || 173:
                UIShowing.HandleControlPressDown()
                break
            case 34 || 174:
                UIShowing.HandleControlPressLeft()
                break
            case 35 || 175:
                UIShowing.HandleControlPressRight()
                break
            case 177:
                UIShowing.HandleControlPressBack()
                break
            case 191:
                UIShowing.HandleControlPressForward()
                break
        }
    }

    function HandleBaseCreate(type) {
        switch(type) {
            case 1:
                UIShowing = new Lobby()
                break
        }
    }

    function HandleBaseVisible() {
        UIShowing.Visible(true)
    }

    function HandleColumnCreation(headerName) {
        UIShowing.CreateColumn(headerName)
    }

    function HandleBaseTitleAndSubtitleCreate(title, subtitle) {
        UIShowing.CreateTitleAndDescription(title, subtitle)
    }

    function HandleColumnDetailItemCreation(columnIndex, leftText, rightText, description, color, seperator, closeGap, onClickFunction) {
        UIShowing.columns[columnIndex].CreateDetailItem(leftText, rightText, description, color, seperator, closeGap, onClickFunction)
    }

    function HandleColumnPlayerItemCreation(columnIndex, name, level, statusText, statusColor, crewTag, color, onClickFunction) {
        UIShowing.columns[columnIndex].CreatePlayerItem(name, level, statusText, statusColor, crewTag, color, onClickFunction)
    }

    function HandleColumnDetailImageItemCreation(columnIndex, imgSource, imgTitle) {
        UIShowing.columns[columnIndex].CreateDetailImageItem(imgSource, imgTitle)
    }

    function HandlePlayerStatusChange(playerName, statusText, statusColor) {
        let column = null
        for(let i=0; i < UIShowing.columns.length; i++) {
            if(UIShowing.columns[i].element.getElementsByClassName('column-header')[0].innerHTML.includes('PLAYERS')) {
                column = UIShowing.columns[i].element
                break
            }
        }

        if(column !== null) {
            let playerNodes = column.getElementsByClassName('player-item')
            for(let i=0; i < playerNodes.length; i++) {
                if(playerNodes[i].getElementsByTagName('p')[0].innerHTML == playerName) {
                    let status = playerNodes[i].getElementsByTagName('p')[1]
                    status.innerHTML = statusText
                    if(statusColor !== null) {
                        status.style.backgroundColor = statusColor
                    }
                }
            }
        } else {
            throw new Error('No players column found. Please use PLAYERS in the column name to be established by the script.')
        }
    }
}