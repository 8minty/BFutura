console.log("Bakaláři: listen");
if (location.hostname.startsWith("bakalari.") && location.hostname.endsWith(".cz") && location.pathname == "/next/prubzna.aspx") {
console.log("Stránka bakalářů detekovaná, spouštím skript...");
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM plně načten, spouštím funkci pro přidání známek...");
const znamky = document.querySelectorAll(".znamky");
var znindex = 0;
znamky.forEach((znamka) => {
    console.log("Zpracovávám element s classou 'znamky'...");
    const existujeZnamka = znamka.querySelector(".znamka-v .ob");
    AddZnamkaBtn(znamka, znindex); 
    znindex++;
});});
}
function VypocetVazenehoPrumeru(znamky, vahy){
    let suma = 0;
    let vahaSuma = 0;
    for (let i = 0; i < znamky.length; i++) {
        const znamka = parseFloat(znamky[i]);
        const vaha = parseFloat(vahy[i]);
        if ((!isNaN(znamka) && !isNaN(vaha))) {
            suma += znamka * vaha;
            vahaSuma += vaha;
        }
    }
    if (vahaSuma === 0) {
        return 0;
    }
    const prumer = suma / vahaSuma;
    return Math.round(prumer * 100) / 100;
}
function VahaNaZnak(vaha){
    switch (vaha) {
        case 0:
            return "N";
        case 1:
            return "J";
        case 2:
            return "I";
        case 3:
            return "H";
        case 4:
            return "G";
        case 5:
            return "F";
        case 6:
            return "E";
        case 7:
            return "D";
        case 8:
            return "C";
        case 9:
            return "B";
        case 10:
            return "A";
        default:
            return "?";
    }
}
function ZnakNaVahu(znak){
    switch (znak) {
        case "N":
            return 0;
        case "J":
            return 1;
        case "I":
            return 2;
        case "H":
            return 3;
        case "G":
            return 4;
        case "F":
            return 5;
        case "E":
            return 6;
        case "D":
            return 7;
        case "C":
            return 8;
        case "B":
            return 9;
        case "A":
            return 10;
        default:
            return -1;
    }}
