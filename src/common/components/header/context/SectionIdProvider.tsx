import { createContext, useContext, useState } from "react";
import { Section } from "src/common/types/sections/types";


type SectionTitleIdContext = {titleId: Section['id'], setTitleId: React.Dispatch<React.SetStateAction<"home" | "about" | "skills" | "contact">>}
const IdContext = createContext<SectionTitleIdContext>({} as SectionTitleIdContext);

export const SectionIdProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [titleId, setTitleId] = useState<Section['id']>('home');
  return (
    <IdContext.Provider value={{ titleId, setTitleId }}>
      {children}
    </IdContext.Provider>
  );
};

export const useSectionTitleIdContext = (): SectionTitleIdContext => {
  const context = useContext(IdContext);
  return context;
}