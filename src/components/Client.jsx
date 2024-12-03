import React, { useEffect, useState } from 'react';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/users')
      .then(response => response.json())
      .then(data => {
        // Verifica si data.data es un arreglo antes de asignarlo
        if (data && Array.isArray(data.data)) {
          setUsuarios(data.data);
        } else {
          console.error('La respuesta no contiene un arreglo de usuarios:', data);
          setUsuarios([]);
        }
      })
      .catch(error => console.error('Error al obtener los usuarios:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {usuarios.length > 0 ? (
          usuarios.map((usuario, index) => (
            <li key={index}>
              {usuario.name} {usuario.fatherLastName} {usuario.motherLastName}
            </li>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default App;
