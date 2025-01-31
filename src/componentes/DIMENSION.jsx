import React, { useState, useEffect, createContext } from "react";

// Criando o contexto
const MeuContexto = createContext();

// Componente que fornece o contexto
const Dimension = ({ children }) => {
  const [width, setWidth] = useState(window.innerHeight);

  // Atualiza a largura quando a tela é redimensionada
  useEffect(() => {
    const handleResize = () => setWidth(window.innerHeight);
    window.addEventListener("resize", handleResize);

    // Limpeza do evento quando o componente é desmontado
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MeuContexto.Provider value={width}>
      {children}
    </MeuContexto.Provider>
  );
};

export { MeuContexto, Dimension };
