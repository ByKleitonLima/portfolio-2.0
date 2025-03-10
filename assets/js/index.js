const elementos = document.querySelectorAll(".banner > div, .title"); // Agora inclui a title
let indexElemento = 0;
let cursor = document.createElement("span");
cursor.textContent = "|"; 
cursor.style.display = "inline-block";
cursor.style.animation = "blink 0.5s infinite"; 
cursor.style.marginLeft = "2px"; 

function escreverTexto(elemento, texto, callback) {
    let index = 0;
    elemento.innerHTML = "";
    elemento.appendChild(cursor);

    function escrever() {
        if (index < texto.length) {
            elemento.insertBefore(document.createTextNode(texto.charAt(index)), cursor);
            index++;
            setTimeout(escrever, 100);
        } else {
            elemento.removeChild(cursor);
            setTimeout(callback, 500);
        }
    }
    escrever();
}

function mostrarImagem(elemento, callback) {
    setTimeout(() => {
        elemento.style.opacity = 1;
        elemento.style.transition = "opacity 0.5s ease-in-out"; 
        setTimeout(callback, 500);
    }, 500);
}

function animarProximo() {
    if (indexElemento < elementos.length) {
        let el = elementos[indexElemento];
        el.style.display = "flex"; // Torna visível antes de digitar

        let textoElemento = el.querySelector("p");
        let imagemElemento = el.querySelector("img");

        if (textoElemento) {
            textoElemento.style.display = "inline"; // Garante que a tag <p> será visível
            escreverTexto(textoElemento, textoElemento.textContent, () => {
                if (imagemElemento) { 
                    mostrarImagem(imagemElemento, () => {
                        indexElemento++;
                        animarProximo();
                    });
                } else {
                    indexElemento++;
                    animarProximo();
                }
            });
        } else {
            indexElemento++; 
            animarProximo();
        }
    }
}

animarProximo();

// Animação ao entrar
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000, // duração da animação em milissegundos
        once: true, // anima uma vez quando o elemento entra na tela
    });
});
