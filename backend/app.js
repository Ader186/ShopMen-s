require('dotenv').config();                                                               // Carga las variables de entorno desde el archivo .env

// Importación de módulos necesarios
const express = require("express");  
const client = require('prom-client');                                                     // Framework para el servidor web
const mongoose = require("mongoose");                                                     // Biblioteca para conectar y gestionar MongoDB
const bodyparser = require("body-parser");                                                // Middleware para analizar cuerpos de solicitudes HTTP
const { createServer } = require("http");                                                 // Función para crear un servidor HTTP
const { Server } = require("socket.io");                                                  // Biblioteca para manejo de eventos en tiempo real con websockets

// Configuración de la aplicación
const app = express();                                                                    // Instancia de la aplicación Express
const httpServer = createServer(app);                                                     // Creación del servidor HTTP con Express
const io = new Server(httpServer, {
  cors: { origin: '*' }                                                                   // Configuración de CORS para permitir conexiones desde cualquier origen
});

// Crea un registro de métricas
const register = new client.Registry();

// Recolecta métricas por defecto
client.collectDefaultMetrics({ register });

// Expone las métricas en /metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Configuración de Socket.IO para manejar eventos en tiempo real
io.on("connection", (socket) => {
                                                                                          // Maneja la conexión de nuevos clientes
  socket.on('send_car', (data) => {
    console.log(data);                                                                    // Imprime los datos recibidos en la consola
    io.emit('listen_car', data);                                                          // Emite los datos a todos los clientes conectados
  });
});

// Importación de rutas
const customer_router = require("./routes/customer");                                      // Rutas para clientes
const users_router = require("./routes/users");                                            // Rutas para usuarios
const products_router = require("./routes/product");                                       // Rutas para productos
const public_product = require("./routes/public");                                         // Rutas para productos públicos
const customer_ecomerce_router = require("./routes/customerEcomerce");                     // Rutas para clientes de comercio electrónico

// Configuración del middleware para procesar cuerpos de solicitudes
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));                          // Analiza datos de formularios con codificación URL
app.use(bodyparser.json({ limit: "50mb", extended: true }));                                // Analiza datos JSON

// Conexión a MongoDB
const mongoURI = process.env.MONGO_URI;                                                     // URL de conexión a MongoDB desde las variables de entorno
const port = process.env.PORT;                                                              // Puerto en el que el servidor escuchará (4200 por defecto)

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión exitosa a BD");                                                   // Mensaje en caso de conexión exitosa
    httpServer.listen(port, () => {
      console.log(`El servidor se ejecuta en el puerto ${port}`);                           // Mensaje cuando el servidor empieza a escuchar
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);                           // Mensaje en caso de error de conexión
  });

// Configuración manual de CORS para permitir solicitudes desde cualquier origen
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");                                           // Permite solicitudes de cualquier origen
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );                                                                                        // Permite ciertos encabezados en las solicitudes
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");            // Permite ciertos métodos HTTP
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");                                   // Encabezado adicional para métodos permitidos
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);                                                             // Responde con un estado 200 para solicitudes OPTIONS
  }
  next();                                                                                   // Pasa al siguiente middleware
});

// Definición de rutas para la API
app.use("/api", customer_router);                                                           // Rutas para clientes
app.use("/api", users_router);                                                              // Rutas para usuarios
app.use("/api", products_router);                                                           // Rutas para productos
app.use("/api", public_product);                                                            // Rutas para productos públicos
app.use("/api", customer_ecomerce_router);                                                  // Rutas para clientes de comercio electrónico

// Middleware para manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);                                                                 // Imprime el error en la consola
  res.status(500).send('Algo salió mal!');                                                  // Responde con un mensaje genérico en caso de error
});

module.exports = app;                                                                       // Exporta la aplicación para ser utilizada en otros módulos
