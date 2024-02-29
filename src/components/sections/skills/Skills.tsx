import React from 'react';
import styles from './Skills.module.css';
import { useFetchData } from '../../../hooks/hooks';
import { SkillsResponse } from './types';
import { DataProps, ServiceData } from '../../serviceData/ServiceData';



export const Skills = () => {
    const service = useFetchData<SkillsResponse>('skills.json');
    return <ServiceData service={service} Renderer={Renderer}/>;
};

const Renderer = (props: DataProps<SkillsResponse> ) => {
    const { skills } = props.data;
    return (
        <div className={styles.container}>
            <p>I have done this and that, and work over 2 years as a mobile developer at Veikkaus</p>
            <div className={styles.skills_container}>
                {
                    skills.map((item) => {
                        return (
                            <div key={item.category} className={styles.category_container}>
                                <p>{`${item.category}:`}</p>
                                <div className={styles.items_container}>
                                    {
                                        item.items.map((skill) => {
                                            return (
                                                <button className={styles.button} key={skill} onClick={() => console.log('Heello')}>
                                                    <p>{skill}</p>
                                                </button>
                                            );
                                        })

                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};