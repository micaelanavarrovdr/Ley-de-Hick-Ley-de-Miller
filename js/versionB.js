document.getElementById('bigForm').addEventListener('submit', function(e){
    e.preventDefault(); // Evita envío automático

    const inputs = e.target.querySelectorAll('input');
    const values = Array.from(inputs).map(i => i.value.trim());

    const [fullName, address, number, postalCode, phone,
           cardNumber, cardHolder, dni, expiry, cvc] = values;

    // Validaciones básicas
    if(!fullName){ alert("Nombre completo es requerido"); return; }
    if(!address){ alert("Dirección es requerida"); return; }
    
    if(!/^\d+$/.test(number)){ alert("Número de domicilio inválido"); return; }
    if(!/^\d+$/.test(postalCode)){ alert("Código postal inválido"); return; }
    if(!/^\d+$/.test(phone)){ alert("Teléfono inválido"); return; }

    if(!/^\d{13,19}$/.test(cardNumber.replace(/\s/g,''))){ alert("Número de tarjeta inválido"); return; }
    if(!cardHolder){ alert("Titular de tarjeta es requerido"); return; }
    if(!/^\d{7,10}$/.test(dni)){ alert("DNI inválido"); return; }
    if(!/^\d{2}\/\d{2}$/.test(expiry)){ alert("Fecha de vencimiento inválida (MM/AA)"); return; }
    if(!/^\d{3,4}$/.test(cvc)){ alert("CVC inválido"); return; }

    alert("Formulario válido! Procesando pago...");
});

// Bloquear caracteres no numéricos solo en campos que son realmente números
const numericFields = [2,3,4,5,7,8,9]; // número domicilio, código postal, teléfono, tarjeta, DNI, fecha, CVC
const formInputs = document.querySelectorAll('#bigForm input');

numericFields.forEach(i => {
    formInputs[i].addEventListener('input', function(){
        this.value = this.value.replace(/\D/g,''); // solo números
        switch(i){
            case 2: this.maxLength=10; break; // número de domicilio
            case 3: this.maxLength=10; break; // código postal
            case 4: this.maxLength=15; break; // teléfono
            case 5: this.maxLength=19; break; // tarjeta
            case 7: this.maxLength=10; break; // DNI
            case 8: this.maxLength=5; break;  // fecha MM/AA
            case 9: this.maxLength=4; break;  // CVC
        }
    });
});

// Formateo automático de tarjeta
formInputs[5].addEventListener('input', function(){
    this.value = this.value.replace(/\s/g,'').replace(/(.{4})/g,'$1 ').trim();
});

// Formateo automático de fecha MM/AA
formInputs[8].addEventListener('input', function(){
    let val = this.value.replace(/\D/g,'');
    if(val.length > 4) val = val.slice(0,4);
    if(val.length > 2) val = val.slice(0,2)+'/'+val.slice(2);
    this.value = val;
});
