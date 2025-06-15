import { nacitajZoznam, ulozZoznam, pridajDoZoznamu, STORAGE_KEY } from "./data.js";
import { vytvorZaznam } from "./render.js";
import { getAverageGrade,getBestStudent } from "./stats.js";

let form = document.querySelector("#zoznam")
let inputName = document.querySelector("#name")
let inputNumber = document.querySelector("#number")
let error = document.querySelector("#error")
let ul = document.querySelector("#hodnotenie")
let divBest = document.querySelector("#najlepsi")
let divAverage = document.querySelector("#priemer")

let aktualSort = "body"

form.addEventListener("submit", function(event){
    event.preventDefault()

    let meno = inputName.value.trim()
    let body = parseFloat(inputNumber.value.trim())

    if(meno === "" || isNaN(body)) {
        error.textContent = "Zadaj správne údaje"
        return
    }
    let vysledok = pridajDoZoznamu(meno, body);
    if (!vysledok.uspesne) {
      error.textContent = vysledok.chyba;
      return;
    }   

    inputName.value = ""
    inputNumber.value = ""
    error.textContent = ""
    zobrazUdaje()
}) 

function zobrazUdaje(){
    ul.innerHTML= ""
    let zoznam = nacitajZoznam()

    if (aktualSort === "body") {
        zoznam.sort((a, b) => b.body - a.body);
      } else {
        zoznam.sort((a, b) => a.meno.localeCompare(b.meno));
      }
    
      zoznam.forEach((student, index) => {
        let li = vytvorZaznam(student, index, zobrazUdaje);
        ul.appendChild(li);
        zobrazNajlepsieho()
        showAverage()
      });
    }
    
    document.querySelector("#vymaz").addEventListener("click", () => {
      if (!confirm("Chcete zmazať všetky údaje?")) return;
      localStorage.removeItem(STORAGE_KEY);
      zobrazUdaje();
    });
    
    document.querySelector("#triedenie").addEventListener("click", () => {
      aktualSort = aktualSort === "body" ? "abeceda" : "body";
      zobrazUdaje();
    });

    function zobrazNajlepsieho(){
      let student = getBestStudent()

      if(student){
        divBest.textContent = `Najlepší študent: ${student.meno}, ${student.body} bodov`
      }else{
        divBest.textContent = `Zatiaľ nieje žiaden študent`
      }
    }

    function showAverage(){
      let average = getAverageGrade()
      if(average){
        divAverage.textContent = `Priemer známok je: ${average}`
      }else{
        divAverage.textContent = `Priemer známok je: 0`
      }
    }
   



    
    zobrazUdaje();

