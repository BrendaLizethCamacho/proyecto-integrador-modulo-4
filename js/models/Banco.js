// Se utiliza PascalCase para los archivos que tienen clases

/* La clase Banco será responsable de coordinar los modelos y aplicar
reglas del negocio:
* Administrar usuarios
* Administrar cuentas
* Administrar movimientos
 
* Buscar usuarios
* Buscar cuentas
 
* Obtener cuentas de un usuario
 
* Registrar usuarios
* Registrar cuentas
 
* Realizar depósitos

* Registrar automáticamente el movimiento de un depósito */

/** IMPORTACIÓN DE MODELOS
Se importa el modelo movimiento para crear movimientos automáticamente
cuando se realicen operaciones como depósitos */
import { Movimiento } from "./Movimiento.js";

/** CLASE BANCO
Clase que se encarga de administrar usuarios, cuentas y movimientos */
export class Banco {
    constructor({
        usuarios = [],
        cuentas = [],
        movimientos = [],
    } = {}) {
        this.usuarios = usuarios;
        this.cuentas = cuentas;
        this.movimientos = movimientos;
        }

    /** MÉTODO AGREGAR USUARIO
    Método que se encarga de registrar un usuario dentro del banco
    cuando no exista otro usuario con el mismo ID */
    agregarUsuario(usuario){
        /** some() sirve para comprobar que mínimo un elemento del array cumpla 
        con la condición */
        const existe = this.usuarios.some((user) => user.id === usuario.id);
        // Si ya existe el id, no se agrega y se manda un error */
        if (existe) {
            throw new Error("El usuario ya existe");
        }
        // Si no existe el id se agrega el usuario al array
        this.usuarios.push(usuario);
        return usuario;
        }

    /** MÉTODO BUSCAR USUARIO POR ID
    Método que se encarga de buscar un usuario utilizando su ID
    find() devuelve el primer elemento que cumpla con la condición */
    buscarUsuarioPorId(usuarioId) {
        return this.usuarios.find((usuario) => usuario.id === usuarioId) || null;
    }

    /** MÉTODO AGREGAR CUENTA
    Método que se encargará de registrar una cuenta cuando su propietario
    existe y la cuenta no está duplicada */
    agregarCuenta(cuenta){
        // Búsqueda del propietario(usuario)
        const usuario = this.buscarUsuarioPorId(cuenta.usuarioId)
        // Si no existe, no se agrega la cuenta y se manda un error
        if (!usuario) {
            throw new Error("El usuario propietario de la cuenta no existe");
        }
        // Se verifica si la cuenta ya existe
        const existe = this.cuentas.some((account) => account.id === cuenta.id || account.numeroCuenta === cuenta.numeroCuenta)
        // Si ya existe la cuenta, no se agrega la cuenta y se manda un mensaje de error
        if (existe) {
            throw new Error("La cuenta ya existe");
        }
        // Si no existe la cuenta se hace el registro de la cuenta
        this.cuentas.push(cuenta)
        return cuenta
    }

    /** MÉTODO BUSCAR CUENTA POR ID
    Método que se encarga de buscar una cuenta utilizando su ID */
    buscarCuentaPorId(cuentaId){
        return this.cuentas.find((cuenta) => cuenta.id === cuentaId) || null
    }

    /** MÉTODO BUSCAR CUENTA POR NÚMERO
    Método que se encarga de buscar una cuenta utilizando su número bancario visible */
    buscarCuentaPorNumero(numeroCuenta){
        return this.cuentas.find((cuenta) => cuenta.numeroCuenta === numeroCuenta) || null
    }

    /** MÉTODO OBTENER CUENTAS DE UN USUARIO
    Método que se encarga de recuperar todas las cuentas de un usuario
    filter() devuelve todos los elementos que cumplan con la condición */
    obtenerCuentasDeUsuario(usuarioId){
        return this.cuentas.filter((cuenta) => cuenta.usuarioId === usuarioId)
    }

    /** MÉTODO REGISTRAR MOVIMIENTO
    Método que se encarga de agregar un movimiento al historial del banco */
    registrarMovimiento(movimiento){
        this.movimientos.push(movimiento)
        return movimiento
    }

    /** MÉTODO OBTENER MOVIMIENTO DE UNA CUENTA
    Método que se encarga de devolver los movimientos en los que 
    la cuenta aparezca con cuenta de origen o como cuenta de destino */
    obtenerMovimientosDeCuenta(cuentaId){
        return this.movimientos.filter((movimiento) => movimiento.cuentaOrigen === cuentaId || movimiento.cuentaDestino === cuentaId)
    }

