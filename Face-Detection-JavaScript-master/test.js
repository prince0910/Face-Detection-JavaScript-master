// // const imageUpload = document.getElementById('imageUpload')

// Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//     faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//     faceapi.nets.faceExpressionNet.loadFromUri('/models')
//     ]).then(startVideo)

// async function startVideo(){
//     navigator.getUserMedia(
//         { video: {} },
//         stream => video.srcObject = stream,
//         err => console.error(err)
//       )
//     const container = document.createElement('div')
//     container.style.position = 'relative'
//     document.body.append(container)
//     const labeledFaceDescriptors = await loadLabeledImages()
//     const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
//     let video, canvas

//     document.body.append('โหลดเสร็จแล้ว')

//     video.addEventListener('play', async () => {
//         canvas = faceapi.createCanvasFromMedia(video)
//         container.append(canvas)
//         const displaySize = { width: video.width, height: video.height }
//         faceapi.matchDimensions(canvas, displaySize)
//         const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
//         const resizedDetections = faceapi.resizeResults(detections, displaySize)
//         const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
//         results.forEach((result, i) => {
//             const box = resizedDetections[i].detection.box
//             const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
//             drawBox.draw(canvas)
//           })
//     })
// }

// function loadLabeledImages() {
//     const labels = ['Jisoo', 'Rose', 'Jennie']
//     return Promise.all(
//         labels.map(async label => {
//             const descriptions = []
//             for (let i = 1; i <= 3; i++) {
//                 const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/BorntoDev/FaceRegJS/master/labeled_images/${label}/${i}.jpg`)
//                 const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//                 descriptions.push(detections.descriptor)
//               }
                
//         return new faceapi.LabeledFaceDescriptors(label, descriptions)
//     })
//   )
// }