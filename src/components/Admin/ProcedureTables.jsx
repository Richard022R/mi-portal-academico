import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  FileText, 
  Download 
} from 'lucide-react';

const ProceduresTables = ({ procedures }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProcedure, setSelectedProcedure] = useState(null);

  // Filter procedures based on search term
  const filteredProcedures = procedures.filter(proc => 
    proc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle procedure details view
  const handleProcedureDetails = (procedure) => {
    setSelectedProcedure(procedure);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Trámites de Tesis</h1>
          <p className="text-gray-600">Gestión y seguimiento de procedimientos</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="text"
          placeholder="Buscar trámites"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Procedures Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left text-gray-600">N° Trámite</th>
              <th className="p-4 text-left text-gray-600">Nombre del Trámite</th>
              <th className="p-4 text-left text-gray-600">Fecha</th>
              <th className="p-4 text-left text-gray-600">Estado</th>
              <th className="p-4 text-left text-gray-600">Documentos</th>
              <th className="p-4 text-left text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProcedures.map((proc) => (
              <tr 
                key={proc.id} 
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">{proc.id}</td>
                <td className="p-4">{proc.name}</td>
                <td className="p-4">{proc.date}</td>
                <td className="p-4">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${proc.status === 'TRÁMITE FINALIZADO' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'}
                  `}>
                    {proc.status}
                  </span>
                </td>
                <td className="p-4">
                  {proc.documents.length > 0 ? (
                    <div className="flex flex-col space-y-1">
                      {proc.documents.map((doc, index) => (
                        <a 
                          key={index} 
                          href="#" 
                          className="flex items-center text-blue-600 hover:text-blue-800"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {doc}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400">Sin documentos</span>
                  )}
                </td>
                <td className="p-4">
                  <button 
                    onClick={() => handleProcedureDetails(proc)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Procedure Details Modal (optional) */}
      {selectedProcedure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">{selectedProcedure.name}</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedProcedure.id}</p>
              <p><strong>Fecha:</strong> {selectedProcedure.date}</p>
              <p><strong>Estado:</strong> {selectedProcedure.status}</p>
            </div>
            <button 
              onClick={() => setSelectedProcedure(null)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProceduresTables;