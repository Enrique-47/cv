class Sudoku {
    constructor(mezclas = 30) {
        this.datosBackUp = [];
        this.datos = [
            9,	2,	3,	8,	6,	1,	7,	4,	5,
            5,	4,	1,	2,	7,	9,	3,	8,	6,
            7,	6,	8,	4,	3,	5,	2,	9,	1,
            2,	8,	6,	7,	5,	3,	4,	1,	9,
            3,	7,	9,	6,	1,	4,	8,	5,	2,
            4,	1,	5,	9,	2,	8,	6,	3,	7,
            1,	9,	2,	3,	4,	7,	5,	6,	8,
            8,	3,	7,	5,	9,	6,	1,	2,	4,
            6,	5,	4,	1,	8,	2,	9,	7,	3
        ];
        this.nuevo(mezclas);
    }
    intercambiaFila(i = 10) 
    {
        switch (i) {
            case 0:
                this.cambiaFilas(1, 2);
                break;
            case 1:
                this.cambiaFilas(0, 2);
                break;
            case 2:
                this.cambiaFilas(0, 1);
                break;
            case 3:
                this.cambiaFilas(4, 5);
                break;
            case 4:
                this.cambiaFilas(3, 5);
                break;
            case 5:
                this.cambiaFilas(3, 4);
                break;
            case 6:
                this.cambiaFilas(7, 8);
                break;
            case 7:
                this.cambiaFilas(6, 8);
                break;
            case 8:
                this.cambiaFilas(6, 7);
                break;
            default: 
                this.intercambiaFila(Math.floor(Math.random() * 9));
                break;
        }
    }

    cambiaFilas(a, b) 
    {
        for (let i = 0; i < 9; i++) 
        {
            const temp = this.datos[a * 9 + i]; //guardamos el elemento que marca i de la fila del indice pasado
            this.datos[a * 9 + i] = this.datos[b * 9 + i]; //intercambiamos valores de forma destructiva ya que lo tenemos en "temp"
            this.datos[b * 9 + i] = temp; //asignamos el valor que habiamos guardado
        }
    }

    intercambiaColumna(i = 10) {
        switch (i) {
            case 0:
                this.cambiaColumnas(1, 2);
                break;
            case 1:
                this.cambiaColumnas(0, 2);
                break;
            case 2:
                this.cambiaColumnas(0, 1);
                break;
            case 3:
                this.cambiaColumnas(4, 5);
                break;
            case 4:
                this.cambiaColumnas(3, 5);
                break;
            case 5:
                this.cambiaColumnas(3, 4);
                break;
            case 6:
                this.cambiaColumnas(7, 8);
                break;
            case 7:
                this.cambiaColumnas(6, 8);
                break;
            case 8:
                this.cambiaColumnas(6, 7);
                break;
            default:
                this.intercambiaColumna(Math.floor(Math.random() * 9));
                break;
        }
    }

    cambiaColumnas(a, b) 
    {
        for (let i = 0; i < 9; i++) 
        {
            const temp = this.datos[i * 9 + a];
            this.datos[i * 9 + a] = this.datos[i * 9 + b];
            this.datos[i * 9 + b] = temp;
        }      
    }

    nuevo(mezclas = 10) 
    {
        for (let i = 0; i < mezclas; i++) 
        {
            this.intercambiaFila();
            this.intercambiaColumna();
        }
    }

    muestra(porcentaje = 1) 
    {
        for (let i = 0; i < 81; i++) 
        {
            const celda = document.getElementById('td' + i);
            const valor = this.datos[i];
            const esVisible = Math.random() < porcentaje;
            
            if (esVisible) 
            {
                celda.classList.add("generada");
                celda.innerText = valor;
            } else 
            {
                celda.innerText = '  ';
                this.datos[i] = 0; // Las celdas que no llenamos cambiamos tambien su valor de datos para saber cuales estan vacias.
                celda.classList.remove("generada");
            }
        }
    }
    
    

    estaResuelto() 
    {
        // Verificar filas
        for (let i = 0; i < 9; i++) 
        {
            const fila = this.guardaFila(i);
            if (!this.estanNumerosCorrectos(fila)) 
            {
                return false;
            }
        }
    
        // Verificar columnas
        for (let i = 0; i < 9; i++) {
            const columna = this.guardaColumna(i);
            if (!this.estanNumerosCorrectos(columna)) {
                return false;
            }
        }
    
        // Verificar mini sudokus
        for (let i = 0; i < 9; i++) {
            const miniSudoku = this.guardarMiniSudoku(i);
            if (!this.estanNumerosCorrectos(miniSudoku)) {
                return false;
            }
        }
    
        return true; // Si ha pasado todas las verificaciones, el sudoku está resuelto.
    }
    
    estanNumerosCorrectos(arr) {
        // Verificar que los números del 1 al 9 estén presentes exactamente una vez
        for (let num = 1; num <= 9; num++) {
            if (arr.indexOf(num) === -1 || arr.indexOf(num) !== arr.lastIndexOf(num)) 
            {
                return false; // Si el número no está presente o hay duplicados, retorna false
            }
        }
    
        return true; // Si no se encontraron problemas, retorna true
    }

    guardaFila(indice) 
    {
        const fila = [];
        for (let i = 0; i < 9; i++) 
        {
            fila.push(parseInt(this.datos[indice * 9 + i]));
            //console.log(indice * 9 + i);
        }
        //console.log(fila);
        return fila;
    }

    guardaColumna(indice) 
    {
        const columna = [];
        for (let i = 0; i < 9; i++) 
        {
            columna.push(parseInt(this.datos[i * 9 + indice]));
            //console.log(i * 9 + indice);
        }
        return columna;
    }

    guardarMiniSudoku(indiceMiniSudoku) 
    {
        const miniSudoku = [];
        const filaInicio = Math.floor(indiceMiniSudoku / 3) * 3;
        const columnaInicio = (indiceMiniSudoku % 3) * 3;
        for (let fila = 0; fila < 3; fila++) 
        {
            for (let col = 0; col < 3; col++) 
            {
                miniSudoku.push(this.datos[(filaInicio + fila) * 9 + columnaInicio + col]);
            }
        }
        return miniSudoku;
    }
}


    const miSudoku = new Sudoku();

    let celdaUltimoFocoAbajo = -1;
    let celdaUltimoFoco = -1;
    let valorCeldaAbajo  = -1;
    let valorCeldaTablero = -1;
    let celdaActualTablero = -1;
    let columnaClicActual = -1;
    let filaClicActual = -1;
    let miniSudokuClicActual = -1;
    let celdaActualAbajo = -1;
    
    function indiceColumna() //actualiza la variable global para saber en que columna hemos hecho clic
    {
        columnaClicActual = parseInt(celdaActualTablero.id.substring(2));
        
        while(columnaClicActual > 8)
        {
            columnaClicActual -=9;
        }
    }
    
    function indiceFila() //actualiza la variable global para saber en que columna hemos hecho clic
    {
        filaClicActual = parseInt(celdaActualTablero.id.substring(2));
        filaClicActual = Math.floor(filaClicActual / 9); 
        //console.log(filaClicActual + " fila ");
    }
    
    function indiceMiniSudoku() //actualiza la variable global para saber en que columna hemos hecho clic
    {
        let filaClicActualCopy = filaClicActual;
        let columnaClicActualCopy = columnaClicActual; 
        
        miniSudokuFila = Math.floor(filaClicActualCopy / 3);
        miniSudokuColumna = Math.floor(columnaClicActualCopy / 3);
        miniSudokuClicActual = miniSudokuFila * 3 + miniSudokuColumna;
        //console.log(miniSudokuNumero);
    }
    
    let inputsNoValidos;
    function bloquearInputsNoValidos()
    {
        inputsNoValidos = new Array();

        for (let i = 1; i <= 9;i++ )
        {
            let id = "td10" + i.toString();

            if ((miSudoku.guardaFila(filaClicActual).includes(i) ||
            miSudoku.guardaColumna(columnaClicActual).includes(i) ||
            miSudoku.guardarMiniSudoku(miniSudokuClicActual).includes(i)))
            {
                //console.log(id + " id ");
                inputsNoValidos.push(i);
                //console.log(inputsNoValidos);
                document.getElementById(id).classList.add("bloqueada");
            }
            else
            {
                document.getElementById(id).classList.remove("bloqueada");
            }
        }
    }
    function nuevoSudoku(evento) 
        {
            evento.preventDefault();
            document.getElementById('nuevoSudoku').innerText = "Generar nuevo sudoku"
            
            const nivelSelect = document.getElementById('nivelSelect');
            const porcentaje = parseFloat(nivelSelect.value);
            
            miSudoku.nuevo();
            miSudoku.datos = new Sudoku().datos;
            miSudoku.datosBackUp = [...miSudoku.datos];
            miSudoku.muestra(porcentaje);
            
        }
    document.getElementById('nivelSelect').addEventListener('change', nuevoSudoku);


    function resaltarFila(fila) 
    {
        for (let i = 0; i < 9; i++) 
        {
            const celda = document.getElementById('td' + (fila * 9 + i));
            celda.classList.add('resaltada');
        }
    }

    function resaltarColumna(columna) 
    {
        for (let i = 0; i < 9; i++) 
        {
            const celda = document.getElementById('td' + (i * 9 + columna));
            celda.classList.add('resaltada');
        }
    }

    function resaltarMiniSudoku(miniSudoku) {
        const filaInicio = Math.floor(miniSudoku / 3) * 3;
        const columnaInicio = (miniSudoku % 3) * 3;

        for (let fila = 0; fila < 3; fila++) {
            for (let col = 0; col < 3; col++) {
                const celda = document.getElementById('td' + ((filaInicio + fila) * 9 + columnaInicio + col));
                celda.classList.add('resaltada');
            }
        }
    }

    function quitarResaltado() 
    {
        const celdas = document.querySelectorAll('.resaltada');
        celdas.forEach(celda => 
            {
            celda.classList.remove('resaltada');
        });
    }

