class Index_UI {
	constructor(reset = false) {
		if(reset) {
			this.form = document.querySelector("form")
			this.select = document.querySelector("#select")
			//this.contenedor = document.querySelector("#contenedor")
			this.enviar = document.querySelector("#enviar")
			this.bajas = document.querySelector("#bajas")
			this.cambios = document.querySelector("#cambios")
			this.consultaNombre = document.querySelector("#consultaNombre")
			this.consultaGeneral = document.querySelector("#consultaGeneral")
			this.consultas_anterior = document.querySelector("#anterior")
			this.consultas_siguiente = document.querySelector("#siguiente")
			this.mensaje = document.querySelector("#mensaje")


			this.nombre = document.querySelector("#nombre")
			this.nacionalidad = document.querySelector("#nacionalidad")
			this.edad = document.querySelector("#edad")
			this.data = document.querySelector("#data")
			this.id = document.querySelector("#id")

			// Fijo eventos
			this.enviar.addEventListener("click", this.altas_click)
			this.bajas.addEventListener("click", this.bajas_click)
			this.cambios.addEventListener("click", this.cambios_click)
			this.consultaNombre.addEventListener("click", this.consultas_nombre_click)
			this.consultaGeneral.addEventListener("click", this.consultas_click)
			this.consultas_anterior.addEventListener("click", this.consultas_anterior_click)
			this.consultas_siguiente.addEventListener("click", this.consultas_siguiente_click)
			this.select.addEventListener('change', this.seleccionar_click)
		}
	}

	altas_click(e){
		let datos = {"op": "ID", "args": UI.recuperar("ALTAS")}
		e.preventDefault() // Detengo la propagación del evento
		self.ALTAS(datos)  // Validará el controlador
	}
	consultas_click(e){
		let datos = {"op": "CONSULTAS"}
		e.preventDefault() // Detengo la propagación del evento
		self.CONSULTAS(datos)  // Validará el controlador
	}
	bajas_click(e) {
		let datos = {"op": "BAJAS", "args": UI.recuperar("BAJAS")}
		self.BAJAS(datos) // Validará el controlador
	}
	cambios_click(e) {
		let datos = {"op": "CAMBIOS", "args": UI.recuperar("CAMBIOS")}
		self.CAMBIOS(datos) // Validará el controlador
	}
	
	consultas_nombre_click(e){
		let datos = {"op": "CONSULTAS_NOMBRE", "args": UI.recuperar("CONSULTAS_NOMBRE")}
		self.CONSULTAS_NOMBRE(datos) // Validará el controlador
	}

	consultas_anterior_click(e){
		let datos = {"op": "CONSULTAS_ANTERIOR", "args": UI.recuperar("CONSULTAS_ANTERIOR")}
		self.CONSULTAS_ANTERIOR(datos) // Validará el controlador
	}

	consultas_siguiente_click(e){
		let datos = {"op": "CONSULTAS_SIGUIENTE", "args": UI.recuperar("CONSULTAS_SIGUIENTE")}
		self.CONSULTAS_SIGUIENTE(datos) // Validará el controlador
	}

	seleccionar_click(e){
		let target = e.target
		UI.actualizar(target[target.selectedIndex].data)
		
		//document.querySelector("#id").value = target[target.selectedIndex].value
		//UI.contenedor.value  = target[target.selectedIndex].text
    }

	mostrarConsultaSA(data){
		this.actualizar(data)
	}
	mostrarConsultas(data){
		let option = document.createElement("option");
		option.innerText = "Coincidencias encontradas"
		this.select.appendChild(option)
		if(Array.isArray(data)){
			for (const persona of data){
				let option = document.createElement("option");
    			option.setAttribute("value", persona.id);
				option.innerText = persona.nombre + " " + persona.nacionalidad + " " + persona.edad
				option.data = persona
				this.select.appendChild(option)
			}
		}else{
			this.actualizar(data)
			let option = document.createElement("option");
    		option.setAttribute("value", data.id);
			option.innerText = data.nombre + " " + data.nacionalidad + " " + data.edad
			option.data = data
			this.select.appendChild(option)
		}
	}
	actualizar(data){
		UI.id.value = data.id
		UI.nombre.value = data.nombre
		UI.nacionalidad.value = data.nacionalidad
		UI.edad.value = data.edad
		
	}
	limpiar(){
		UI.id.value = ""
		UI.nombre.value = ""
		UI.nacionalidad.value = ""
		UI.edad.value  = ""
	}

	notificacion(mensaje){ 
		this.mensaje.innerText = mensaje
	}
	recuperar(servicio) {
		let datos = {}
		if(servicio == "ALTAS" || servicio == "CAMBIOS"){
			datos.nombre = UI.nombre.value 
			datos.nacionalidad = UI.nacionalidad.value 
			datos.edad = UI.edad.value 
			if(servicio == "CAMBIOS"){
				datos.id = UI.id.value 		
			}
		}
		if(servicio == "BAJAS" || servicio == "CONSULTAS_SIGUIENTE" || servicio == "CONSULTAS_ANTERIOR"){
			datos.id = UI.id.value 
		}
		if(servicio == "CONSULTAS_NOMBRE"){
			datos.nombre = UI.nombre.value 
		}
		return datos
	}
}