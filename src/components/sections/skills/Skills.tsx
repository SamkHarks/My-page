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
            <div style={{ columnGap: 10, display: 'flex' }}>
                {
                    skills.map((item) => {
                        return (
                            <div key={item.category}>
                                <p>{`${item.category}: `}</p>
                                {
                                    item.items.map((skill) => {
                                        return (
                                            <div key={skill}>
                                                <p>{skill}</p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};