function clickEnTabla(evento) 
{
    if (evento.target.id.charAt(0) != 't' || evento.target.id.charAt(1) != 'd')
    {
        return;
    }
        if (!esCeldaGenerada(document.getElementById(evento.target.id)))
            celdaActualTablero = document.getElementById(evento.target.id);
        //console.log(celdaActualTablero.id.substring(2));
    if (celdaUltimoFoco != -1) 
    {
        document.getElementById(celdaUltimoFoco).classList.remove("gamehighlighttd");
        quitarResaltado();
        celdaUltimoFoco = -1;
    }
    
    if (!esCeldaGenerada(evento.target)) 
    {
            evento.target.classList.add("gamehighlighttd");
            celdaUltimoFoco = evento.target.id;
            indiceFila();
            indiceColumna();
            indiceMiniSudoku();
            bloquearInputsNoValidos();

            // Resaltar fila, columna y miniSudoku
            resaltarFila(filaClicActual);
            resaltarColumna(columnaClicActual);
            resaltarMiniSudoku(miniSudokuClicActual);
        }
}

function esCeldaGenerada(celda) 
{
    return celda.classList.contains("generada");
}

function clickEnTablaAbajo(evento) 
{
    if (evento.target.id.charAt(0) != 't' || evento.target.id.charAt(1) != 'd') 
    {
        return;
    }
    celdaActualAbajo = evento.target.id;

    if (celdaUltimoFocoAbajo != -1) 
    {
        document.getElementById(celdaUltimoFocoAbajo).classList.remove("gamehighlighttd");
    }

    // si queremos seleccionar un numero sin haber seleccionado una casilla del tablero de juego
    if (celdaUltimoFoco == -1) 
    {
        alert("Selecciona una casilla válida del sudoku");
    } 
    else // si ya tenemos un numero seleccionado
    { 
        celdaUltimoFocoAbajo = evento.target.id;
        evento.target.classList.add("gamehighlighttd");
        valorCeldaAbajo = evento.target.innerText;
        //alert(!esCeldaGenerada(celdaActualTablero));

        if (!esCeldaGenerada(celdaActualTablero)) 
        {
            if (valorCeldaAbajo === "Borrar")
            {
                valorCeldaAbajo = '  ';
            }
            // Actualizar el array de datos
            const indice = parseInt(celdaActualTablero.id.substring(2)); //cortamos solo los numeros del id
            //alert(indice);
            
            //si hemos borrado 
            //alert(!esCeldaGenerada(evento.target));
            
            if (!esCeldaGenerada(evento.target))
            {
                if (valorCeldaAbajo === '  ')
                    miSudoku.datos[indice] = 0;
                else
                    miSudoku.datos[indice] = parseInt(valorCeldaAbajo);
            
                celdaActualTablero.innerText = valorCeldaAbajo; 
            }


        }
        console.log(valorCeldaAbajo);
        // funcion que simula el efecto click en los numeros y elimina de nuevo el estilo seleccionado
        setTimeout(function () {
            evento.target.classList.remove("gamehighlighttd");
        }, 100);
    }
}




