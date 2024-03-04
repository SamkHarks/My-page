import React from 'react';
import styles from './Skills.module.css';
import { useFetchData } from '../../../hooks/hooks';
import { SkillsResponse } from './types';
import { DataProps, ServiceData } from '../../serviceData/ServiceData';
import { useTranslation } from 'react-i18next';
import { ICONS } from './utils';
import { MdKeyboardArrowDown } from 'react-icons/md';


export const Skills = () => {
    const service = useFetchData<SkillsResponse>('skills.json');
    return <ServiceData service={service} Renderer={Renderer}/>;
};

const Renderer = (props: DataProps<SkillsResponse> ) => {
    const { skills } = props.data;
    return (
        <div className={styles.skills_container}>
            {
                skills.map((item) => {
                    return (
                        <div key={item.category} className={styles.category_container}>
                            <h3>{item.category}</h3>
                            <div className={styles.items_container}>
                                {
                                    item.items.map((skill) => {
                                        return (
                                            <Skill key={skill} skill={skill} category={item.category} />
                                        );
                                    })

                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

type SkillProps = {
    skill: string;
    category: string;
}
const Skill = ({ skill, category }: SkillProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const { t } = useTranslation('skills');
    const onClick = () => {
        setIsExpanded(!isExpanded);
    };
    const IconComponent = ICONS[skill];
    return (
        <button className={`${styles.button} ${isExpanded ? styles.selected : ''}`} key={skill} onClick={onClick}>
            <div className={styles.button_title_row}>
                <div className={styles.button_title}>
                    {IconComponent && <IconComponent size={30} />}
                    <p>{skill}</p>
                </div>
                <MdKeyboardArrowDown className={`${isExpanded ? styles.rotate_down : styles.rotate_up}`} size={20} />
            </div>
            {isExpanded &&
                <div className={styles.expanded}>
                    <p className={styles.text}>{t(`${category}.${skill}`)}</p>
                </div>
            }
        </button>
    );
} 