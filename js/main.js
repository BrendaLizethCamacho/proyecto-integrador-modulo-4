/** IMPORTACIÓN DE VALIDADORES, HELPERS Y FORMATEADORES */

// Importación de validadores.
import { validarCampoObligatorio } from "./utils/validators.js";

// Importación de helpers
import { generarNumeroCuenta } from "./utils/helpers.js";

// Importación de formateadores
import { formatAccountNumber } from "./utils/formatters.js";

/** IMPORTACIÓN DE MODELOS */
import { Cuenta } from "./models/Cuenta.js";
import { Usuario } from "./models/Usuario.js";

/** IMPORTACIÓN DE SERVICIOS
 * STORAGE_KEYS: tiene las claves oficiales
 * storageService: permite guardar y recuperar los datos
 */
import { STORAGE_KEYS, storageService } from "./services/StorageService.js";
import { authService } from "./services/AuthService.js";

/** INICIALIZAR STORAGE */
function inicializarStorage() {
  // Se recupera el usuario
  const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, null)
  // Se recupera la cuenta
  const cuentas = storageService.obtener( STORAGE_KEYS.CUENTAS, null)
  // Se recuperan los movimientos
  const movimientos = storageService.obtener(STORAGE_KEYS.MOVIMIENTOS, null)
	// Se crea el usuario si no existe
  if (usuarios === null) {
    storageService.guardar(STORAGE_KEYS.USUARIOS, [])
  }
  // Se crea la cuenta si no existe
  if (cuentas === null) {
    storageService.guardar(STORAGE_KEYS.CUENTAS, [])
  }
  // Se crean los movimientos si no existen
  if (movimientos === null) {storageService.guardar(
    STORAGE_KEYS.MOVIMIENTOS, [])
  }
}

/** MANEJAR REGISTRO */
function manejarRegistro(event) {
  /** EVITAR ENVÍO TRADICIONAL
  Se impide que el formulario recargue automáticamente la página */
  event.preventDefault();
	// Se obtiene el nombre
  const nombre = document.querySelector('#registroNombre').value.trim()
  // Se obtiene el correo
  const email = document.querySelector('#registroEmail').value.trim().toLowerCase()
  // Se obtiene el teléfono
  const telefono =document.querySelector('#registroTelefono').value.trim();
  // Se obtiene la contraseña
  const password = document.querySelector('#registroPassword').value
  // Se confirma la contraseña
  const confirmarPassword = document.querySelector('#registroConfirmPassword').value

  /** VALIDACIÓN DE CAMPOS OBLIGATORIOS */
  if (!validarCampoObligatorio(nombre) || 
    !validarCampoObligatorio(email) ||
    !validarCampoObligatorio(password)) {
    /* Mostramos una alerta si faltan datos obligatorios. */
    Swal.fire({
        icon: 'warning',
        title:'Campos incompletos',
        text:'Completa los campos obligatorios.',
    });
    return;
  }

  /** VALIDACIÓN DE LA LONGITUD DE LA CONTRASEÑA */
  if (password.length < 6) {
    Swal.fire({
      icon: 'warning',
      title:'Contraseña inválida',
      text:'La contraseña debe tener al menos 6 caracteres.',
    });
    return;
  }

  /** COMPARACIÓN DE CONTRASEÑAS */
  if (password !== confirmarPassword) {
    Swal.fire({
      icon: 'warning',
      title:'Contraseñas distintas',
      text:'Las contraseñas no coinciden.',
    })
    return
  }
  
  /** RECUPERACIÓN DE USUARIOS */
  const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, [])

  /** BUSCAR CORREO DUPLICADO
  some() comprueba si al menos un elemento del array cumple 
  con la condición */
  const emailExistente = usuarios.some((usuario) => 
    usuario.email.toLowerCase() === email)

  /** DETENER EN CASO DE QUE EL CORREO ESTÉ DUPLICADO */
  if (emailExistente) {
    Swal.fire({
      icon: 'error',
      title:'Correo registrado',
      text:'Ya existe un usuario con este correo.',
    })
    return
  }

  /** CREAR EL USUARIO DESDE EL FORMULARIO
  Se utilizará el modelo Usuario */
  const nuevoUsuario = new Usuario({
    nombre,
    email,
    telefono,
    password
  })

  /** NÚMERO DE CUENTA */
  let numeroCuenta

  /** GENERACIÓN DE UN NÚMERO DE CUENTA ÚNICO
  do...while crea un bucle que ejecuta una sentencia especificada, 
  hasta que la condición de comprobación se evalúa como falsa */
  do {
    numeroCuenta = generarNumeroCuenta()
  } while (
    /* Recuperamos todas las cuentas y verificamos si alguna 
    cuenta ya tiene ese número. */
    storageService.obtener(STORAGE_KEYS.CUENTAS,[]).some(
      (cuenta) => cuenta.numeroCuenta === numeroCuenta)
    )
  /** Si el número ya existe se genera otro número de cuenta
  Si no existe se crea la cuenta */
  
  /** CREACIÓN DE LA CUENTA
  Se relaciona la cuenta con el usuario registrado */
  const nuevaCuenta = new Cuenta({
    numeroCuenta,
    tipo: 'Ahorro',
    saldo: 0,
    usuarioId: nuevoUsuario.id
  })

  /** RECUPERACIÓN DE LAS CUENTAS */
  const cuentas = storageService.obtener( STORAGE_KEYS.CUENTAS, [])

  /** SE AGREGA EL USUARIO */
  usuarios.push(nuevoUsuario)
	
  /** SE AGREGA LA CUENTA */
  cuentas.push(nuevaCuenta)

  /** SE GUARDAN LOS USUARIOS */
  storageService.guardar(STORAGE_KEYS.USUARIOS, usuarios)

  /** SE GUARDAN LAS CUENTAS */
  storageService.guardar(STORAGE_KEYS.CUENTAS, cuentas)

  /** REGISTRO EXITOSO */
  Swal.fire({
    icon: 'success',
    title: 'Registro exitoso',
    text: 'Tu usuario y cuenta bancaria fueron creados correctamente.',
    confirmButtonText: 'Continuar',
  }).then(() => {
    /** SE LIMPIA EL FORMULARIO */
    document.querySelector('#formRegistro').reset();
    /** SE COPIA EL CORREO AL LOGIN */
    document.querySelector('#loginEmail').value = email
  })
}

