class Index {
	constructor(reset = false) {
		if(reset) {
			window.self = new Index()
			window.UI = new Index_UI(true)
			window.ajax = new Ajax("localhost")
			window.CI = new CONSTANTES()
		}
	}

	async ALTAS(data) {
		UI.select.innerHTML = ""
		if(self.validar(data)) {
			try {
				let r = await ajax.post(data) // Solicito el ID\
				r = JSON.parse(r)
				r.op = "ALTAS"
				UI.actualizar(r.args)
				// Solicitud asíncrona para un ALTA
				r = await ajax.post(r)
				r = JSON.parse(r)
				const mensaje = r.resultado == CI.ALTA_EXITOSA? "Alta exitosa" : "Alta fallida"
				UI.notificacion(mensaje)
				UI.select.innerHTML = ""
			}catch (error) {
				throw error
		  	}
			  self.OCULTARNOTIFICACION()
		}
	}

	async BAJAS(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito el ID
			r = JSON.parse(r)
			let mensaje 
			if( r.resultado != 0){
				mensaje = "Baja exitosa"
				if(UI.select.options.length -1 > 1){
					UI.select.options[UI.select.selectedIndex].remove()
				}else{
					UI.select.innerHTML = ""
				}
			}else{
				mensaje = "Ya fue eliminado"
			}
			self.OCULTARNOTIFICACION()
			UI.notificacion(mensaje)
			UI.limpiar()
		}
	}

	async CONSULTAS(data) {
		let r = await ajax.post(data) // Solicito el ID
		r = JSON.parse(r)
		UI.select.innerHTML = ""
		UI.limpiar()
		UI.mostrarConsultas(r)
		UI.notificacion("")
	}
	
	async CAMBIOS(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito el ID
			r = JSON.parse(r)
			
			let mensaje 
			if(r.resultado != 0){
				mensaje = "Cambio exitoso"
				UI.notificacion("Cambio exitoso")
				UI.select.options[UI.select.selectedIndex].innerText = UI.nombre.value + " "+ UI.nacionalidad.value + " " + UI.edad.value
			}else{
				mensaje = "Cambio fallido"
			}
			self.OCULTARNOTIFICACION()
			
		}
	}

	async CONSULTAS_NOMBRE(data) {
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Cambios

			r = JSON.parse(r)
			UI.select.innerHTML = ""
			if(!r.hasOwnProperty("resultado")){
				UI.mostrarConsultas(r)
				UI.notificacion("")
			}else{
				UI.select.innerHTML = ""
				UI.notificacion("Consulta fallida")
			}
			self.OCULTARNOTIFICACION()
		}
	}

	async CONSULTAS_SIGUIENTE(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Cambios
			r = JSON.parse(r)
			if(r.resultado != 0){
				UI.mostrarConsultaSA(r)
				UI.notificacion("")
			}else{
				UI.notificacion("Ya no hay mas")
			}
			self.OCULTARNOTIFICACION()
		}
	}

	async CONSULTAS_ANTERIOR(data){
		if(self.validar(data)){
			let r = await ajax.post(data) // Solicito un Cambios

			r = JSON.parse(r)
			if(r.resultado != 0){
				UI.mostrarConsultaSA(r)
				UI.notificacion("")
			}else{
				UI.notificacion("Ya no hay mas")
			}
			self.OCULTARNOTIFICACION()
		}
	}	

	validar(datos) {
		datos = datos.args
		let bandera = true
		if(datos.hasOwnProperty("nombre")){
			if(datos.nombre == "")
				bandera = false
		}
		if(datos.hasOwnProperty("nacionalidad")){
			if(datos.nacionalidad == "")
				bandera = false
			
		} 
		if(datos.hasOwnProperty("edad")){
			if(datos.edad == "")
				bandera = false
			
		}
		if(!bandera) alert("Error en los datos")
		return bandera
	}

	ERROR(e) { alert(e.message) }
	
	OCULTARNOTIFICACION(){
		setTimeout(function() { UI.notificacion(""); }, 3000);
	}
}
window.onload = () => new Index(true)