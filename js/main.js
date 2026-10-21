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

/** PUNTO DE ENTRADA DE LA APLICACIÓN */
/** Comprobación en consola para validar que la importación 
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
