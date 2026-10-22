/** IMPORTACIÓN DE VALIDADORES, HELPERS Y FORMATEADORES */

// Importación de validadores.
import { validarCampoObligatorio, validarMonto } from "./utils/validators.js";

// Importación de helpers
import { generarId } from "./utils/helpers.js";

// Importación de formateadores
import {
  formatAccountNumber,
  formatCurrency,
  formatDate,
} from "./utils/formatters.js";

/** PUNTO DE ENTRADA DE LA APLICACIÓN 
Comprobación en consola para validar que la importación 
del script desde el HTML fue exitosa */

// Versión actual del proyecto
console.log("Sistema de Gestión Bancaria - v0.2.0");

// Validación de campo para verificar que se obtenga true
console.log("Campo obligatorio:", validarCampoObligatorio("Banco Digital"));

// Validación del monto para verificar que se obtenga true
console.log("Validación del monto:", validarMonto(1000));

// Auxiliación en la generación de un ID dinámico
console.log("ID:", generarId());

// Preparación del número de cuenta para que visualmente tenga una separación cada 4 dígitos
console.log("Número de cuenta:", formatAccountNumber("123456789101"));

// Preparación del monto para que aparezca en moneda MXN
console.log("Formateo del monto:", formatCurrency(1000));

// Preparación de la fecha
console.log("Fecha:", formatDate(new Date()));

/** IMPORTACIÓN DE LOS MODELOS */
import { Cuenta } from "./models/Cuenta.js";
import { Movimiento } from "./models/Movimiento.js";
import { Usuario } from "./models/Usuario.js";

/** USUARIO 
Generación del primer objeto a partir del modelo Usuario */
const usuarioDemo = new Usuario({
    nombre: "Brenda Camacho",
    email: "brendacamacho@gmail.com",
    telefono: "7225015630",
    password: "123456"
})
// Se muestra el usuario creado
console.log("Usuario:", usuarioDemo)

/** CUENTA
Generación de una cuenta y la asociación al usuario utilizando su ID */
const cuentaDemo = new Cuenta({
  numeroCuenta: "123456789101",
  usuarioId: usuarioDemo.id,
})
// Se muestra la cuenta creada
console.log("Cuenta:", cuentaDemo)

/** DEPÓSITO
Generación de un depósito desde la cuenta creada utilizando 
el método depositar() */
cuentaDemo.depositar(1000)
// Se muestra el nuevo saldo usando formatCurrency()
console.log("Saldo después del depósito:", formatCurrency(cuentaDemo.saldo))

/** MOVIMIENTO
Generación de un depósito mediante el modelo movimiento */
const movimientoDemo = new Movimiento({
  tipo: "DEPOSITO",
  monto: 1000,
  descripcion: "Primer depósito",
  // Asociación del movimiento con la cuenta creada
  cuentaOrigen: cuentaDemo.id,
  saldoResultante: cuentaDemo.saldo
})
// Se muestra el movimiento creado
console.log("Movimiento:", movimientoDemo)

// Comprobación de las relaciones entre objetos
console.log(usuarioDemo.id === cuentaDemo.usuarioId)
console.log(cuentaDemo.id === movimientoDemo.cuentaOrigen)