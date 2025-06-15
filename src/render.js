import { vypocitajZnamku } from "./utils.js";
import { nacitajZoznam, ulozZoznam } from "./data.js";

export function vytvorZaznam(student, index, zobrazUdaje){
    const {meno, body } = student
    let znamka = vypocitajZnamku(body)

    let li = document.createElement("li")
    li.textContent = `Meno: ${meno}, počet bodov: ${body}, známka: ${znamka}`

    let dtlButton = document.createElement("button")
    dtlButton.textContent = "X"
    dtlButton.style.marginLeft = "1em"
    dtlButton.style.color = "red"
    li.appendChild(dtlButton)

    dtlButton.addEventListener("click", function(){
        let odpoved = confirm("Chcete odstrániť študenta?")
        if(!odpoved) return
        let zoznam = nacitajZoznam()
        zoznam.splice(index, 1)
        ulozZoznam(zoznam)
        zobrazUdaje()
    }) 
    return li
}