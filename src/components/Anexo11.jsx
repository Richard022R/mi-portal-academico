import React, { useState } from 'react';

const Anexo11 = () => {
  const [documents, setDocuments] = useState([]);
  const [informeEtica, setInformeEtica] = useState(null);
  const [dictamenAprobacion, setDictamenAprobacion] = useState(null);

  const handleFileChange = (e, setter) => setter(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDocs = [];

    if (informeEtica) {
      newDocs.push({ name: 'Informe Ética', file: informeEtica.name });
    }
    if (dictamenAprobacion) {
      newDocs.push({ name: 'Dictamen Aprobación Proyecto', file: dictamenAprobacion.name });
    }

    setDocuments([...documents, ...newDocs]);
    setInformeEtica(null);
    setDictamenAprobacion(null);
    e.target.reset();
  };

  const handleDelete = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Anexo 11 - Proyecto Tesis</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium">Informe Comité Ética:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setInformeEtica)}
            className="mt-2 w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-lg font-medium">Dictamen Aprobación Proyecto:</label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, setDictamenAprobacion)}
            className="mt-2 w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Enviar
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10">Documentos Subidos</h2>
      <table className="min-w-full bg-white border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 border">Nombre</th>
            <th className="p-4 border">Archivo</th>
            <th className="p-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-4 border">{doc.name}</td>
              <td className="p-4 border">{doc.file}</td>
              <td className="p-4 border">
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Anexo11;
