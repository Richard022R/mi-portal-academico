import React, { useState, useEffect } from 'react';

const EditUser = () => {
  const [userFiles, setUserFiles] = useState(null);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('editingUserId');

  useEffect(() => {
    if (!userId) {
      console.error('No se encontró un ID de usuario en el almacenamiento local');
      return;
    }

    const fetchUserFiles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/users/${userId}/files`);
        if (!response.ok) {
          throw new Error('Error al obtener los archivos del usuario');
        }
        const result = await response.json();
        setUserFiles(result.data?.tesis || null);
        setUser(result.data?.user || null);
      } catch (error) {
        console.error('Error al obtener los archivos:', error.message);
      }
    };

    fetchUserFiles();
  }, [userId]);

  const onClose = () => {
    localStorage.removeItem('editingUserId');
    window.location.reload();
  };

  const handleStatusChange = async (newStatus) => {
    if (!userFiles || !userFiles._id) {
      console.error('No hay información de tesis para actualizar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/tesis/${userFiles._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado');
      }

      // Update local state to reflect the status change
      setUserFiles(prev => ({ ...prev, status: newStatus }));

      console.log('Estado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el estado:', error.message);
    }
  };

  // Flatten files from nested structure
  const flattenFiles = (filesObject) => {
    if (!filesObject) return [];
    
    const flattened = [];
    const { _id, ...annexes } = filesObject;

    Object.entries(annexes).forEach(([annexKey, annexFiles]) => {
      if (typeof annexFiles === 'object') {
        Object.entries(annexFiles).forEach(([fileType, fileInfo]) => {
          if (fileInfo && fileInfo.fileName) {
            flattened.push({
              id: `${_id}-${annexKey}-${fileType}`,
              tesisId: _id,
              annexKey,
              fileType,
              ...fileInfo
            });
          }
        });
      }
    });

    return flattened;
  };

  const flattenedFiles = flattenFiles(userFiles);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button onClick={onClose} className="text-red-500 hover:underline mb-4">
        Cerrar
      </button>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Editar Usuario</h1>
      <p className="text-gray-600 mb-6">Gestiona los archivos y el estado del usuario</p>

      {user && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Información del Usuario</h2>
          <p className="text-gray-600">Nombre: {user.name}</p>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
      )}

      {userFiles && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Estado de la Tesis</h2>
          <div className="flex items-center space-x-4">
            <select
              value={userFiles.status || 'En Proceso'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="block w-full max-w-xs p-2 border rounded-lg"
            >
              <option value="En Proceso">En Proceso</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <caption className="text-lg font-medium text-gray-700 bg-gray-100 p-4">
            Archivos del Usuario
          </caption>
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-gray-600">Anexo</th>
              <th className="p-4 text-left text-gray-600">Nombre del Archivo</th>
              <th className="p-4 text-left text-gray-600">Tipo de Archivo</th>
              <th className="p-4 text-left text-gray-600">Acción</th>
            </tr>
          </thead>
          <tbody>
            {flattenedFiles.length > 0 ? (
              flattenedFiles.map((file) => (
                <tr key={file.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4">{file.annexKey}</td>
                  <td className="p-4">{file.fileName}</td>
                  <td className="p-4">{file.fileType}</td>
                  <td className="p-4">
                    <a
                      href={`http://localhost:3000/api/v1/tesis/download/${file.tesisId}/${file.fileType}`}
                      className="text-blue-500 hover:underline mr-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Descargar
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-600 text-center">
                  No se encontraron archivos para este usuario
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditUser;