export default function orderSubjects(subjects){
  return subjects.sort((arg1, arg2) => {
    const preReqLen1 = arg1.preRequisitos.length
    const preReqLen2 = arg2.preRequisitos.length

    return preReqLen1 - preReqLen2;
  })
}