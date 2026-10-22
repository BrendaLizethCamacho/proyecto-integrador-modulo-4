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
console.log("Sistema de Gestión Bancaria - v0.4.0");

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
import { Banco } from "./models/Banco.js";

const bancoDemo = new Banco();

/** USUARIO 
Generación del primer objeto a partir del modelo Usuario */
const usuarioDemo = new Usuario({
    nombre: "Brenda Camacho",
    email: "brendacamacho@gmail.com",
    telefono: "7225015630",
    password: "123456"
})
// Se agrega el usuario
bancoDemo.agregarUsuario(usuarioDemo)
// Se muestra el usuario creado
console.log("Usuarios registrados:", bancoDemo.usuarios)

/** CUENTA
Generación de una cuenta y la asociación al usuario utilizando su ID */
const cuentaDemo = new Cuenta({
  numeroCuenta: "123456789101",
  usuarioId: usuarioDemo.id,
})
// Se agrega la cuenta
bancoDemo.agregarCuenta(cuentaDemo)

/** DEPÓSITO
Generación de un depósito desde la cuenta creada utilizando 
el método realizarDeposito() */
const depositoDemo = bancoDemo.realizarDeposito({
  cuentaId: cuentaDemo.id,
  monto: 1000,
  descripcion: "Primer depósito"
})
// Se muestra el saldo
console.log("Saldo actual:", formatCurrency(cuentaDemo.saldo))
// Se muestra el movimiento
console.log("Movimiento:", depositoDemo)
// Se muestra el historial
console.log("Movimientos registrados:", bancoDemo.movimientos)

// BÚSQUEDA POR ID
const usuarioEncontrado = bancoDemo.buscarUsuarioPorId(usuarioDemo.id)
// Se muestra si lo encontró
console.log("Usuario encontrado:", usuarioEncontrado)
console.log(usuarioEncontrado === usuarioDemo)

// OBTENER CUENTAS DE USUARIOS
const cuentasUsuario = bancoDemo.obtenerCuentasDeUsuario(usuarioDemo.id)
// Se muestran las cuentas
console.log("Cuentas del usuario:", cuentasUsuario)

/** PRUEBA DE ERROR
Depósito con un monto inválido */
try {
  bancoDemo.realizarDeposito({
    cuentaId: cuentaDemo.id,
    monto: -1000
  })
} catch (error) {
  console.log("Error prueba:", error.message)
}