let lucchetti = [0,0,0,0,0]; //  array per la gestione del conto lucchetti

function switchButton(id){ // attivata dal click sul lock
    let block = document.getElementById(id);
    if (lucchetti[id] === 0) {
        var lucchettoChiuso = block.querySelector('.locked')
        lucchettoChiuso.style.display = 'block' // per annullare poi il cambio di questo colore
        var lucchettoAperto = block.querySelector('.unlocked')
        lucchettoAperto.style.display = 'none'
        lucchetti[id] = 1; // per alternare lo switch la prossima volta
    } else {
        var lucchettoAperto = block.querySelector('.unlocked')
        lucchettoAperto.style.display = 'block'
        var lucchettoChiuso = block.querySelector('.locked')
        lucchettoChiuso.style.display = 'none' 
        lucchetti[id] = 0;
        }
}

function assegnaPalette(e) {
    if (e.keyCode === 32) {// Verifica se il tasto premuto è la barra spaziatrice
        sezioni = Array.from(document.getElementsByClassName('color')); // crea un array di tutte le section per i colori
        testi = Array.from(document.getElementsByTagName('h2')); // crea un array per tutti i testi
        listaLucchetti = Array.from(document.getElementsByTagName('button')).slice(1); // senza lo slice prenderebbe anche il bottone per generare (cfr dispositivi mobili)
        for (x = 0; x < 5; x++) {
            if (lucchetti[x] === 0) {
                let colore = creaPalette()
                sezioni[x].style.backgroundColor = colore; // assegna il colore al section
                let testo = colore.substring(1, 7).toUpperCase();
                testi[x].textContent = testo;

                // se lo sfondo è troppo scuro, devo cambiare il colore dell'h2
                function isSfondoScuro(colore) {
                var r = parseInt(colore.substring(1, 3), 16);
                var g = parseInt(colore.substring(3, 5), 16);
                var b = parseInt(colore.substring(5, 7), 16);
                var luminosita = (r * 299 + g * 587 + b * 114) / 1000;
                return luminosita < 128;
                }

                if (isSfondoScuro(colore)) { // per abbinare il colore di testo e bottone allo sfondo
                    testi[x].style.color = "#f5eed9";
                    listaLucchetti[x].style.backgroundColor = "#f5eed9";
                    listaLucchetti[x].style.color = "#3f3f3f"; 
                } else {
                    testi[x].style.color = "#3f3f3f";
                    listaLucchetti[x].style.backgroundColor = "#3f3f3f";
                    listaLucchetti[x].style.color = "#f5eed9";  
                }
            }
        }
    } 
}

function creaPalette() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var testiDaCopiare = document.querySelectorAll(".testoDaCopiare"); // seleziona tutti gli elementi h2
testiDaCopiare.forEach(function(e) {
    e.addEventListener("click", function() {// aggiunge l'event listener a ogni elemento h2
        copiaTesto(e.innerText);
    }); 
});

function mobile() {
    assegnaPalette({ keyCode: 32 });
}

function copiaTesto(testo) {
    var inputTemporaneo = document.createElement("input");
    inputTemporaneo.setAttribute("value", testo);
    document.body.appendChild(inputTemporaneo);
    inputTemporaneo.select();
    inputTemporaneo.setSelectionRange(0, 99999); // Per dispositivi mobili
    document.execCommand("copy");
    document.body.removeChild(inputTemporaneo);
}

document.addEventListener("keydown", assegnaPalette); 
assegnaPalette({ keyCode: 32 }); // Simulazione dell'evento barra spaziatrice