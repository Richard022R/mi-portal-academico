import React, { useState } from 'react';
import axios from 'axios';

const Anexo11 = () => {
  const [informeComiteEtica, setInformeComiteEtica] = useState(null);
  const [dictamenAprobacionProyecto, setDictamenAprobacionProyecto] = useState(null);
  const [userId, setUserId] = useState(''); // Obtener userId desde el contexto o props

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('modalidad', 'Tesis');
    formData.append('anexo11[informeComiteEtica][fileName]', informeComiteEtica.name);
    formData.append('anexo11[informeComiteEtica][uploadDate]', new Date().toISOString());
    formData.append('anexo11[informeComiteEtica][file]', informeComiteEtica);

    formData.append('anexo11[dictamenAprobacionProyecto][fileName]', dictamenAprobacionProyecto.name);
    formData.append('anexo11[dictamenAprobacionProyecto][uploadDate]', new Date().toISOString());
    formData.append('anexo11[dictamenAprobacionProyecto][file]', dictamenAprobacionProyecto);

    try {
      const response = await axios.post('http://localhost:5000/api/v1/proyectos/crear', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Proyecto creado:', response.data);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Informe Comité Ética:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setInformeComiteEtica)} required />
      </div>
      <div>
        <label>Dictamen Aprobación Proyecto:</label>
        <input type="file" onChange={(e) => handleFileChange(e, setDictamenAprobacionProyecto)} required />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Anexo11;
