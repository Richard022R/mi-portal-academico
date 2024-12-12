import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebars';
import ProcedureTables from './ProcedureTables';
import Usuario from './Usuario';
import EditUser from './EditUser';

const DashboardSecre = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [userInfo, setUserInfo] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);

  // Load user info from localStorage on component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  console.log(userInfo);

  // Render content based on active section
  const renderContent = () => {
    switch(activeSection) {
      case 'inicio':
        return <ProcedureTables onEditUser={(id) => {
          setEditingUserId(id);
          setActiveSection('editUser');
        }} />;
      case 'usuario':
        return <Usuario  />;
      case 'alumnos':
        return <div>Gestión de Alumnos</div>;
      case 'documentos':
        return <div>Documentos</div>;
      case 'matriculas':
        return <div>Matrículas</div>;
      default:
        return <ProcedureTables />;
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