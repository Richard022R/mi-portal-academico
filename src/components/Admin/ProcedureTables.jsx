import React, { useState, useEffect } from 'react';
import { Edit, Trash, Search } from 'lucide-react';

const ProcedureTables = () => {
  const [procedures, setProcedures] = useState([]); // Datos originales
  const [filteredProcedures, setFilteredProcedures] = useState([]); // Datos filtrados
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda

  // Función para buscar usuarios
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users');
      if (!response.ok) {
        throw new Error('Error al obtener los datos del servidor');
      }
      const result = await response.json();
      const users = result.data.map(user => ({
        id: user._id,
        code: user.code,
        dni: user.documentNumber,
        name: `${user.name} ${user.fatherLastName} ${user.motherLastName}`,
        modality: user.typeTesis,
      }));
      setProcedures(users);
      setFilteredProcedures(users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  // Manejar cambios en el input de búsqueda
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrar procedimientos por código, DNI o nombre
    const filtered = procedures.filter(
      (procedure) =>
        procedure.code.toLowerCase().includes(value) ||
        procedure.dni.toLowerCase().includes(value) ||
        procedure.name.toLowerCase().includes(value)
    );
    setFilteredProcedures(filtered);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Lista de Tesis</h1>
          <p className="text-gray-600">Gestión de Tesis y Suficiencia Profesional</p>
        </div>
      </div>

      {/* Input de Búsqueda */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por código, DNI, nombre o modalidad"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tabla de Trámites */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-gray-600">CÓDIGO</th>
              <th className="p-4 text-left text-gray-600">DNI</th>
              <th className="p-4 text-left text-gray-600">NOMBRE</th>
              <th className="p-4 text-left text-gray-600">MODALIDAD</th>
              <th className="p-4 text-left text-gray-600">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {filteredProcedures.map((proc) => (
              <tr key={proc.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4">{proc.code}</td>
                <td className="p-4">{proc.dni}</td>
                <td className="p-4">{proc.name}</td>
                <td className="p-4">{proc.modality}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcedureTables;
