import { useState } from "react";
import { HeaderToolbar } from "src/features/header/components/headerToolbar/HeaderToolbar";
import { HeaderProps } from "src/features/header/types";
import { SectionIdProvider } from "src/features/header/context/SectionIdProvider";
import { HeaderSections } from "src/features/header/components/headerSections/HeaderSections";

export const Header = ({ sectionRefs, sections }: HeaderProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header>
      <SectionIdProvider>
        <HeaderToolbar
          onClick={onClick}
          isOpen={isOpen}
          sections={sections}
        />
        <HeaderSections
          onClick={onClick}
          sectionRefs={sectionRefs}
          isOpen={isOpen}
          sections={sections}
        />
      </SectionIdProvider>
    </header>
  );
};


