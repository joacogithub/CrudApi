document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.querySelector('#registroForm');
  const formularioEdicion = document.querySelector('#edicionForm');

  function postData() {
    const nombre = document.querySelector('#txtName').value;
    const apellido = document.querySelector('#txtSurname').value;
    const grupo = document.querySelector('#txtGroup').value;
    const sala = document.querySelector('#txtSala').value;

    const datos = {
      nombre,
      apellido,
      grupo,
      sala,
    };

    fetch('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Respuesta del servdor:', data);
        alert('Información enviada con éxito');
      })
      .catch(error => {
        console.error('Error', error);
        alert('Hubo un error al enviar los datos');
      });

    nombre.value = '';
    apellido.value = '';
    grupo.value = '';
    sala.value = '';
  }

  function getData() {
    fetch('https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265')
      .then(response => response.json())
      .then(data => {
        let listaRegistros = document.querySelector('#tablaRegistros tbody');
        listaRegistros.innerHTML = '';

        data.forEach(element => {
          let fila = document.createElement('tr');
          fila.innerHTML = `
          <td>${element.nombre}</td>
          <td>${element.apellido}</td>
          <td>${element.grupo}</td>
          <td>${element.sala}</td>
          <td><img src="img/edit.png" alt="Editar" class="imgEdit" data-id="${element._id}"></td>
          <td><img src="img/borrar.png" alt="Eliminar" class="imgDelete" data-id="${element._id}"></td>
          `;

          const imagenBorrar = fila.querySelector('.imgDelete');
          imagenBorrar.addEventListener('click', function () {
            const idAEliminar = this.getAttribute('data-id');
            eliminarRegistro(idAEliminar);

            const imagenEditar = fila.querySelector('.imgEdit');
            imagenEditar.addEventListener('click', function () {
              const idAEditar = this.getAttribute('data-id');
              mostrarFormulario();
            });
          });

          listaRegistros.appendChild(fila);
        });
      })
      .catch(error => {
        console.error('Hubo un error al obtener los datos', error);
      });
  }

  function eliminarRegistro(id) {
    fetch(`https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        getData();
      });
    // .catch(error => {
    //   console.error('Error al eliminar el registro', error);
    // });
  }

  function mostrarFormulario() {
    formularioEdicion.classList.toggle('oculto');
  }

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    postData();
  });

  getData();
  setInterval(getData, 1500);
});
