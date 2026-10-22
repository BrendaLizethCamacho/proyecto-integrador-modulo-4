/** FUNCIONES AUXILIARES */

export function generarId() {
    /* Date.now() devuelve la cantidad de milisegundos transcurridos desde el 1 de enero de 1970. */
    /* Math.random() genera un número pseudoaleatorio entre 0 y 1. */    
    /* Tomamos solamente una parte del resultado generado. */
    //return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    
    /** crypto.randomUUID() permite obtener valores aleatorios 
    criptográficamente fuertes*/ 
    return(crypto.randomUUID())
}

/** GENERAR NÚMERO DE CUENTA DE 12 DÍGITOS */
export function generarNumeroCuenta() {
    let numeroCuenta = '';
	/** GENERAR 12 DÍGITOS ALEATORIOS */
    for (let i = 0; i < 12; i += 1) {
        numeroCuenta += Math.floor(Math.random() * 10)
    }
	/** DEVOLVER RESULTADO */
    return numeroCuenta;
}