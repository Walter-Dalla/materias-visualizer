export default function getSubjectXY({map, subject, ROW_SPACED, HEIGHT_SPACE, BASE_WIDTH, HEIGHT, WIDTH, WIDTH_SPACE}){
  let coords = [];

  if(subject.preRequisitos.length === 0) return coords;

  map.forEach((row, indexRow) => {
    row.forEach((col, indexCol) => {
      subject.preRequisitos.forEach(subjectName =>{
        if(subjectName === col.disciplina){
          coords.push({
            x:indexCol * (WIDTH + WIDTH_SPACE) + ROW_SPACED*indexRow + BASE_WIDTH+WIDTH/2,
            //x:(indexCol + 1/2)*WIDTH + ROW_SPACED*indexRow + BASE_WIDTH,
            y:(indexRow+1)*HEIGHT+HEIGHT_SPACE*(indexRow + 1/2)
          })
        }
      })
    });
  });

  return coords;
}