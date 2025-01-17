let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let maximoIntentos = 3;

condicionesIniciales();

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function intentarOffNuevoJuegoOn()
{
    document.getElementById('intentar').setAttribute('disabled','true');
    document.getElementById('reiniciar').removeAttribute('disabled');
}
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        intentarOffNuevoJuegoOn();
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p',`Es menor, quedan ${maximoIntentos-intentos} ${(intentos === 2) ? 'intento' : 'intentos'}`);
        } else {
            asignarTextoElemento('p',`Es mayor, quedan ${maximoIntentos-intentos} ${(intentos === 2) ? 'intento' : 'intentos'}`);
        }
        intentos++;
        limpiarCaja();
        if(intentos>maximoIntentos)
        {
            asignarTextoElemento('p',`Sin intentos. Vuelve a jugar.`);
            intentarOffNuevoJuegoOn();    
        }
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;
    //Si ya sorteamos todos los números reiniciar lista
    if (listaNumerosSorteados.length === (numeroMaximo)) {
        listaNumerosSorteados=[];
        return numeroGenerado;
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego y habilitar el boton intentar
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    document.getElementById('intentar').removeAttribute('disabled');
}

