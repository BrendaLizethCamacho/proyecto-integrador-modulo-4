/** CLAVES DE ALMACENAMIENTO
Nombre de las claves utilizadas por LocalStorage para evitar la
escritura de cadenas manualmente en todo el proyecto */

export const STORAGE_KEYS = {
    USUARIOS: "usuarios",
    CUENTAS: "cuentas",
    MOVIMIENTOS: "movimientos",
    SESION: "sesion"
}

// Clase que se centrara en la comunicación con LocalStorage
class StorageService {
    /** MÉTODO GUARDAR INFORMACIÓN
    Método que se encarga de recibir:
    * clave -> dónde guardaremos la información
    * valor -> dato a almacenar */
   guardar(clave, valor){
    const valorJSON = JSON.stringify(valor)
    // Se guarda el JSON usando la clave recibida
    localStorage.setItem(clave, valorJSON)
   }

   /** MÉTODO OBTENER INFORMACIÓN
   Método que recibe:
   * clave: indica la información a recuperar
   * valorPorDefecto: se retorna cuando no existe información almacenada */
  obtener(clave, valorPorDefecto = null){
    /** getItem() devuelve el contenido almacenado como texto 
    Si la clave no existe devuelve null */
    const valor = localStorage.getItem(clave)
    // Se valida si existe la información
    if (valor === null) {
        return valorPorDefecto
    }
    // En caso de que exista se convierte a JSON
    try {
        return JSON.parse(valor)
    } catch (error) {
        // Si el JSON es inválido se manda un error
        console.error(`No fue posible leer la clave "${clave} de LocalStorage`, error)
        // Y se devuelve el valor por defecto
        return valorPorDefecto
    }
  }

  /** MÉTODO ELIMINAR INFORMACIÓN
  Método que elimina únicamente la clave recibida sin afectar el resto
  de LocalStorage */
  eliminar(clave){
    localStorage.removeItem(clave)
  }

  /** MÉTODO LIMPIAR LOCALSTORAGE
  Método que elimina toda la información almacenada para ese
  origen */
  limpiar(){
    localStorage.clear()
  }
}

/** CREAR INSTANCIA DEL SERVICIO
Creamos una sola instancia que podrá reutilizarse desde diferentes
módulos */
export const storageService = new StorageService()