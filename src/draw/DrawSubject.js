import drawSquare from './DrawSquare.js'

export default function drawSubject(ctx, x, y, width, height, subjectName){
  const yPadding = +5
  const fontSize = width/13
  
  drawSquare(ctx, x, y, width, height);
  
  ctx.font = `${fontSize}px Arial`;
  ctx.textAlign = "center";  
  ctx.textBaseline = "Top";
  
  const textSplit = subjectName.split(' ')
  
  textSplit[textSplit.length/2] = textSplit[Math.floor(textSplit.length/2)]+'\n'

  textSplit.join(' ').split('\n').forEach((text, index) => {
    ctx.fillText(text, x+width/2, y +height/2 + yPadding + index * fontSize - fontSize/2)
  })
}