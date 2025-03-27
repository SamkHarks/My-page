import { useState } from "react";
import { HeaderToolbar } from "src/components/header/toolbar/HeaderToolbar";
import { HeaderProps } from "src/components/header/types";
import { SectionIdProvider } from "src/components/header/SectionIdProvider";
import { HeaderSections } from "src/components/header/sections/HeaderSections";

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