function deseleccionarCeldaActual() 
{
    if (celdaUltimoFoco != -1) 
    {
        const celdaActual = document.getElementById(celdaUltimoFoco);
        if (celdaActual) 
        {
            celdaActual.classList.remove("gamehighlighttd");
            celdaUltimoFoco = -1;
        }
    }
}

function clicFueraDeTabla(evento) 
{
    const tableroJuego = document.getElementById('playtable');

    //si el clic no fue dentro de la tabla
    if (!tableroJuego.contains(evento.target)) 
    {
        deseleccionarCeldaActual();
        quitarResaltado();
    }
}

function meRindo()
{
    miSudoku.datos = [...miSudoku.datosBackUp];
    console.log(miSudoku.datos);
    miSudoku.muestra(1);
    document.getElementById('nuevoSudoku').innerText = "Otra partida"
}

function resuelto()
{
    if(miSudoku.estaResuelto())
        alert("¡El sudoku está resuelto correctamente!")
    else
    alert("El sudoku no está resuelto")
}

function inputConTeclado(evento) 
{
    const teclaPresionada = evento.key;

    if (teclaPresionada >= '1' && teclaPresionada <= '9' && !inputsNoValidos.includes(parseInt(teclaPresionada))) 
    {
        // Si se presiona una tecla del 1 al 9, intenta colocar el número en la celda actual
        if (celdaActualTablero !== -1 && !esCeldaGenerada(celdaActualTablero)) 
        {
            const indice = parseInt(celdaActualTablero.id.substring(2)); // Cortamos solo los números del id
            miSudoku.datos[indice] = parseInt(teclaPresionada);
            celdaActualTablero.innerText = teclaPresionada;
            bloquearInputsNoValidos();
        }
    } else if (teclaPresionada === 'Backspace' || teclaPresionada === 'Delete') 
    {
        // Si se presiona la tecla de borrar, borra el contenido de la celda actual
        if (celdaActualTablero !== -1 && !esCeldaGenerada(celdaActualTablero)) 
        {
            const indice = parseInt(celdaActualTablero.id.substring(2));
            miSudoku.datos[indice] = 0;
            celdaActualTablero.innerText = ' ';
            bloquearInputsNoValidos();
        }
    }
}
document.addEventListener('click', clicFueraDeTabla);
document.getElementById('playtable').addEventListener('click', clickEnTabla);
document.getElementById('selectArea').addEventListener('click', clickEnTablaAbajo);
document.getElementById('playarea').addEventListener('click', clickEnTabla);
document.getElementById('nuevoSudoku').addEventListener('click', nuevoSudoku);

document.getElementById('meRindo').addEventListener('click', meRindo);
document.getElementById('resuelto').addEventListener('click', resuelto);

document.addEventListener('keydown', inputConTeclado);

//que el sudoku se ejecute cada vez que se recarga la pagina
window.addEventListener('load',nuevoSudoku(new Event('')));