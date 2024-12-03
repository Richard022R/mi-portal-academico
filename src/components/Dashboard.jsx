import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProceduresTable from './ProceduresTable';
import Ajuste from './Ajuste'
import Anexo11 from './Anexo11'

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
      name: 'REVISIÓN INICIAL DE PROYECTO DE TESIS',
      date: 'mar 15, 2024',
      status: 'TRÁMITE FINALIZADO',
      documents: ['proyecto_tesis.pdf', 'carta_asesor.pdf']
    },
    {
      id: 'T2024-002',
      name: 'DESIGNACIÓN DE JURADO EVALUADOR',
      date: 'abr 05, 2024',
      status: 'TRÁMITE EN PROCESO',
      documents: ['solicitud_jurado.pdf']
    },
    {
      id: 'T2024-003',
      name: 'SUSTENTACIÓN DE TESIS',
      date: 'may 20, 2024',
      status: 'PENDIENTE',
      documents: []
    }
  ];

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'inicio':
        return <ProceduresTable procedures={thesisProcedures} />;
      case 'tesis':
        return <div>Proceso de Tesis</div>;
      case 'ajustes':
          console.log(userInfo)
          return <Ajuste userInfo={userInfo} setUserInfo={setUserInfo} />;
      case 'anexo11':
          return <Anexo11/>;
      case 'anexo30':
          return <div>Hola soy Anexo 30</div>;
      case 'extras':
          return <div>Hola soy los archisov de Tesis</div>;
      default:
        return <ProceduresTable procedures={thesisProcedures} />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        userInfo={{
          nombre: userInfo?.nombreCompleto || userInfo?.nombre,
          codigo: userInfo?.codigo,
          email: userInfo?.email,
          typeTesis: userInfo?.typeTesis
        }}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <div className="flex-1 p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ThesisProcedures;