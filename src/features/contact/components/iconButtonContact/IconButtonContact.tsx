import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { GoLinkExternal } from 'react-icons/go';
import { usePreloadModalContent } from 'src/common/hooks/usePreloadModalContent';
import { AiOutlineMail } from 'react-icons/ai';
import * as styles from 'src/features/contact/components/iconButtonContact/IconButton.module.css';

const ContactForm = lazy(() => import('src/features/contact/components/contactForm/ContactForm').then((module) => ({ default: module.ContactForm })));

export const IconButtonContact = (): React.JSX.Element => {
  const handlePress = usePreloadModalContent();
  const {t} = useTranslation('contact');
  const onClick = () => {
    window.open('mailto:samikh90@gmail.com', '_blank');
  };
  const modalConfig = {
    content: <ContactForm />,
    title: t('form.title'),
    IconButton: GoLinkExternal,
    iconButtonProps: {
      size: 20,
      onClick
    }
  };

  const onPress = () => {
    handlePress(modalConfig);
  }

  return (
    <button
      className={styles.icon_button}
      onClick={onPress}
      type={"button"}
      aria-label={t('form.openContactForm')}
    >
      <AiOutlineMail size={25} />
    </button>
  )
}