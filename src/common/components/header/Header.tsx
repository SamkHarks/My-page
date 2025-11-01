import { useState } from "react";
import { HeaderToolbar } from "src/common/components/header/components/headerToolbar/HeaderToolbar";
import { HeaderProps } from "src/common/components/header/types";
import { SectionIdProvider } from "src/common/components/header/context/SectionIdProvider";
import { HeaderSections } from "src/common/components/header/components/headerSections/HeaderSections";

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


