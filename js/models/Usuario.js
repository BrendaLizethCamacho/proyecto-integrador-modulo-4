// Se utiliza PascalCase para los archivos que tienen clases

/** IMPORTACIÓN DE UTILIDADES */
/** Se importa generarId() para asignar un identificador a cada 
usuario creado*/
import { generarId } from "../utils/helpers.js";

/** CLASE USUARIO
Clase encargada de estructurar la información de los clientes
del banco */
export class Usuario {
  /** El constructor se ejecutará cada vez que se genere 
    un nuevo objeto utilizando new Usuario(...) */
  constructor({
    id = generarId(),
    nombre,
    email,
    telefono = "",
    password,
    // Un usuario recién creado estará activo por defecto
    activo = true,
  }) {
    // ASIGNACIÓN DE PROPIEDADES
    // this hace referencia al objeto individual que se está creando
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.password = password;
    this.activo = activo;
  }
}
