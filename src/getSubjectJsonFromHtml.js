//import {atualizaDesenho} from '../main.js'



function getHtmlData(input){
  const file = input.files[0]

  let reader = new FileReader();
  reader.readAsText(file);
  
  reader.onload = function() {
    getSubjectJsonFromHtml(reader.result)
  };
  
  reader.onerror = function() {
    console.log(reader.error);
  };

}

function getSubjectJsonFromHtml(html){
  const subjectNames = [];
  const subject = []
  const sla = (new DOMParser).parseFromString(html, "text/html")
  .documentElement;

  const table = sla.querySelector(".listagem")

  //gets rows of table
  var rowLength = table.rows.length;
  //loops through rows    
  for (i = 0; i < rowLength; i++){
    const cells = table.rows.item(i).cells
    //console.log(cells)
    const keys = Object.keys(cells)
    let disciplina
    let preRequisitos = []
    
    keys.forEach(key => {
      const cell = cells[key];
      const collection = cell.getElementsByTagName('p', 0)
      if(collection.length === 0) {
        if(cell.innerHTML.includes("Pré-Requisito")){
          preRequisitos = 
            cell.innerHTML.split('Pré-Requisito:', 10)
            .filter(Boolean)
            .map((str) =>{
                return str.replace('<br>', '').trim()
            })
        }
        return 0;
      }
      disciplina = collection['0'].innerHTML.trim()
    })
    if(disciplina)
      subject.push({
        disciplina,
        preRequisitos
      })
  }
  subjectsParam = subject
}


