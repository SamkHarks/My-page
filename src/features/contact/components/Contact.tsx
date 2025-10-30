import * as styles from "src/features/contact/components/Contact.module.css";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Animation } from "src/common/components/animation/Animation";
import { IconButtonContact } from "src/features/contact/components/iconButtonContact/IconButtonContact";


export const Contact = (): React.JSX.Element => (
  <div>
    <div className={styles.canvas}>
      <Animation
        type={"zigzag"}
        numVertices={30}
        width={Math.max(window.innerWidth, 1000)}
        height={580}
        allowDynamic={true}
      />
    </div>
    <div className={styles.container}>
      <IconButtonContact />
      <a
        href={"https://github.com/SamkHarks"}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        <SiGithub size={25} className={styles.icon} />
      </a>
      <a
        href={"https://www.linkedin.com/in/sami-h%C3%A4rk%C3%B6nen-di/"}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        <FaLinkedin size={25} className={styles.icon} />
      </a>
    </div>
  </div>
);

