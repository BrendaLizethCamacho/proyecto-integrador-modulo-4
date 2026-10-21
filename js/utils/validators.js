/** VALIDACIONES GENERALES
Aquí se concentrarán funciones para comprobar que los datos
sean válidos */

/** VALIDAR EXISTENCIA DEL VALOR */
export function validarCampoObligatorio(valor) {
    return(
        // El valor no debe ser undefined ni null
        // Convierte el valor a texto y elimina espacios 
        // al principio y al final
        valor !== undefined && valor !== null && String(valor).trim() !== ""
    )
}

/** VALIDACIÓN DEL MONTO */
export function validarMonto(monto) {
    const montoNumerico = Number(monto)
    // isFinite() verifica que sea un número finito
    return(Number.isFinite(montoNumerico) && montoNumerico > 0)
}