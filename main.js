import drawSubject from './src/draw/DrawSubject.js';
import drawLine from './src/draw/DrawLine.js'
import drawBackgroundLine from './src/draw/DrawBackgroundLine.js'
import getSubjectXY from './src/utils/getSubjectXY.js'
import orderSubjects from './src/utils/orderSubjects.js'
import getSubjectRow from './src/utils/getSubjectRow.js'
//import getSubjectJsonFromHtml from './src/getSubjectJsonFromHtml.js'

const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d");
const size = 9999
canvas.width  = size;
canvas.height = size/10;

// const
const WIDTH = 250
const HEIGHT = 45

const BASE_WIDTH = 150

const WIDTH_SPACE = 100
const HEIGHT_SPACE = 50
const ROW_SPACED = 50

const map = [[], [], [], [], [], [], []]

function findInMap (map, string){
  let found = false
  map.forEach(cols => {
    cols.forEach(subject => {
      found = (subject.disciplina === string) || found
    })
  })
  return found
}


function atualizaDesenho(){
  if(atualizado) return;
  if(!subjectsParam) return;

  console.log("atualizando...", subjectsParam)

  drawBackgroundLine(ctx, HEIGHT, HEIGHT_SPACE)

  let orderedSubjects = []
  
  orderedSubjects = orderSubjects(subjectsParam)
  atualizado = true

  let subjectsWithError = []
  
  subjectsWithError = []
  orderedSubjects.forEach((subject) => {
    if(!findInMap(map, subject.disciplina)){
      const index = getSubjectRow(subject.disciplina, orderedSubjects)
      
      if(index === -1)
        subjectsWithError.push(subject)
      else 
        map[index].push(subject)
      
    }
  })

  //Get pos pre-required subjects
  const getPosPreSub = ({map, subject}) =>{
    const coords = []
    map.forEach((row, rowIndex) => {
      row.forEach((subject2, colIndex) =>{
        if(subject.preRequisitos.includes(subject2.disciplina))
          coords.push({
            y:rowIndex,
            x:colIndex
          })
      })
    })
    return coords
  }
  /*
  const mapUpdated = []
  map.forEach((row, rowIndex) => mapUpdated[rowIndex] = [])
  
  const rowIndex = 1
  let distanceArray =[]

  map[rowIndex].forEach((subject, colIndex) =>{
    const coordsArray = getPosPreSub({map, subject})
    const calcdistance = (coords1, coords2) =>{
      return Math.sqrt(Math.pow(coords1.x - coords2.x, 2) 
        + Math.pow(coords1.y - coords2.y, 2))
    }

    let shortestDistance = 0
    let perfectXCoordinate = 0

    for(i = 0; i < map[0].length; i++){
      if(mapUpdated[rowIndex][i] !== undefined) continue;

      let distance = 0
      let subjectCoords = { x:i, y:rowIndex }

      coordsArray.forEach(coords => {
        distance += calcdistance(coords, subjectCoords)
      })
    
      if(i === 0 || distance < shortestDistance) {
        shortestDistance = distance
        perfectXCoordinate = subjectCoords.x
      }
    }

    distanceArray.push({
      distance:shortestDistance,
      subject,
      perfectXCoordinate
    })
  })
  
  distanceArray.sort((arg1, arg2) =>{arg1.distance - arg2.distance})
  console.log(distanceArray)
  mapUpdated[rowIndex][distanceArray[0].perfectXCoordinate] = distanceArray[0].subject

  map[rowIndex] = mapUpdated[rowIndex]
  console.log(mapUpdated)
  /*
  map.forEach((row, rowIndex) => {
    row.forEach((subject, colIndex) =>{
      
    })
  })
  */

  /**
   * Draw subjects
   */
  const actualMap = map
  console.log(map)
  actualMap.forEach((row, rowIndex) => {
    row.forEach((subject, colIndex) =>{
      const x = colIndex * (WIDTH + WIDTH_SPACE) + ROW_SPACED*rowIndex + BASE_WIDTH;
      const y = rowIndex * (HEIGHT + HEIGHT_SPACE) + HEIGHT_SPACE/2;

      drawSubject(ctx, x, y, WIDTH, HEIGHT, subject.disciplina)

      //Draw pre-required lines
      let coordsArray = getSubjectXY({map:actualMap, subject, WIDTH_SPACE, ROW_SPACED, HEIGHT_SPACE, BASE_WIDTH, WIDTH, HEIGHT})
      
      coordsArray.forEach(coords => drawLine(ctx, x + WIDTH/2, y, coords.x, coords.y))
    })
  })
}
setInterval(atualizaDesenho, 100)