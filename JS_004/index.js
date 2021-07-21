const express = require('express')
const app = express()
var mysql = require('mysql');
const port = 3000

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.get('/', (req, res) => {
  res.render('index', {titulo: "Mi proyecto Express", descripcion: "Descripción del sitio"});
});

app.get('/usuarios', (req, res) => {

    var listaUsuarios = [
        {nombre: "Miguel", correo:"miguel@123.cl" },
        {nombre: "Juan", correo:"juan@123.cl" },
        {nombre: "Carlos", correo:"carlos@123.cl" },
        {nombre: "Andrés", correo:"andres@123.cl" }
    ];
  res.render('listar_usuarios', {usuarios: listaUsuarios});
})

app.get('/crear', (req, res) => {
    res.render('crear_usuario');
  });

app.post('/insertar_usuario', (req, res) => {
    //Insertar registro en base de datos
    console.log(req.body);

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "test_004"
      });
      con.connect(function(err) {
        if (err) throw err;
        console.log("Conectado!");
        var sql = "INSERT INTO usuarios (id, nombre, apellido) VALUES (null,'Jorge', 'Astorga')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 registro insertado");
        });
      });



 res.render('index', {titulo: "Mi proyecto Express", descripcion: "Descripción del sitio"});
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
