import {CI} from './constantes.js'
import mysql from 'mysql2/promise'


export class Procesos {
	constructor(){
		this.conecta = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"dwa_2"
	  }) 
	}

	async ID(datos) {	
		datos.args.id = await this.id()
		return datos	
	}

	id() {
		let fecha = new Date(), str = fecha.getFullYear()
		
		str += ("0" + (fecha.getMonth() + 1)).slice(-2) // Siempre a dos dígitos
		str += ("0" + fecha.getDate()).slice(-2)
		str += ("0" + fecha.getHours()).slice(-2)
		str += ("0" + fecha.getMinutes()).slice(-2)
		str += ("0" + fecha.getSeconds()).slice(-2)
		str += ("00" + fecha.getMilliseconds()).slice(-3) // Siempre a tres dígitos
		return "ID"+str
	}	
	
	async ALTAS(data) {
		data = data.args
		try {
		  (await this.conecta).connect()
		  let r = (await this.conecta).query(`CALL ALTAS('${data.id}', '${data.nombre}', '${data.nacionalidad}', '${data.edad}')`)
		  return (await r)[0][0][0]
		} catch (error) {
		  throw error
		} 
	}

	async BAJAS(data) {
		data = data.args
		try {
		  (await this.conecta).connect()
		  let r = (await this.conecta).query(`CALL BAJAS('${data.id}')`)
		  return (await r)[0][0][0]
		} catch (error) {
		  throw error
		} 
	}

	async CAMBIOS(data) {
		data = data.args
		try {
		  (await this.conecta).connect()
		  let r = (await this.conecta).query(`CALL CAMBIOS('${data.id}', '${data.nombre}', '${data.nacionalidad}', '${data.edad}')`)
		  return (await r)[0][0][0]
		} catch (error) {
		  throw error
		} 
	}

	async CONSULTAS() {
		try {
		  (await this.conecta).connect()
		  let r = (await this.conecta).query("CALL CONSULTAS()")
		  return (await r)[0][0]
		} catch (error) {
		  throw error
		}
	}

	async CONSULTAS_NOMBRE(data) {
		data = data.args
		try {
		  (await this.conecta).connect()
		  let r = (await this.conecta).query(`CALL CONSULTAS_NOMBRE('${data.nombre}')`)
		  return (await r)[0][0]
		} catch (error) {
		  throw error
		}
	}

	async CONSULTAS_SIGUIENTE(data) {
		data = data.args
		try {
		  (await this.conecta).connect()
		  let r = (await this.conecta).query(`CALL CONSULTAS_SIGUIENTE('${data.id}')`)
		  return (await r)[0][0][0]
		} catch (error) {
		  throw error
		}
	}

	async CONSULTAS_ANTERIOR(data) {
		data = data.args
		try {
		  (await this.conecta).connect()
		  let r = (await this.conecta).query(`CALL CONSULTAS_ANTERIOR('${data.id}')`)
		  return (await r)[0][0][0]
		} catch (error) {
		  throw error
		}
	}
		
}