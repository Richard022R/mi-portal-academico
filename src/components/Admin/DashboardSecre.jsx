import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebars';
import ProcedureTables from './ProcedureTables';

const DashboardSecre = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [userInfo, setUserInfo] = useState(null);

  // Sample thesis procedures data
  const thesisProcedures = [
    {
      id: 'T2024-001',
      name: 'REVISIÓN INICIAL ANEXO 11',
      date: '15 Nov 2024',
      status: 'TRÁMITE FINALIZADO',
      documents: [
        'Informe_Etica.pdf', 
        'Dictamen_Aprobación_Proyecto.pdf'
      ]
    },
    {
      id: 'T2024-002',
      name: 'REVISIÓN INICIAL ANEXO 30',
      date: '29 Nov 2024', 
      status: 'TRÁMITE EN PROCESO',
      documents: [
        'solicitud_jurado.pdf'
      ]
    },
    {
      id: 'T2024-003',
      name: 'ARCHIVOS EXTRAS DE TESIS',
      date: '20 Nov 2024',
      status: 'TRÁMITE EN PROCESO',
      documents: []
    }
  ];

  // Load user info from localStorage on component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Render content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case 'inicio':
        return <ProcedureTables procedures={thesisProcedures} />;
      case 'alumnos':
        return <div>Gestión de Alumnos</div>;
      case 'documentos':
        return <div>Documentos</div>;
      case 'matriculas':
        return <div>Matrículas</div>;
      default:
        return <ProcedureTables procedures={thesisProcedures} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        userInfo={userInfo || { nombre: 'Administrador' }}
      />
      <main className="flex-1">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardSecre;