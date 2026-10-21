/** FORMATEADOR DE LA INFORMACIÓN 
Aquí se encontrará funciones que preparán la información antes de presentarla
visualmente al usuario */

// Conversión del valor a pesos mexicanos
export function formatCurrency(valor) {
    const numero = Number(valor)
    if (!Number.isFinite(numero)) {
        return "$0.00"
    }
    // FORMATEAR MONEDA
    return numero.toLocaleString("es-MX",{
        style: "currency",
        currency: "MXN"
    })
}

// FORMATEAR FECHA A LA CONFIGURACIÓN REGIONAL DE MÉXICO
export function formatDate(fecha) {
    const fechaObjeto = new Date(fecha);
    // Validación para verificar que la fecha sea válida
    if (Number.isNaN(fechaObjeto.getTime())) {
        return '';
    }
    // Formatear fecha con toLocaleDateString()
    return fechaObjeto.toLocaleDateString('es-MX');
}

// FORMATEAR NÚMERO DE CUENTA
export function formatAccountNumber(numeroCuenta) {
    const numero = String(numeroCuenta ?? '');
    // SEPARAR GRUPOS DE CUATRO DÍGITOS 
    // return numero.replace(/(\d{4})(?=\d)/g, '$1 ', );
    let cuentaFormateada = ""
    for (let i = 0; i < numero.length; i++) {
        // Agrega un espacio cada 4 carácteres
        if (i > 0 && i % 4 === 0) {
            cuentaFormateada += " "
        }
        cuentaFormateada += numero[i]
    }
    return cuentaFormateada
}