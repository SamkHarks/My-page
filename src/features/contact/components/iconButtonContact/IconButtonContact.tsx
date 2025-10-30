import { lazy, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoLinkExternal } from 'react-icons/go';
import { usePreloadModalContent } from 'src/common/hooks/hooks';
import * as styles from 'src/features/contact/components/Contact.module.css';
import { AiOutlineMail } from 'react-icons/ai';

const ContactForm = lazy(() => import('src/features/contact/components/contactForm/ContactForm').then((module) => ({ default: module.ContactForm })));

export const IconButtonContact = (): React.JSX.Element => {
  const handlePress = usePreloadModalContent();
  const {t} = useTranslation('contact');
  const onClick = useCallback(() => {
    window.open('mailto:samikh90@gmail.com', '_blank');
  }, []);
  const modalConfig = useMemo(() => ({
    content: <ContactForm />,
    title: t('form.title'),
    IconButton: GoLinkExternal,
    iconButtonProps: {
      size: 20,
      onClick
    }
  }), [onClick, t]);

  const onPress = () => {
    handlePress(modalConfig);
  }

  return (
    <>
      <span
        className={styles.icon}
        onClick={onPress}
      >
        <AiOutlineMail size={25} />
      </span>
    </>
  )
}