
## Descripcion

Backend para Tienda Vegana Online
El backend de este proyecto es la columna vertebral de una tienda vegana en línea, proporcionando las funcionalidades necesarias para gestionar productos, usuarios y ventas. Diseñado para ser robusto y escalable, el backend resuelve todas las necesidades técnicas para mantener y operar un eCommerce dedicado a productos veganos.

Características Principales:
Gestión de Productos: Permite la creación, edición y eliminación de productos veganos. Cada producto puede tener atributos como nombre, descripción, precio, categoría, imágenes, etc.
Gestión de Usuarios: Facilita el registro, inicio de sesión y gestión de usuarios. Los usuarios pueden realizar compras, ver su historial de pedidos, modificar sus datos personales, etc.
Gestión de Ventas: Maneja el proceso de compra, incluyendo la gestión de carritos de compra, procesamiento de pagos, generación de órdenes de compra, etc.
Objetivos del Backend:
Proporcionar una API robusta y segura para que el frontend interactúe con la base de datos y la lógica del negocio.
Garantizar un rendimiento óptimo incluso en momentos de alta demanda.
Facilitar la escalabilidad para que el eCommerce pueda crecer y adaptarse a nuevas necesidades.
Implementar medidas de seguridad para proteger los datos de los usuarios y la integridad del sistema.
Mantener un código limpio y modular para facilitar el mantenimiento y la extensión del sistema en el futuro.
Con el backend de esta tienda vegana online, se busca ofrecer una experiencia de compra sin complicaciones para los usuarios, al tiempo que se promueve un estilo de vida ético y sostenible.

## Instalacion

```bash
$ yarn install
$ yarn add mercadopago
$ yarn add nodemailer
```
## Configuración del archivo .env
El archivo .env es crucial para configurar correctamente el entorno de desarrollo y producción de la aplicación. A continuación se detallan las variables de entorno necesarias y sus propósitos:

DB_PASSWORD: Contraseña para acceder a la base de datos MongoDB.</br>
DB_DATABASE: Nombre de la base de datos MongoDB a la que se conectará la aplicación.</br>
DB_URL: URL de conexión a la base de datos MongoDB, incluyendo el protocolo, el usuario, la contraseña y la URL del clúster.</br>
JWT_ACCESS_SECRET: Clave secreta utilizada para firmar y verificar los tokens de acceso JWT.</br>
SESSION_KEY: Clave secreta para la gestión de sesiones de usuario.</br>
CLIENT_URL: URL del cliente (frontend) al que la aplicación permitirá las solicitudes CORS.</br>
CLOUDINARY_API_KEY: Clave API de Cloudinary para la integración con el servicio de almacenamiento y gestión de imágenes.</br>
CLOUDINARY_API_SECRET: Clave secreta de Cloudinary para la autenticación de la API.</br>
CLOUDINARY_NAME: Nombre de la nube de Cloudinary donde se almacenarán las imágenes.</br>
SMTP_SERVER: Servidor SMTP para el envío de correos electrónicos (por ejemplo, smtp.zoho.com).</br>
SMTP_PORT: Puerto del servidor SMTP (por ejemplo, 587).</br>
SMTP_SECURE: Indicador booleano que especifica si se utiliza una conexión segura con el servidor SMTP (true/false).</br>
SMTP_USERNAME: Nombre de usuario del correo electrónico desde el cual se enviarán los correos electrónicos (por ejemplo,codice.arg@zohomail.com).</br>
SMTP_PASSWORD: Contraseña del correo electrónico desde el cual se enviarán los correos electrónicos.</br>
Asegúrate de completar todas estas variables con los valores adecuados antes de ejecutar la aplicación en cualquier entorno.</br>



## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

