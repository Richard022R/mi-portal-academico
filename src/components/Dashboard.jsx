import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProceduresTable from './ProceduresTable';
import Ajuste from './Ajuste';
import Anexo11 from './Anexo11';
import Anexo30 from './Anexo30';
import Extras from './Extras';

const ThesisProcedures = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('inicio');
  const [userInfo, setUserInfo] = useState(() => {
    const infoGuardada = localStorage.getItem('userInfo');
    return infoGuardada ? JSON.parse(infoGuardada) : null;
  });
  console.log(userInfo)
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const thesisProcedures = [
    {
      id: 'T2024-001',
      name: 'REVISIÓN INICIAL DEL ANEXO 11',
      date: 'nov 15, 2024',
      status: 'TRÁMITE FINALIZADO',
      documents: ['Informe_Etica.pdf', 'Dictamen_Aprobación_Proyecto.pdf']
    },
    {
      id: 'T2024-002',
      name: 'REVISION INICIAL DEL ANEXO 30',
      date: 'nov 29, 2024',
      status: 'TRÁMITE EN PROCESO',
      documents: ['solicitud_jurado.pdf']
    },
    {
      id: 'T2024-003',
      name: 'ARCHIVOS EXTRAS DE TESIS',
      date: 'nov 20, 2024',
      status: 'TRÁMITE EN PROCESO',
      documents: []
    }
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'inicio':
        return <ProceduresTable userInfo={userInfo}/>;
      case 'tesis':
        return <div>Proceso de Tesis</div>;
      case 'ajustes':
          console.log(userInfo)
          return <Ajuste userInfo={userInfo} setUserInfo={setUserInfo} />;
      case 'anexo11':
          return <Anexo11 userInfo={userInfo}/>;
      case 'anexo30':
          return <Anexo30 userInfo={userInfo}/>;
      case 'extras':
          return <Extras userInfo={userInfo}/>;
      default:
        return <ProceduresTable procedures={thesisProcedures} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        userInfo={{
          nombre: userInfo?.nombreCompleto || userInfo?.nombre || "Usuario Anónimo",
          codigo: userInfo?.codigo || "Sin código",
          email: userInfo?.email || "Sin email",
          typeTesis: userInfo?.typeTesis || "Desconocido",
          id: userInfo?.id
        }}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <div className="flex-1 ml-64 p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default ThesisProcedures;