/** MANEJAR LOGIN */
function manejarLogin(event) {
  /** SE ENVITA EL ENVÍO AUTOMÁTICO */
  event.preventDefault();

  /** SE OBTIENE EL EMAIL */
  const email = document.querySelector('#loginEmail').value.trim().toLowerCase()

  /** SE OBTIENE LA CONTRASEÑA */
  const password = document.querySelector('#loginPassword').value

  /** VALIDACIÓN DE CAMPOS */
  if (!validarCampoObligatorio(email) || !validarCampoObligatorio(password)) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Ingresa tu correo y contraseña.',
    })
    return
  }

  /** SE INTENTA LOGIN */
  try {
    /** AUTENTICACIÓN DEL USUARIO */
    const usuario = authService.login(email, password)
    /** LOGIN EXITOSO */
    Swal.fire({
      icon: 'success',
      title: `Bienvenido, ${usuario.nombre}`,
      text: 'Inicio de sesión correcto.',
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      /** REDIGIR AL DASHBOARD */
      window.location.href ='dashboard.html'
    });
    } catch (error) {
      /** LOGIN INCORRECTO */
      Swal.fire({
        icon: 'error',
        title: 'No fue posible iniciar sesión',
        text: error.message,
      });
    }
}

/** INICIALIZAR APLICACIÓN */
function init() {
  /** PREPARACIÓN DEL LOCALSTORAGE */
  inicializarStorage();
  /** COMPROBACIÓN DE SESIÓN
  Si ya existe un usuario autenticado, lo enviamos directamente al dashboard. */
  if (authService.getCurrentUser()) {
    window.location.href ='dashboard.html'
    return
  }
  /** OBTENCIÓN DEL LOGIN */
  const formLogin = document.querySelector('#formLogin')

  /** OBTENCIÓN DEL REGISTRO */
  const formRegistro = document.querySelector('#formRegistro')

	/* ===================================== 
				EVENTO LOGIN 
	Cuando ocurra submit, ejecutar manejarLogin().
	===================================== */
    if (formLogin) {
        formLogin.addEventListener(
            'submit',
            manejarLogin,
        );
    }

	/* ===================================== 
				EVENTO REGISTRO
	Cuando ocurra submit, ejecutar manejarRegistro(). 
	===================================== */
    if (formRegistro) {
        formRegistro.addEventListener(
            'submit',
            manejarRegistro,
        );
    }
}

/* ========================================= 
			EJECUTAR INICIALIZACIÓN 
========================================= */
init();