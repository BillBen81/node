let fs = require('fs')

/*
fs.readFile('demo.mp4', (err, data) => {
  if(err) throw err 
  fs.writeFile('copy.mp4', data, (err) => {
      if(err) throw err
      console.log('Le fichier a bien été copié')
  })  
})
*/
let file = 'demo.mp4'

let read = fs.createReadStream(file)
let write = fs.createWriteStream('copy.mp4')
fs.stat(file, (err, stat) => {
    let total = stat.size
    let progress = 0

    read.on('data', (chunk) => {
        progress += chunk.length
        console.log("J'ai lu " + Math.round(100 * progress / total) + "%")
    })

})

/*
read.on('end', () => {
    console.log("J'ai fini de lire le fichier")
})
*/
read.pipe(write)
write.on('finish', () => {
    console.log("Le fichier a bien été copié")
})