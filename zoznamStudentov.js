// Referencie na prvky
let form = document.querySelector("#zoznam");
let inputName = document.querySelector("#name");
let inputNumber = document.querySelector("#number");
let error = document.querySelector("#error");
let ul = document.querySelector("#hodnotenie");

// Základ triedenia
let aktualSort = "body"

// Odoslanie formulára - pridanie študenta do zoznamu
form.addEventListener("submit", function(event){
  event.preventDefault();

  let meno = inputName.value.trim();
  let body = parseFloat(inputNumber.value.trim());

  if(meno === "" || isNaN(body)){
    error.textContent = "zadaj správne údaje";
    return;
  }
  

  pridajDoZoznamu(meno, body)
  inputName.value = "";
  inputNumber.value = "";
  zobrazUdaje();
});

// Zobrazenie študentov podľa aktuálneho triedenia
function zobrazUdaje(){
  ul.innerHTML = "";
  let zoznam = nacitajZoznam()

  if (aktualSort === "body"){
    zoznam.sort((a,b)=> b.body - a.body)
  } else if(aktualSort === "abeceda"){
    zoznam.sort((a, b)=> a.meno.localeCompare(b.meno))
  }

  zoznam.forEach((student,index) => {
    let li = vytvorZaznam(student, index)
    ul.appendChild(li)
  });
}

// Tlačidlo na zmazanie celého obsahu
let tlacidlo = document.createElement("button")
tlacidlo.textContent = "Zmazať všetko"
tlacidlo.style.marginLeft = "1em"
document.querySelector("footer").appendChild(tlacidlo)

tlacidlo.addEventListener("click", function(){
  let odpoved = confirm("Chcete zmazať všetky údaje?")
  if(!odpoved)return

  localStorage.removeItem("udaje")
  zobrazUdaje()
}) 
// Funkcia na výpočet známky
  function vypocitajZnamku(body){
    if(body >= 90){
    return  1;
    } else if(body >= 81){
    return 2;
    } else if(body >= 71){
    return 3;
    } else if(body >= 61){
    return 4;
    }else{
      return 5
     }
  }

// Uloženie študenta do localStorage
  function pridajDoZoznamu(meno, body){
    let zoznam = nacitajZoznam()
    let exist = zoznam.some(student=> meno === student.meno)
    if(exist){
      error.textContent = "Zadané meno už existuje"
      return
    }
    
    zoznam.push({meno, body})

   
    localStorage.setItem("udaje",JSON.stringify(zoznam))
    error.textContent = ""
  }

  // Vytvorenie LI s údajmi a tlačidlo na zmazanie
  function vytvorZaznam(student, index){
    const {meno, body} = student
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
      localStorage.setItem("udaje", JSON.stringify(zoznam))
      zobrazUdaje()
    })
    return li
  }

// Načitanie dát z localStorage
  function nacitajZoznam(){
    let nacitane = localStorage.getItem("udaje")
    if(!nacitane) return []
    return JSON.parse(nacitane)
  }

zobrazUdaje();

// Tlačidlo na prepínanie zoradenia + nastavenie textu tlačidla
let sortButton = document.createElement("button")
sortButton.style.marginLeft = "1em"
document.querySelector("footer").appendChild(sortButton)
if(aktualSort === "body"){
  sortButton.textContent = "Zoradiť podľa abecedy"
}else{
  sortButton.textContent = "Zoradiť podľa bodov"
}

sortButton.addEventListener("click", function(){
 if(aktualSort === "body"){
  aktualSort = "abeceda"
  sortButton.textContent = "Zoradiť podľa bodov"
 }else{
  aktualSort = "body"
  sortButton.textContent = "Zoradiť podľa abecedy"
 }
 zobrazUdaje()
})
 

