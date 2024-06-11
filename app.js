/*@utor: Gian Carlo*/

const A = ["ai","enter","imes","ober","ufat"]; /*comentar para personalizado */
const B = ["a","e","i","o","u"];

function cajaDe(ide){
    return document.querySelector("#"+ide);
}

function inicio(){    
    let texto = cajaDe("texto-a-encriptar"); 
    if(window.screen.availWidth <= 375){        
        texto.addEventListener("input",tipear);
        tipearResultado = ()=>{masAltura("texto-resultado",432);};
        tipear();
        tipearResultado();
        }else{
        texto.removeEventListener("input",tipear);
        tipearResultado = ()=>{};
        texto.style="height:''";
        cajaDe("texto-resultado").style="height:''";
    }
}

function masAltura(ide,maxh){
    let h = cajaDe(ide);    
    let hc = h.clientHeight;
    let hs = h.scrollHeight;        
    if(hs != hc && hs <= maxh){                
        h.style.height = h.scrollHeight + "px";                
    }else if(hs > maxh){
        h.style.height = maxh + "px";                
    }else{
        if(capturar() == ''){            
            h.style="height:''";
        }
    }
}

function tipear(){
    masAltura("texto-a-encriptar",624);
}

function tipearResultado(){      
        
}

function capturar(){ 
    return cajaDe("texto-a-encriptar").value;
}

function escribir(texto){
    cajaDe("id-mensaje").style.display="none";
    cajaDe("id-resultado").style.display="block";
    cajaDe("texto-resultado").value = texto;
}

function sinTexto(){
    cajaDe("id-mensaje").style.display="block";
    cajaDe("id-resultado").style.display="none";
    cajaDe("texto-resultado").value = "";
}

function validar(texto){    
    return /[^a-z !]/.test(texto); 
}

function convertirToArreglo(texto){ 
    return texto.split('');
}

function getLlave(termino){ 
    let res = "";
    let encriptadas = A
    let aEncriptar = B
    for(let i = 0; i < aEncriptar.length; i++){
        if(termino == aEncriptar[i]){
            res = encriptadas[i];
            break;
        }else if(termino == encriptadas[i]){
            res = aEncriptar[i];
            break;
        }else{
            res = 0;
        }
    }
    return res;
}

function intercambioDe(llave){
    let temp = [];
    let tempi = [];
    let resTemp = "";
    let capturado = capturar();
     if(capturado != ""){
        if(!validar(capturado)){
            let arreglo = convertirToArreglo(capturado);
            for(let i = 0; i < arreglo.length; i++){                                
                for(let k = 0; k < llave.length; k++){
                    temp = convertirToArreglo(llave[k]);                   
                    if(!llave[k].indexOf(arreglo[i])){                    
                        for(let j = 0; j < temp.length; j++){
                            if(arreglo[i + j] == temp[j]){
                                tempi.push(arreglo[i + j]);                               
                            }
                        }
                        tempi = tempi.toString().replace(/,/g,'');
                        if(tempi == llave[k]){                            
                            if(resTemp.length < tempi.length){
                                resTemp = tempi;
                            }
                        }                        
                        tempi = [];                                                
                    }
                }            
                if(resTemp.length > 0){
                    arreglo.splice(i,resTemp.length,getLlave(resTemp));                                        
                }    
                resTemp = "";
            }
            escribir(arreglo.toString().replace(/,/g,''));
        }else{
            alert("Sólo letras minúsculas y sin acentos");   
        }
    }else{
        sinTexto();
    }
    return;
}

function encriptar(){
    intercambioDe(B);  
    tipearResultado();   
    return;
}

function desencriptar(){
    intercambioDe(A);        
    tipearResultado();
    return;
}

function copiarAPortapapeles(){ 
    let resultado = cajaDe("texto-resultado");    
    resultado.select();    
    navigator.clipboard.writeText(resultado.value);
    alert("Texto copiado");
}

function cambiar(tema){
    let doc = cajaDe("colores-tema");
    doc.setAttribute("href",tema+".css");    
}

function temaOriginal(){
    cambiar("original");    
}

function temaOscuro(){
    cambiar("oscuro");
}


