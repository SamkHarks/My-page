import React from 'react';
import me from '../../images/Sami.jpeg';
import { useTranslation } from 'react-i18next';
import styles from './About.module.css';


export const About = () => {
    const { t } = useTranslation('about');
    return (
        <div>
            <img
                className={styles.profile_image}
                src={me}
                alt='picture of me'
            />
            <p>
                {t('introduction')}
            </p>
            <p className={styles.margin_top}>
                {t('main')}
            </p>
        </div>
    );
};
