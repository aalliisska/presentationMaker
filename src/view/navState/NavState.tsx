import React, { createContext, useState, ReactNode } from 'react';
interface MenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const MenuContext = createContext<MenuContextType>({
  isMenuOpen: true,
  toggleMenu: () => {},
});
interface NavStateProps {
  children: ReactNode; 
}

const NavState: React.FC<NavStateProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenuMode = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu: toggleMenuMode }}>
      {children}
    </MenuContext.Provider>
  );
};

export default NavState;