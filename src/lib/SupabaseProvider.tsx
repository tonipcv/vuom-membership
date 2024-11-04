import { createContext, useContext } from 'react';
import supabaseClient from './superbaseClient';

const SupabaseContext = createContext(supabaseClient);

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => useContext(SupabaseContext);
