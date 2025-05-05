import * as styles from "src/components/sections/contact/Contact.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Animation } from "src/components/animation/Animation";
import { lazy, useCallback,useMemo } from "react";
import { GoLinkExternal } from "react-icons/go";
import { useTranslation } from "react-i18next";
import { Spinner } from "src/components/spinner/Spinner";
import { usePreloadModalContent } from "src/hooks/hooks";

const Email = Object.assign(
  lazy(() => import('src/components/email/Email').then((module) => ({ default: module.Email }))),
  {
    preload: () => import("src/components/email/Email"),
  }
);

export const Contact = (): React.JSX.Element => {
  const {handlePress, isLoading} = usePreloadModalContent();
  const {t} = useTranslation('contact');

  const onClick = useCallback(() => {
    window.open('mailto:samikh90@gmail.com', '_blank');
  }, [])

  const modalConfig = useMemo(() => ({
    content: <Email />,
    title: t('form.title'),
    IconButton: GoLinkExternal,
    iconButtonProps: {
      size: 20,
      onClick
    }
  }), [onClick, t]);

  const onPress = () => {
    handlePress(Email.preload, modalConfig);
  } 


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
        {isLoading ? (
          <Spinner size={25} />
        ) : (
          <span
            className={styles.icon}
            onClick={onPress}
          >
            <AiOutlineMail size={25} />
          </span>
        )}
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

