import React, { useState, useEffect, useRef } from "react";
import { Home, BookOpen, FileText, User, Settings, LogOut } from "lucide-react";

const Sidebar = ({ userInfo, activeSection, onSectionChange, children }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Nuevo estado para la opción seleccionada

  const dropdownRef = useRef(null);
  const userOptionsRef = useRef(null);

  // Cierra solo el menú del usuario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userOptionsRef.current && !userOptionsRef.current.contains(event.target)) {
        setOptionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleDropdownOptionClick = (option) => {
    onSectionChange(option);
  };

  return (
    <div className="flex">
      <div className="w-64 bg-[#1a1f2e] text-white">
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <img src="/unt.png" alt="Logo" className="h-10" />
            <div ref={userOptionsRef} onClick={toggleOptions} className="relative">
              <User className="h-6 w-6" />
              {isOptionsVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded shadow-lg">
                  <div className="p-4 text-sm border-b border-gray-700">
                    <p>Registrado como</p>
                    <p className="font-bold">{userInfo.codigo}</p>
                  </div>
                  <button
                    className={`flex items-center space-x-3 w-full p-3 rounded ${
                      activeSection === "ajustes" ? "bg-gray-700" : "hover:bg-gray-700"
                    }`}
                    onClick={() => onSectionChange("ajustes")}
                  >
                    <Settings className="h-5 w-5 mr-2" />
                    <span>Ajustes</span>
                  </button>
                  <button className="flex items-center w-full p-2 hover:bg-gray-700">
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Desconectar</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center mb-8">
            <img src="/user.png" alt="Avatar" className="w-32 h-32 rounded-full mb-4" />
            <h2 className="text-sm font-bold text-center">{userInfo.nombre}</h2>
            <p className="text-xs text-gray-400">{userInfo.email}</p>
          </div>

          <nav className="space-y-2">
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded ${
                activeSection === "inicio" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => onSectionChange("inicio")}
            >
              <Home className="h-5 w-5" />
              <span>Inicio</span>
            </button>
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded ${
                activeSection === "tesis" ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => onSectionChange("tesis")}
            >
              <BookOpen className="h-5 w-5" />
              <span>Documentación </span>
            </button>
            <div ref={dropdownRef}>
              <button
                className={`flex items-center space-x-3 w-full p-3 rounded justify-between ${
                  isDropdownVisible ? "" : "hover:bg-gray-700"
                }`}
                onClick={() => setDropdownVisible(!isDropdownVisible)}
                aria-expanded={isDropdownVisible}
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5" />   
                  <span>Nuevo Trámite</span>
                </div>
                <span
                  className={`ml-2 transition-transform duration-300 ${
                    isDropdownVisible ? "rotate-0" : "-rotate-90"
                  }`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`mt-2 rounded shadow-lg text-center transition-all duration-300 ${
                  isDropdownVisible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                {userInfo.typeTesis === "Suficiencia"
                  ? ["anexo30", "extras"].map((option) => (
                      <button
                        key={option}
                        className={`flex items-center w-full p-3 rounded ${
                          activeSection === option ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-gray-300"
                        } transition-colors duration-200`}
                        onClick={() => handleDropdownOptionClick(option)}
                      >
                        <span className="ml-2 pl-6">
                          {option === "anexo30" ? "Anexo 30" : "Tesis"}
                        </span>
                      </button>
                    ))
                  : userInfo.typeTesis === "Tesis"
                  ? ["anexo11", "anexo30", "extras"].map((option) => (
                      <button
                        key={option}
                        className={`flex items-center w-full p-3 rounded ${
                          activeSection === option ? "bg-gray-700 text-white" : "hover:bg-gray-700 hover:text-gray-300"
                        } transition-colors duration-200`}
                        onClick={() => handleDropdownOptionClick(option)}
                      >
                        <span className="ml-2 pl-6">
                          {option === "anexo11"
                            ? "Anexo 11 - PT"
                            : option === "anexo30"
                            ? "Anexo 30"
                            : "Tesis"}
                        </span>
                      </button>
                    ))
                  : null}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Sidebar;
