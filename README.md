# Proyecto Final Backend de CoderHouse
Este proyecto es una página con varios endpoints creados de lado del servidor para realizar distintas acciones, utilizando el patrón de arquitectura
MVC. Además realicé el Front End de la aplicación para que sea más fácil e intituivo probar algunas cosas.  
Todo esto fue realizado usando Node js para el servidor, con varios módulos de este y MongoDB con Mongoose para la persistencia de datos.

El proyecto está subido y se puede ver en [Heroku](https://coderhouse-proyecto-final.herokuapp.com/).

## Routes
### Productos
- `GET /productos` Retorna un JSON con todos los productos.
- `POST /productos` Recibe un producto, lo guarda en la base de datos y lo retorna.
- `GET /productos/:id` Recibe un id a través de la ruta y retorna el producto con ese id si este se encuentra.
- `PUT /productos/:id` Recibe un id a través de la ruta, además del nuevo producto para actualizar en el cuerpo, si se encuentra el id 
pasado se actualiza y por último se retorna el nuevo.
- `DELETE /productos/:id` Recibe un id a través de la ruta y si encuentra un producto con ese id lo elimina.
- `GET /productos/categoria/:categoria` Recibe el nombre de una categoría a través de la ruta y retorna todos los productos que pertenecen
a esa categoría encontrados.

### Chat
- `GET /chat` Retorna un render de la sección de chat.
- `GET /chat:email` Recibe un email a través de la ruta y retorna un render de todos los mensajes que pertenecen al email pasado.

### Carrito
- `GET /carrito` Retorna un render del carrito del usuario. Se debe estar logueado para ingresar.
- `GET /carrito/productos` Retorna los productos actuales del carrito.
- `POST /carrito/productos` Recibe un producto en el cuerpo de la petición y agrega el producto al carrito o incrementa su cantidad en uno
si es que este ya estaba. Se debe estar logueado para realizar esta operación.
- `DELETE /carrito/productos/:id` Recibe un id de producto a través de la ruta y lo elimina del carrito del usuario. 
Se debe estar logueado para realizar esta operación.
- `POST /carrito/compra` Envía los mensajes de confirmación de pedido y limpia el carrito del usuario. 
