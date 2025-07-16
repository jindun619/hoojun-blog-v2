import { createContext, useState, useContext, ReactNode } from 'react';

export interface NavbarParams {
  category: string;
  tags: string[];
}

interface NavbarContextType {
  navbarParams: NavbarParams[];
  setNavbarParams: (params: NavbarParams[]) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children, initialData = [] }: { children: ReactNode, initialData?: NavbarParams[] }) {
  const [navbarParams, setNavbarParams] = useState<NavbarParams[]>(initialData);
  
  return (
    <NavbarContext.Provider value={{ navbarParams, setNavbarParams }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}
