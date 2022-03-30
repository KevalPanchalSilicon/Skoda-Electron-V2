const { dialog } = require('electron');

window.ipcRenderer = require('electron').ipcRenderer;

window.ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
    console.log("sourceId :", sourceId);
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sourceId,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
              }
            }
        })
        handleStream(stream)
    } catch (e) {
        handleError(e)
    }
})
function handleStream (stream) {
   //document.querySelector('video').src = URL.createObjectURL(stream)
    const video = document.querySelector('video')
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
}

function handleError (e) {
   console.log(e)
}

window.ipcRenderer.on('message', function(event, text) {
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: text,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
      }
    
      dialog.showMessageBox(dialogOpts)
})