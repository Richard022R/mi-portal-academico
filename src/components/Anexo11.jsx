import React, { useState, useEffect } from "react";

const Anexo11 = ({ userInfo }) => {
  const [informeComiteEtica, setInformeComiteEtica] = useState(null);
  const [dictamenAprobacionProyecto, setDictamenAprobacionProyecto] =
    useState(null);

  const [tesisId, setTesisId] = useState("");

  useEffect(() => {
    const fetchTesis = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/tesis/user/${userInfo.id}`
        );
        const data = await response.json();
        if (response.ok) {
          setTesisId(data.data._id);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error al obtener la tesis:", error);
      }
    };

    fetchTesis();
  }, [userInfo.id]);

  //obtener los documentos subidos por el usuario al anexo 11 y guardarlos en un estado
  const [documentos, setDocumentos] = useState([]);
  console.log(tesisId);
  const anexo11Path = `http://localhost:3000/api/v1/tesis/anexo11/${tesisId}`;
  console.log(anexo11Path);
  useEffect(() => {
    const fetchDocumentos = async () => {
        try {
          const response = await fetch(anexo11Path);
          const data = await response.json();
          if (response.ok) {
            setDocumentos(data.data);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error al obtener los documentos:", error);
        }
    };
    
    fetchDocumentos();
  }, [tesisId]);

  console.log(documentos, tesisId);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("userId", userInfo.id);

    if (informeComiteEtica) {
      formData.append("informeComiteEtica", informeComiteEtica);
    }

    if (dictamenAprobacionProyecto) {
      formData.append("dictamenAprobacionProyecto", dictamenAprobacionProyecto);
    }

    try {
      console.log(JSON.stringify(formData));

      const response = await fetch("http://localhost:3000/api/v1/tesis", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Tesis creada exitosamente");

        setInformeComiteEtica(null);
        setDictamenAprobacionProyecto(null);
        e.target.reset();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "No se pudo crear la tesis"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar los documentos");
    }
  };
  console.log("anexo 11", userInfo);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Crear Tesis con Documentos del Anexo 11
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <input
            type="text"
            id="userId"
            value={userInfo.id}
            onChange={(e) => setUserId(e.target.value)}
            readOnly
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label
            htmlFor="informeComiteEtica"
            className="block text-sm font-medium text-gray-700"
          >
            Informe Comité de Ética:
          </label>
          <input
            type="file"
            id="informeComiteEtica"
            onChange={(e) => setInformeComiteEtica(e.target.files[0])}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <div>
          <label
            htmlFor="dictamenAprobacionProyecto"
            className="block text-sm font-medium text-gray-700"
          >
            Dictamen de Aprobación del Proyecto:
          </label>
          <input
            type="file"
            id="dictamenAprobacionProyecto"
            onChange={(e) => setDictamenAprobacionProyecto(e.target.files[0])}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Subir Archivos
        </button>
      </form>
      <section>
        <table>
          <thead>
            <tr>
              <th>Documento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    </div>
  );
};

export default Anexo11;
