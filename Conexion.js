import mysql from 'mysql'

class Conexion{
  constructor(){
      this.conecta = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database:"dwa_2"
    }) 
  }
  CONSULTAS(){
    this.conecta.connect( (err) =>  {
      if (err) throw err;
        console.log("Conexion establecida");
        this.conecta.query('CALL CONSULTAS()',function(err, [respuesta]){ if (err) throw err;
        const  r = JSON.stringify(respuesta)
        console.log(r);
      })
    })
  }
}

new Conexion().CONSULTAS()

