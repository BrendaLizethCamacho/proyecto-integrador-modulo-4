# Sistema de Gestión Bancaria

Proyecto integrador correspondiente al Módulo 4.

El proyecto se desarrolla progresivamente utilizando JavaScript moderno, arquitectura modular, programación orientada a objetos y programación funcional.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- ECMAScript Modules
- Node.js
- npm
- LocalStorage
- SweetAlert2
- Git
- GitHub

## Arquitectura

El proyecto utiliza las siguientes capas:

- Models
- Services
- UI
- Utils
- Tests

## Arquitectura actual

```powershell
js/
├── main.js
│
├── models/
│   ├── Banco.js
│   ├── Cuenta.js
│   ├── Movimiento.js
│   └── Usuario.js
│
├── services/
│   ├── AuthService.js
│   └── StorageService.js
│
├── ui/
│   └── DashboardUI.js
│
└── utils/
    ├── formatters.js
    ├── helpers.js
    └── validators.js
```

## Páginas actuales

### index.html

Contiene:

- Formulario de inicio de sesión.
- Formulario de registro.
- Integración de SweetAlert2.

### dashboard.html

Representa la primera página protegida del sistema.

Actualmente permite:

- Validar la existencia de una sesión.
- Mostrar al usuario autenticado.
- Cerrar sesión.

## Services

### StorageService

Centraliza la comunicación con LocalStorage.

Métodos:

- `guardar()`
- `obtener()`
- `eliminar()`
- `limpiar()`

### AuthService

Centraliza la autenticación y sesión.

Métodos:

- `login()`
- `logout()`
- `getCurrentUser()`
- `protegerRuta()`

## Claves de almacenamiento

El sistema utiliza:

- `STORAGE_KEYS.USUARIOS`
- `STORAGE_KEYS.CUENTAS`
- `STORAGE_KEYS.MOVIMIENTOS`
- `STORAGE_KEYS.SESION`

## Registro de usuarios

Al registrar un usuario:

1. Se validan los datos.
2. Se comprueba que el correo no esté registrado.
3. Se crea una instancia de `Usuario`.
4. Se genera un número de cuenta.
5. Se crea una instancia de `Cuenta`.
6. Se relaciona la cuenta mediante `usuarioId`.
7. Usuario y cuenta se guardan en LocalStorage.

## Autenticación

El inicio de sesión:

1. Recupera los usuarios almacenados.
2. Busca coincidencia de correo y contraseña.
3. Crea una sesión.
4. Guarda la sesión en LocalStorage.
5. Redirige al dashboard.

## SweetAlert2

SweetAlert2 se utiliza para:

- Alertas de validación.
- Registro exitoso.
- Errores de autenticación.
- Login exitoso.
- Confirmación de cierre de sesión.

## Funcionalidades implementadas

Actualmente el sistema permite:

- Registrar usuarios.
- Crear una cuenta bancaria automáticamente.
- Evitar correos duplicados.
- Persistir usuarios y cuentas.
- Iniciar sesión.
- Mantener la sesión después de recargar.
- Proteger páginas.
- Mostrar al usuario autenticado.
- Cerrar sesión.
- Mostrar alertas con SweetAlert2.

## Funcionalidades siguientes

Durante las siguientes versiones se desarrollarán:

- Dashboard bancario completo.
- Consulta de saldo.
- Información de cuenta.
- Gestión del perfil.
- Depósitos desde interfaz.
- Transferencias.
- Historial de movimientos.
- Validaciones adicionales.
- Pruebas automatizadas con Jest.

## Versión actual

v0.6.0 — Registro, autenticación, sesión y SweetAlert2.