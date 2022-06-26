const barraDeMensaje = document.getElementById('barraDeMensaje');
const botonDeEnviar = document.getElementById('botonDeEnviar');
const logearse = document.getElementById('logearse');
const mail = document.getElementById('mail');
const contenedorDeMensajes = document.getElementById('contenedorDeMensajes');

barraDeMensaje.disabled = true;
botonDeEnviar.disabled = true;


let email = "";

logearse.addEventListener('click', ()=>{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)){
        
        console.log('Email Valido');
        barraDeMensaje.disabled = false;
        botonDeEnviar.disabled = false;
        let cosa = mail.value;
        email = cosa;
    }else{
        console.log('Email invalido');
    }
})

botonDeEnviar.addEventListener('click', event=>{
    if(barraDeMensaje.value != ""){
    console.log(barraDeMensaje.value);
    let date1 = new Date();
    let date = date1.toISOString().split('T')[0];
    const msssj = barraDeMensaje.value;
    
    barraDeMensaje.value = "";
    socket.emit('mensaje', {email, date, msssj} )

    }
})

socket.on('mensaje', function(data){
    let date1 = new Date();
    let date = date1.toISOString().split('T')[0];
    const msj = document.createElement('li');
    msj.innerHTML = `<p style ="color: blue; font-weight: bold; display: inline-block;">${data.email}</p> <p style ="color: brown; display: inline-block;">${date1.toISOString().split('T')[0]}</p> <p style ="color: green; font-style: italic; display: inline-block;">${data.msssj}</p>`;
    contenedorDeMensajes.append(msj);
})