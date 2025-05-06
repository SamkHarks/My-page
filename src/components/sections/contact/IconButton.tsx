import { lazy, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GoLinkExternal } from 'react-icons/go';
import { usePreloadModalContent } from 'src/hooks/hooks';
import * as styles from 'src/components/sections/contact/Contact.module.css';
import { AiOutlineMail } from 'react-icons/ai';

const Email = lazy(() => import('src/components/email/Email').then((module) => ({ default: module.Email })));

export const IconButton = (): React.JSX.Element => {
  const handlePress = usePreloadModalContent();
  const {t} = useTranslation('contact');
  const onClick = useCallback(() => {
    window.open('mailto:samikh90@gmail.com', '_blank');
  }, []);
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