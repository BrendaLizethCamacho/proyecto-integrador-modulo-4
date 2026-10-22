// Se utiliza PascalCase para los archivos que tienen clases

/** IMPORTACIÓN DE UTILIDADES */
/** Se importa generarId() para asignar un identificador a cada movimiento*/
import { generarId } from "../utils/helpers.js";

/** CLASE MOVIMIENTO
Clase que representa una operación realizada dentro del sistema bancario
* Tipo de operación
* Cantidad involucrada en la operación
* Descripción del movimiento (opcional)
* Cuenta de origen de la operación */

export class Movimiento {
  constructor({
    id = generarId(),
    tipo,
    monto,
    descripcion = "",
    cuentaOrigen = null,
    cuentaDestino = null,
    saldoResultante = null,
    fecha = new Date().toISOString(),
  }) {
    // ASIGNACIÓN DE PROPIEDADES
    // this hace referencia al objeto individual que se está creando
    this.id = id;
    this.tipo = tipo;
    this.monto = Number(monto);
    this.descripcion = descripcion;
    this.cuentaOrigen = cuentaOrigen;
    this.cuentaDestino = cuentaDestino;
    this.saldoResultante = saldoResultante;
    this.fecha = fecha;
  }
}
