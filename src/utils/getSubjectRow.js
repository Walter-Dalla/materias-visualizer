export default function getSubjectRow(subjectName, orderedSubjects){
  let numberRow = 0
  orderedSubjects.forEach(subject => {
    if(subject.disciplina === subjectName){
      if(subject.preRequisitos.length === 0) return 0

      subject.preRequisitos.forEach(preRequiredName =>{
        let number = getSubjectRow(preRequiredName, orderedSubjects)
        if(number >= numberRow) numberRow = number+1
      })
    }
  })
  
  return numberRow;
}