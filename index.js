var firebaseConfig = {
    apiKey: "AIzaSyDBhq28wdFlO9jnJ2I4Tw5edOjhbWujJq0",
    authDomain: "dentalcorona-42977.firebaseapp.com",
    databaseURL: "https://dentalcorona-42977-default-rtdb.firebaseio.com",
    projectId: "dentalcorona-42977",
    storageBucket: "dentalcorona-42977.appspot.com",
    messagingSenderId: "29960923092",
    appId: "1:29960923092:web:54d504e7e0bc6038ee9841",
    measurementId: "G-15RSLW4P1L"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input0").value='';
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value=''; 
    document.getElementById("Input5").value=''; 
    document.getElementById("Input6").value='selecciona';
    document.getElementById("Input7").value='selecciona';
    document.getElementById("Input8").value='selecciona';
    document.getElementById("Input9").value='selecciona';

}
function createR() {
    document.getElementById("Input0").disabled = false;
    var No_expediente = document.getElementById("Input0").value;
    var Nombre = document.getElementById("Input1").value;
    var Edad = document.getElementById("Input2").value;
    var Correo = document.getElementById("Input3").value;
    var Telefono = document.getElementById("Input4").value;
    var Direccion = document.getElementById("Input5").value;
    var Presion = document.getElementById("Input6").value;
    var Diabetes = document.getElementById("Input7").value;
    var Alergia = document.getElementById("Input8").value;
    var Nacionalidad = document.getElementById("Input9").value;


    //validaciones
    if (No_expediente.length > 0) {
       
        var paciente = {
            No_expediente, 
            Nombre,
            Edad,
            Correo,
            Telefono,
            Direccion,
            Presion,
            Diabetes,
            Alergia,
            Nacionalidad,
        }

        

        firebase.database().ref('Pacientes/' + No_expediente).update(paciente).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input0").disabled = false;
   
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Pacientes');

   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(paciente){
    
    if(paciente!=null){
        var table = document.getElementById("Table1"); 

        var row = table.insertRow(-1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        var cell10 = row.insertCell(9);
        var cell11 = row.insertCell(10);
        var cell12= row.insertCell(11);
        
        cell1.innerHTML = paciente.No_expediente;
        cell2.innerHTML = paciente.Nombre;
        cell3.innerHTML =paciente.Edad;
        cell4.innerHTML = paciente.Correo;
        cell5.innerHTML = paciente.Telefono;
        cell6.innerHTML = paciente.Direccion;
        cell7.innerHTML = paciente.Presion;
        cell8.innerHTML = paciente.Diabetes;
        cell9.innerHTML = paciente.Alergia;
        cell10.innerHTML = paciente.Nacionalidad;
        cell11.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${paciente.No_expediente})">Eliminar</button>`;
        cell12.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+paciente.No_expediente+')">Modificar</button>';
    }
}

function deleteR(No_expediente){
    firebase.database().ref('Pacientes/' + No_expediente).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(No_expediente){
    var ref = firebase.database().ref('Pacientes/' + No_expediente);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(paciente){
    if(paciente!=null)
    {
        document.getElementById("Input0").value=paciente.No_expediente;
        document.getElementById("Input0").disabled = true;
        document.getElementById("Input1").value=paciente.Nombre;
        document.getElementById("Input2").value=paciente.Edad;
        document.getElementById("Input3").value=paciente.Correo;
        document.getElementById("Input4").value=paciente.Telefono;
        document.getElementById("Input5").value=paciente.Direccion;
        document.getElementById("Input6").value=paciente.Presion;
        document.getElementById("Input7").value=paciente.Diabetes;
        document.getElementById("Input8").value=paciente.Alergia;
        document.getElementById("Input9").value=paciente.Nacionalidad;

    }
}


function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input10").value;

    var ref = firebase.database().ref("Pacientes");
    ref.orderByChild("Nacionalidad").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(paciente){

    var table = document.getElementById("Table2"); 
    
    var row = table.insertRow(-1);

    var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      var cell8 = row.insertCell(7);
      var cell9 = row.insertCell(8);
      var cell10 = row.insertCell(9);
      
    
    cell1.innerHTML = paciente.No_expediente;
      cell2.innerHTML = paciente.Nombre;
      cell3.innerHTML =paciente.Edad;
      cell4.innerHTML = paciente.Correo;
      cell5.innerHTML = paciente.Telefono;
      cell6.innerHTML = paciente.Direccion;
      cell7.innerHTML = paciente.Presion;
      cell8.innerHTML = paciente.Diabetes;
      cell9.innerHTML = paciente.Alergia;
      cell10.innerHTML = paciente.Nacionalidad;
   
}