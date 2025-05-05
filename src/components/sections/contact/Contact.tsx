import * as styles from "src/components/sections/contact/Contact.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Animation } from "src/components/animation/Animation";
import { useModalStore } from "src/stores/useModalStore";
import { lazy, useCallback } from "react";
import { GoLinkExternal } from "react-icons/go";
import { useTranslation } from "react-i18next";

const Email = Object.assign(
  lazy(() => import('src/components/email/Email').then((module) => ({ default: module.Email }))),
  {
    preload: () => import("src/components/email/Email"),
  }
);

export const Contact = (): React.JSX.Element => {
  const openModal = useModalStore((state) => state.openModal);
  const {t} = useTranslation('contact');

  const onClick = useCallback(() => {
    window.open('mailto:samikh90@gmail.com', '_blank');
  }, [])

  const onPress = useCallback(() => {
    openModal({
      content: <Email />,
      title: t('form.title'),
      IconButton: GoLinkExternal,
      iconButtonProps: {
        size: 20,
        onClick
      }

    });
  }, [openModal, onClick, t]);

  const handlePreload = useCallback(() => {
    Email.preload();
  }, []);

  return (
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
        <span
          className={styles.icon}
          onClick={onPress}
          onMouseEnter={handlePreload}
          onTouchStart={handlePreload}
        >
          <AiOutlineMail size={25} />
        </span>
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
  )
};

