console.clear()
import {createServer} from 'http'
import {Procesos} from './js/Procesos.js'
import fs from 'fs'
import {createReadStream, existsSync } from 'fs'
import path from 'path'
import {fileURLToPath} from 'url'



const procesos = new Procesos() // Para usarse con POST
createServer((req, res) => {
	if(req.method == "GET") {
		const url = req.url == '/' ? './index.html' : req.url
		const archivo = fileURLToPath(import.meta.url) // Archivo meta (el que se está ejecutando)
		const directorio = path.dirname(archivo) // Recupero mi directorio base
		const ruta = path.join(directorio, url) // Ruta absoluta del recurso solicitado

		if(existsSync(ruta)) {
			const fileStream = createReadStream(ruta, 'UTF-8')

			if(url.match(/.html$/)) res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
			else if(url.match(/.css$/)) res.writeHead(200, {'Content-Type': 'text/css; charset=UTF-8'})
			else if(url.match(/.js$/)) res.writeHead(200, {'Content-Type': 'text/javascript; charset=UTF-8'})
			else if(url.match(/.ico$/)) res.writeHead(200, {'Content-Type': 'image/x-icon'})
			else if(url.match(/.png$/)){
				res.writeHead(200, {'Content-Type': 'image/png'})
				var img = fs.readFileSync(ruta)
				res.end(img, 'binary')
			}
			else if(url.match(/.jpg$/) || url.match(/.jpeg$/)){
				res.writeHead(200, {'Content-Type': 'image/jpeg'})
				var img = fs.readFileSync(ruta)
				res.end(img, 'binary')
			}
			fileStream.pipe(res) // Respuesta fragmentada al cliente (chunk)
		}
		else {
			console.log("No existe: ", ruta)
			res.writeHead(404, {'Content-Type': 'text/plain; charset=UTF-8'})
			res.end("404 Error: Archivo no encontrado")
		}
	}
	else if(req.method == "POST") {
		let data="", r
		req.on('data',chunk => data +=chunk) // Armando la data
		req.on('end',() => { // La data está armanda
			data = JSON.parse(data) // Asumo que la data es un json
			if(procesos[data.op]) { // Verifico que sea una solicitud legal
				// Determino si hay ejecución con parámetros o sin parámetros.
				// En r va a quedar la respuesta del método que se invoque del objeto procesos
				//r = data.hasOwnProperty("args") ? procesos[data.op](data) : procesos[data.op]()
				if(data.hasOwnProperty("args") ){
					//dado se el motodo altas hace uso de promesas debemos trabajar la respuesta de esta
					//manera o no se regresara un string vacio
					procesos[data.op](data).then((r) => {
						res.writeHead(200, {'Content-Type': 'text/json; charset=UTF-8'})
						// Convierto a JSON para retornar la respuesta
						res.end(JSON.stringify(r))	
					  })
					  .catch((error) => {
						console.error("Ocurrio un error", error);
					  });
				}else{
					procesos[data.op]().then((r) => {
						res.writeHead(200, {'Content-Type': 'text/json; charset=UTF-8'})
						res.end(JSON.stringify(r))	
					  })
					  .catch((error) => {
						console.error("Ocurrio un error", error);
						});
				}
			}
			else res.end("Solicitud rechazada") // Servicio desconocido (solicitud no legal)
		})
	}
}).listen(81, '127.0.0.1', () => {
	console.log("Servidor web a la escucha")
})