    /** MÉTODO REALIZAR DEPÓSITO
    Método que se encarga de:
    * Validar el monto
    * Buscar la cuenta
    * Actualizar el saldo
    * Crear y registrar el movimiento */
    realizarDeposito({ cuentaId, monto, descripcion = "" }) {
        //Conversión del monto a número
        const montoNumero = Number(monto)
        // Verificar que el monto sea un número válido mayor que 0
        if (!Number.isFinite(montoNumero) || montoNumero <= 0) {
            throw new Error("Monto inválido, el monto del depósito debe ser mayor que cero");
        }
        // Búsqueda de cuenta
        const cuenta = this.buscarCuentaPorId(cuentaId);
        if (!cuenta) {
            throw new Error("La cuenta no existe");
        }
        // Actualizar saldo
        cuenta.depositar(montoNumero);
        // Registro de la operación
        const movimiento = new Movimiento({
            tipo: "DEPOSITO",
            monto: montoNumero,
            descripcion,
            cuentaOrigen: cuenta.id,
            saldoResultante: cuenta.saldo
        });
        this.registrarMovimiento(movimiento);
        return movimiento;
    }

    /** TRANSFERENCIAS */
    realizarTransferencia({
        cuentaOrigenId,
        cuentaDestinoId,
        monto,
        descripcion = '',
    }) {
        // Convertimos el monto recibido a número.
        const montoNumerico =
            Number(monto);


        // La transferencia solamente puede
        // realizarse con un monto mayor a cero.
        if (
            !Number.isFinite(
                montoNumerico,
            ) ||
            montoNumerico <= 0
        ) {
            throw new Error(
                'Monto inválido, el monto debe ser mayor a cero.',
            );
        }

        // Buscamos las dos cuentas involucradas
        // utilizando los métodos del Banco.
        const origen =
            this.buscarCuentaPorId(
                cuentaOrigenId,
            );

		// Buscamos la cuenta que recibirá el dinero.
        const destino =
            this.buscarCuentaPorId(
                cuentaDestinoId,
            );

		// No podemos continuar si la cuenta origen no existe
        if (!origen) {
            throw new Error(
                'La cuenta origen no existe.',
            );
        }

		// Tampoco podemos continuar sin una cuenta destino válida.
        if (!destino) {
            throw new Error(
                'La cuenta destino no existe.',
            );
        }

        // No permitimos operar con cuentas
        // que se encuentren inactivas.
        if (!origen.activa) {
            throw new Error(
                'La cuenta origen no está activa.',
            );
        }

		// Evitamos recibir dinero en una cuenta inactiva.
        if (!destino.activa) {
            throw new Error(
                'La cuenta destino no está activa.',
            );
        }

        // Una transferencia necesita dos
        // cuentas diferentes.
        if (
            origen.id === destino.id
        ) {
            throw new Error(
                'No puedes transferir dinero a la misma cuenta',
            );
        }

        // Comprobamos que la cuenta origen
        // tenga dinero suficiente.
        if (
            origen.saldo <
            montoNumerico
        ) {
            throw new Error(
                'Saldo insuficiente',
            );
        }

        // Retiramos el dinero de la cuenta
        // que realiza la transferencia.
        origen.retirar(
            montoNumerico,
        );


        // Depositamos exactamente el mismo
        // monto en la cuenta destino.
        destino.depositar(
            montoNumerico,
        );

        // Registramos la operación desde la
        // perspectiva de la cuenta origen.
        const movimientoEnviado =
            new Movimiento({
                tipo:
                    'TRANSFERENCIA_ENVIADA',
                monto:
                    montoNumerico,
                descripcion,
                cuentaOrigen:
                    origen.id,
                cuentaDestino:
                    destino.id,
                saldoResultante:
                    origen.saldo,
            });
        
        // Registramos la misma operación desde
        // la perspectiva de la cuenta receptora.
        const movimientoRecibido =
            new Movimiento({
                tipo:
                    'TRANSFERENCIA_RECIBIDA',
                monto:
                    montoNumerico,
                descripcion,
                cuentaOrigen:
                    origen.id,
                cuentaDestino:
                    destino.id,
                saldoResultante:
                    destino.saldo,
            });
        
        // Guardamos ambos movimientos dentro
        // del historial general del Banco.
        this.registrarMovimiento(
            movimientoEnviado,
        );
	
		// Agregamos también el movimiento recibido.
        this.registrarMovimiento(
            movimientoRecibido,
        );


        // Regresamos toda la información útil
        // de la operación.
        return {
            origen,
            destino,
            movimientoEnviado,
            movimientoRecibido,
        };
    }
}