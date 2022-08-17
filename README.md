# Proyecto Final Backend de CoderHouse
Este proyecto es una API con varios endpoints creados de lado del servidor para realizar distintas acciones, utilizando el patrón de arquitectura
MVC. Además realicé el Front End de la aplicación para que sea más fácil e intuitivo probar algunas cosas.  
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
- `GET /chat/:email` Recibe un email a través de la ruta y retorna un render de todos los mensajes que pertenecen al email pasado.

### Carrito
- `GET /carrito` Retorna un render del carrito del usuario. Se debe estar logueado para ingresar.
- `GET /carrito/productos` Retorna los productos actuales del carrito.
- `POST /carrito/productos` Recibe un producto en el cuerpo de la petición y agrega el producto al carrito o incrementa su cantidad en uno
si es que este ya estaba. Se debe estar logueado para realizar esta operación.
- `DELETE /carrito/productos/:id` Recibe un id de producto a través de la ruta y lo elimina del carrito del usuario. 
Se debe estar logueado para realizar esta operación.
- `POST /carrito/compra` Envía los mensajes de confirmación de pedido y limpia el carrito del usuario. 

### Ordenes
- `GET /orden` Retorna un JSON con la información de las ordenes realizadas por el usuario. Se debe estar logueado para realizar esta operación.
- `POST /orden` Se guarda una nueva orden del usuario en la base de datos con los productos actuales del carrito. Se debe estar logueado para realizar esta operación.

### Autenticación
- `GET /login` Retorna un render de la sección de login y registro.
- `GET /logout` Si se está logueado a una cuenta, se desloguea de esta y se redirecciona a la página principal.
- `POST /auth/login` Recibe un email y contraseña en el cuerpo de la petición y te redirecciona a la página principal si estos son correctos.
- `POST /auth/signup` Recibe toda la información para un nuevo usuario y lo guarda en la base de datos, además de generar un carrito nuevo para él, y por último
te redirecciona a la página principal ya logueado.

### Process
- `GET /info` Retorna un JSON con información acerca del servidor.
- `GET /api/randoms?cant` Se le puede pasar un número a través de la ruta y este retorna un JSON con números al azar entre 1 y 1000, y la cantidad de veces
que tocaron. Si no se pasa un valor para cant este es 1000 por defecto.

## Models
### Productos
```
{
  title: { type: String, require: true, max: 100 },
  price: { type: Number, require: true },
  thumbnail: { type: String, require: true },
  categoria: { type: String, require: true }
}
```

### Mensajes
```
{
  id: { type: Number, require: true },
  author: {
    id: { type: String, require: true, max: 100 },
    username: { type: String, require: true },
    apellido: String,
    edad: Number,
    alias: String,
    avatar: { type: String, require: true }
  },
  text: {
    id: { type: Number, require: true },
    hora: { type: Date, require: true },
    text: { type: String, require: true }
  }
}
```

### Carritos
```
{
  productos: { type: Array, require: true, default: [] },
  email: { type: String, require: true },
  direccion: { type: String, require: true }
}
```

### Users
```
{
  userId: String,
  email: { type: String, require: true },
  password: String,
  username: { type: String, require: true },
  direccion: String,
  edad: Number,
  telefono: String,
  avatar: String
}
```

### Ordenes
```
{
  productos: { type: Array, require: true, default: [] },
  ordenId: { type: Number, require: true },
  hora: { type: Date, require: true },
  estado: { type: String, require: true, default: 'generada' },
  email: { type: String, require: true }
}
```