function AddZnamkaBtn(znamka, znindex) {
    const spans = znamka.querySelectorAll(".znamka-v .dodatek .w-100");
var  vahy = Array.from(spans).map(span => span.textContent);
console.warn(vahy);
for (let i = 0; i < vahy.length; i++) {
    if (vahy[i].includes("Váha: ")) {
        vahy[i] = vahy[i].replace("Váha: ", "").split(" ")[0];
    }
    else {
        vahy[i] = ZnakNaVahu(vahy[i]);
    }
}
    //const vahy = Array.from(znamka.querySelectorAll(".znamka-v .dodatek .w-100")).map(el => ZnakNaVahu(el.innerText));
    const znamky = Array.from(znamka.querySelectorAll(".znamka-v .ob")).map(el => el.innerText);
    const znamkaDiv = document.createElement("div");
    znamkaDiv.classList.add("znamka-v");
    znamkaDiv.classList.add("tooltip-bubble")
    znamkaDiv.style.backgroundColor = "#e6f9ff";
    var znamkaindiv = document.createElement("div");
    znamkaindiv.classList.add("height--100");
    znamkaindiv.classList.add("width--100");
    znamkaindiv.classList.add("confirmed");
    znamkaDiv.appendChild(znamkaindiv);
    var cislovka = document.createElement("div");
    cislovka.classList.add("cislovka");
    cislovka.classList.add("velky");
    cislovka.classList.add("height--75");
    cislovka.style.marginTop = "35%";
    znamkaindiv.appendChild(cislovka);
    var znamkaCislo = document.createElement("div");
    znamkaCislo.classList.add("ob");
    znamkaCislo.innerText = "+";
    cislovka.appendChild(znamkaCislo);
    znamka.appendChild(znamkaDiv);
    znamkaDiv.addEventListener("click", () => {
        const znamkaInput = prompt("Zadejte známku:");
        if (znamkaInput === null) return; 
        var vaha = prompt("Zadejte váhu (0-10):");
        if (vaha === null) return; 
        vaha = parseInt(vaha);
        if (isNaN(vaha) || vaha < 0 || vaha > 10) {
            alert("Váha musí být číslo mezi 0 a 10.");
            return;
        }
        const znamkaElement = AddZnamka(znamkaInput, vaha, znamka);
        znamkaElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const znamkaInput = prompt("Zadejte novou známku (nebo ponechte prázdné pro smazání):", znamkaElement.querySelector(".ob").innerText);
            if (znamkaInput === null) return; 
            var vaha = "";
            while (znamkaInput !== "" && vaha== ""){
            vaha = prompt("Zadejte novou váhu:", znamkaElement.querySelector(".dodatek").innerText.replace("Váha: ", "").split(" ")[0]);
            if (vaha === null) return;
            }
            if (znamkaInput === "" ) {
                znamkaElement.remove();
                indexr = Array.from(znamka.querySelectorAll(".znamka-v .ob")).indexOf(znamkaElement.querySelector(".ob"));
                   
                VypocetVazenehoPrumeru
            }
            else if (vaha === "") {
                alert("Váha musí být vyplněna.");
                return;
    }
else if (isNaN(vaha) || vaha < 0 || vaha > 10) {
                alert("Váha musí být číslo mezi 0 a 10.");
                return;
            }
            else {
                znamkaElement.querySelector(".ob").innerText = znamkaInput;
                znamkaElement.querySelector(".dodatek").innerText = "Váha: " + vaha + " (" + VahaNaZnak(parseInt(vaha)) + ")";
            }   
});
        znamka.insertBefore(znamkaElement, znamkaDiv);
        const znamky = Array.from(znamka.querySelectorAll(".znamka-v .ob")).map(el => el.innerText);
        const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
        console.warn("Znamky v radku: ", znamky);
        vahy.push(vaha);
        znamky.push(znamkaInput);
        znamky.pop();
        znamky.pop();
        console.info("Vahy v radku: ", vahy);
        console.info("Znamky v radku: ", znamky);
        var prumer = VypocetVazenehoPrumeru(znamky, vahy);
        document.getElementsByClassName("predmet-radek")[znindex].getElementsByClassName("leva")[0].getElementsByClassName("dalsi-dva")[0].getElementsByClassName("modra-z")[0].innerText = "Vážený průměr: " + prumer;

    });
}
/*
 *  Funkce pro přidání známky do řádku
 *  @param {string} znamka - Číslo známky
 * @param {number} vaha - Váha známky (0-10)
 * @returns {HTMLElement} - Element s přidanou známkou
 */
function AddZnamka(znamka, vaha){
    const znamkaDiv = document.createElement("div");
    znamkaDiv.classList.add("znamka-v");
    znamkaDiv.classList.add("tooltip-bubble")
    znamkaDiv.style.backgroundColor = "#E3DCFE";
    var znamkaindiv = document.createElement("div");
    znamkaindiv.classList.add("height--100");
    znamkaindiv.classList.add("width--100");
    znamkaindiv.classList.add("confirmed");
    znamkaDiv.appendChild(znamkaindiv);
    var cislovka = document.createElement("div");
    cislovka.classList.add("cislovka");
    cislovka.classList.add("velky");
    znamkaindiv.appendChild(cislovka);
    var znamkaCislo = document.createElement("div");
    znamkaCislo.classList.add("ob");
    znamkaCislo.innerText = znamka;
    cislovka.appendChild(znamkaCislo);
    var bod = document.createElement("div");
    bod.classList.add("bod");
    znamkaindiv.appendChild(bod);
    var dodatek = document.createElement("div");
    dodatek.classList.add("dodatek");
    znamkaindiv.appendChild(dodatek);
    var vahadiv = document.createElement("div");
    vahadiv.classList.add("w-100");
    vahadiv.classList.add("d-inline-block");
    vahadiv.innerText = "Váha: " + vaha + " (" + VahaNaZnak(vaha) + ")";
    dodatek.appendChild(vahadiv);
    return znamkaDiv;
}