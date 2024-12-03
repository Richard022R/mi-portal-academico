import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  FileText, 
  Download, 
  X, 
  Upload 
} from 'lucide-react';

const ProceduresTable = ({ procedures }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnexo, setSelectedAnexo] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAnexoSelect = (anexo) => {
    setSelectedAnexo(anexo);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    // Lógica para enviar el trámite
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAnexo('');
    setSelectedFile(null);
  };

  const filteredProcedures = procedures.filter(procedure =>
    procedure.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Estado de Tesis</h2>
          <p className="text-sm text-gray-600">Etapa actual: Evaluación por Jurado</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Buscar trámites"
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-4 py-2 border rounded-full w-full focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="p-4 text-gray-600">N° Trámite</th>
                <th className="p-4 text-gray-600">Trámite</th>
                <th className="p-4 text-gray-600">
                  <div className="flex items-center">
                    Fecha <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="p-4 text-gray-600">Estado</th>
                <th className="p-4 text-gray-600">Documentos</th>
                <th className="p-4 text-gray-600">Historial</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcedures.map((procedure) => (
                <tr key={procedure.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{procedure.id}</td>
                  <td className="p-4">{procedure.name}</td>
                  <td className="p-4">{procedure.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      procedure.status === 'TRÁMITE FINALIZADO' 
                        ? 'bg-green-100 text-green-800'
                        : procedure.status === 'TRÁMITE EN PROCESO'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {procedure.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {procedure.documents.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {procedure.documents.map((doc, index) => (
                          <button 
                            key={index} 
                            className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            {doc}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">Sin documentos</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button className="text-blue-500 hover:text-blue-700">
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>Items per page:</span>
            <select className="border rounded p-1">
              <option>100</option>
            </select>
            <span>1 – {filteredProcedures.length} of {filteredProcedures.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 border rounded" disabled>⟨⟨</button>
            <button className="p-1 border rounded" disabled>⟨</button>
            <button className="p-1 border rounded" disabled>⟩</button>
            <button className="p-1 border rounded" disabled>⟩⟩</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProceduresTable;