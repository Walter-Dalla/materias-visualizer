export default function drawBackgroundLine(ctx, HEIGHT, HEIGHT_SPACE){
  ctx.lineWidth = 1;
  ctx.setLineDash([1, 5]);
  
  for(let i = 1; i < 20; i++){
    const y = i*HEIGHT + HEIGHT_SPACE*i
    
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(window.innerWidth, y);
    ctx.stroke();
  }

  ctx.lineWidth = 1;
  ctx.setLineDash([]);
}