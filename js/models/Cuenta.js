// Se utiliza PascalCase para los archivos que tienen clases

/** IMPORTACIÓN DE UTILIDADES */
/** Se importa generarId() para asignar un identificador a cada cuenta*/
import { generarId } from "../utils/helpers.js";

/** CLASE CUENTA
Clase que representa una cuenta bancaria perteneciente a un usuario */
export class Cuenta {
  constructor({
    id = generarId(),
    numeroCuenta,
    // Si no se indica otro tipo, la cuenta será de tipo "Ahorro"
    tipo = "Ahorro",
    // Una nueva cuenta empieza con saldo en 0
    saldo = 0,
    // Identificador del usuario propietario de la cuenta
    usuarioId,
    // El método toISOString() devuelve una cadena de la fecha en formato ISO
    fechaApertura = new Date().toISOString(),
    activa = true,
  }) {
    // ASIGNACIÓN DE PROPIEDADES
    // this hace referencia al objeto individual que se está creando
    this.id = id;
    this.numeroCuenta = numeroCuenta;
    this.tipo = tipo;
    // Se almacena el saldo como número
    this.saldo = Number(saldo);
    this.usuarioId = usuarioId;
    this.fechaApertura = fechaApertura;
    this.activa = activa;
  }

  /** DEPOSITAR
    Realizar el incremeto del saldo actual utilizando el monto recibido */
  depositar(monto) {
    this.saldo += Number(monto);
    return this.saldo;
  }

  /** RETIRAR
    Realizar la disminución del saldo actual utilizando el monto recibido */
  retirar(monto) {
    this.saldo -= Number(monto);
    return this.saldo;
  }
}
