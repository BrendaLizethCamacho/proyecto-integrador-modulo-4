/** Este archivo centraliza
 * Autenticación
 * Sesión
 * Login
 * Logout
 * Usuario Actual
 * Protección de rutas */

/** IMPORTACIÓN DE STORAGE SERVICE
AuthService necesita consultar los usuarios registrados y manejar
la sesión almacenada en LocalStorage */
import { STORAGE_KEYS, storageService } from "./StorageService.js";

/** CLASE AUTHSERVICE */
class AuthService {
    /** MÉTODO INICIAR SESIÓN
    Método que se encarga de recuperar los usuarios registrados
    Si aún no existe ninguno, se utiliza un array vacío */
    login(email, password){
        const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, [])
        /** ESTANDARIZAR CORREO
        Se convierte el valor a string, se eliminan espacios y se 
        transforma a minúsculas */
        const emailNormalizado = String(email).trim().toLowerCase()
        /** BÚSQUEDA DEL USUARIO
        find() devuelve el primer usuario que cumpla con las condiciones:
        * Mismo correo
        * Misma contraseña
        * Usuario activo */
       const usuario = usuarios.find((user) => 
        user.email.toLowerCase() === emailNormalizado &&
        user.password === password &&
        user.activo !== false
       )
       /** CREDENCIALES INCORRECTAS
       Si no se encontró el usuario, se manda un error */
       if (!usuario) {
        throw new Error("Correo o contraseña incorrecta");
       }
       /** CREAR SESIÓN
       Si el usuario existe, se crea la sesión identificando:
       * Qué usuario inició sesión
       * Cuándo inició sesión */
      const sesion = {
        usuarioId: usuario.id,
        fechaInicio: new Date().toISOString()
      }
      /** GUARDAR SESIÓN */
      storageService.guardar(STORAGE_KEYS.SESION, sesion)
      /** DEVOLVER USUARIO */
      return usuario
    }

    /** METODO CERRAR SESIÓN
    Método que se encarga de eliminar la clave SESION */
    logout() {
        storageService.eliminar(STORAGE_KEYS.SESION)
    }

    /** MÉTODO OBTENER USUARIO ACTUAL */
    getCurrentUser() {
        /** RECUPERAR SESIÓN
        Si no existe una sesión, obtenemos null */
        const sesion = storageService.obtener(STORAGE_KEYS.SESION, null)
        /** VALIDACIÓN DE LA SESIÓN */
        if (!sesion) {
            return null
        }
        /** RECUPERACIÓN DE USUARIOS */
        const usuarios = storageService.obtener(STORAGE_KEYS.USUARIOS, [])
        /** BUSCAR USUARIO DE LA SESIÓN
        Se relaciona "sesion.usuarioID" con "usuario.id" */
        return (usuarios.find((usuario) => usuario.id === sesion.usuarioId) || null)
    }

    /** MÉTODO PROTEGER RUTA */
    protegerRuta(){
        // OBTENCIÓN DEL USUARIO AUTENTICADO
        const usuario = this.getCurrentUser()
        /** Si no existe el usuario autenticado, se regresa
        a index.html */
        if (!usuario) {
            window.location.href = 'index.html'
            return false
        }
        // ACCESO PERMITIDO
        return true
    }
}

// EXPORTAR AUTH SERVICE
export const authService = new AuthService()