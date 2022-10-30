const video = document.getElementById('nana')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),

  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
  // const labeledFaceDescriptors = await loadLabeledImages()
  // const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
}
  

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
   
    
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    
  }, 100)
})

// function loadLabeledImages() {
//   const labels = ['Jisoo', 'Rose', 'Jennie']
//   return Promise.all(
//       labels.map(async label => {
//           const descriptions = []
//           for (let i = 1; i <= 3; i++) {
//               const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/BorntoDev/FaceRegJS/master/labeled_images/${label}/${i}.jpg`)
//               const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//               descriptions.push(detections.descriptor)
//             }
              
//       return new faceapi.LabeledFaceDescriptors(label, descriptions)
//   })
// )
// }