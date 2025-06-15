import { nacitajZoznam } from "./data.js";

export function getBestStudent(){
    let zoznam = nacitajZoznam()
    if(zoznam.length === 0) return null

    return zoznam.reduce((best, current)=> {
       return current.body > best.body ? current : best
    })
}

export function getAverageGrade(){
    let zoznam = nacitajZoznam()
    if(zoznam.length === 0) return 0

    let result = zoznam.reduce((acc, student) => acc + student.body, 0)

    let average = result / zoznam.length

    return Math.round(average)
}