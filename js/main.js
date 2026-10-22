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

/** IMPORTACIÓN DE LOS MODELOS */
import { Cuenta } from "./models/Cuenta.js";
import { Movimiento } from "./models/Movimiento.js";
import { Usuario } from "./models/Usuario.js";
import { Banco } from "./models/Banco.js";

/** IMPORTACIÓN DE SERVICIOS
 * STORAGE_KEYS: tiene las claves oficiales
 * storageService: permite guardar y recuperar los datos
 */
import { STORAGE_KEYS, storageService } from "./services/StorageService.js";

// Versión actual del proyecto
console.log("Sistema de Gestión Bancaria - v0.5.0");

/** GUARDAR ESTADO DEL BANCO
Función de persistencia en LocalStorage
Recibe una instancia de Banco y persiste sus tres colecciones. */
function guardarBanco(banco) {
  // Guardar usuarios
  storageService.guardar(STORAGE_KEYS.USUARIOS, banco.usuarios);
  // Guardar cuentas
  storageService.guardar(STORAGE_KEYS.CUENTAS, banco.cuentas);
  // Guardar movimientos
  storageService.guardar(STORAGE_KEYS.MOVIMIENTOS, banco.movimientos);
}

/** CARGAR BANCO
Función para cargar los datos del bancos
Recupera la información, la reconstruye y crea el banco */
function cargarBanco() {
  // Recupera usuarios
  const usuariosGuardados = storageService.obtener(STORAGE_KEYS.USUARIOS, []);
  // Recupera cuentas
  const cuentasGuardadas = storageService.obtener(STORAGE_KEYS.CUENTAS, []);
  // Recupera movimientos
  const movimientosGuardados = storageService.obtener(
    STORAGE_KEYS.MOVIMIENTOS,
    [],
  );
  /** RECONSTRUCCIÓN DE LAS INSTANCIAS */
  // Reconstruir usuarios
  // map() recorre cada elemento y crea una nueva instancia de Usuario
  const usuarios = usuariosGuardados.map((usuario) => new Usuario(usuario));
  // Reconstruir cuentas
  const cuentas = cuentasGuardadas.map((cuenta) => new Cuenta(cuenta));
  // Reconstruir movimientos
  const movimientos = movimientosGuardados.map(
    (movimiento) => new Movimiento(movimiento),
  );
  /** RECONSTRUCCIÓN DEL BANCO
  Se utilizan las colecciones reconstruidas */
  return new Banco({
    usuarios,
    cuentas,
    movimientos,
  });
}

/** PUNTO DE ENTRADA DE LA APLICACIÓN 
Comprobación en consola para validar que la importación 
del script desde el HTML fue exitosa */

// Validación de campo para verificar que se obtenga true
console.log("Campo obligatorio:", validarCampoObligatorio("Banco Digital"));

// Validación del monto para verificar que se obtenga true
console.log("Monto válido:", validarMonto(1000));

// Auxiliación en la generación de un ID dinámico
console.log("ID:", generarId());

// Preparación del número de cuenta para que visualmente tenga una separación cada 4 dígitos
console.log("Número de cuenta:", formatAccountNumber("123456789101"));

// Preparación del monto para que aparezca en moneda MXN
console.log("Formateo del monto:", formatCurrency(1000));

// Preparación de la fecha
console.log("Fecha:", formatDate(new Date()));

/** CARGAR BANCO
cargarBanco() primero busca información guardada antes de 
crear la instancia */
const bancoDemo = cargarBanco();

/** VALIDAR SI EL BANCO ESTÁ VACÍO
Se inicializarán datos demos si el banco está vacío */
if (bancoDemo.usuarios.length === 0) {
  /** CREACIÓN DE UN USUARIO 
  Generación del primer objeto a partir del modelo Usuario */
  const usuarioDemo = new Usuario({
    nombre: "Brenda Camacho",
    email: "brendacamacho@gmail.com",
    telefono: "7225015630",
    password: "123456",
  });
  // Se agrega el usuario
  bancoDemo.agregarUsuario(usuarioDemo);

  /** CREACIÓN DE UNA CUENTA
  Generación de una cuenta y la asociación al usuario utilizando su ID */
  const cuentaDemo = new Cuenta({
    numeroCuenta: "123456789101",
    usuarioId: usuarioDemo.id,
  });
  // Se agrega la cuenta
  bancoDemo.agregarCuenta(cuentaDemo);

  /** CREACIÓN DE UN DEPÓSITO
  Generación de un depósito desde la cuenta creada utilizando 
  el método realizarDeposito() */
  bancoDemo.realizarDeposito({
    cuentaId: cuentaDemo.id,
    monto: 1000,
    descripcion: "Primer depósito",
  });
  /** GUARDAR BANCO
  Después de todas las operaciones persistimos el nuevo estado */
  guardarBanco(bancoDemo);
  console.log("Datos iniciales creados y guardados.")
}

/** COMPROBAR DATOS RECUPERADOS */
// Se muestra el banco recuperado
console.log("Banco recuperado:", bancoDemo);

// Se muestran los usuarios
console.log("Usuarios guardados:", bancoDemo.usuarios);

// Se muestran las cuentas
console.log("Cuentas guardadas:", bancoDemo.cuentas);

// Se muestran los movimientos
console.log("Movimientos guardados:", bancoDemo.movimientos);

/** OBTENCIÓN DE LA PRIMERA CUENTA
Guardamos la primera cuenta si existe al menos una cuenta */
const primeraCuenta = bancoDemo.cuentas[0] || null;
/** SALDO DE LA PRIMERA CUENTA */
if (primeraCuenta) {
  // Se convierte el saldo a formato monetario antes de mostrarlo
  console.log("Saldo persistido:", formatCurrency(primeraCuenta.saldo));
  // COMPROBAR INSTANCIA CUENTA
  /** instanceof verifica si un objeto en su cadena de prototipos 
  contiene la propiedad prototype de un constructor*/
  console.log(
    "¿La cuenta recuperada sigue siendo una instancia de Cuenta?",
    primeraCuenta instanceof Cuenta,
  );
  console.log(typeof primeraCuenta.depositar);
}