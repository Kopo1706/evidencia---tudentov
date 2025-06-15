
 export const STORAGE_KEY = "udaje"

export function nacitajZoznam() {
    let nacitane = localStorage.getItem(STORAGE_KEY)
    if(!nacitane)return []
     return JSON.parse(nacitane)
}
export function ulozZoznam(zoznam) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(zoznam))
}
export function pridajDoZoznamu(meno, body){
    let zoznam = nacitajZoznam()
    let existuje = zoznam.some((student) => student.meno === meno)
    if(existuje) {
     return { uspesne: false, chyba: "Zadane meno už existuje"}
    }
    zoznam.push({ meno, body})
    ulozZoznam(zoznam)
    return{ uspesne: true}
}
