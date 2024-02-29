import React from 'react';
import styles from './Skills.module.css';
import { useFetchSkills } from './hooks';



export const Skills = () => {
    const service = useFetchSkills();
    switch (service.state) {
        case 'IDLE':
        case 'LOADING':
            return (
                <div>
                    <p>loading</p>
                </div>
            );
        case "SUCCESS":
            return (
                <div className={styles.container}>
                    <p>I have done this and that, and work over 2 years as a mobile developer at Veikkaus</p>
                </div>
            );
        case 'FAILURE':
            return (
                <div>
                    <p>Oops something went wrong</p>
                </div>
            );
        default:
            return null;
    }
};