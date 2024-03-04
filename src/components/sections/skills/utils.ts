import { IconType } from 'react-icons';
import {
    FaJsSquare,
    FaNodeJs,
    FaExternalLinkAlt,
    FaDatabase
} from 'react-icons/fa';
import {
    SiTypescript,
    SiExpress,
    SiMongodb,
    SiFirebase,
    SiDocker,
    SiOpenai,
    SiRedux,
    SiReduxsaga,
    SiGraphql,
    SiApollographql,
    SiSvg,
    SiCplusplus,
    SiDeno,
}
    from 'react-icons/si';
import { DiPython, DiReact, DiScrum, DiHtml5, DiGithubBadge, DiCss3, } from "react-icons/di";
import { TbSql, TbApi } from 'react-icons/tb';
import { FiGithub } from 'react-icons/fi';


export const ICONS: { [key: string]: IconType } = {
    React: DiReact,
    JavaScript: FaJsSquare,
    TypeScript: SiTypescript,
    HTML5: DiHtml5,
    'React Native': DiReact,
    'Node.js': FaNodeJs,
    Express: SiExpress,
    MongoDB: SiMongodb,
    Firebase: SiFirebase,
    Python: DiPython,
    Git: DiGithubBadge,
    SQL: TbSql,
    NoSQL: FaDatabase,
    Mongoose: SiMongodb,
    Scrum: DiScrum,
    CSS3: DiCss3,
    Link: FaExternalLinkAlt,
    GitHubLink: FiGithub,
    Docker: SiDocker,
    'OpenAI': SiOpenai,
    'REST APIs': TbApi,
    GraphQL: SiGraphql,
    'Apollo GraphQL': SiApollographql,
    'Redux-Saga': SiReduxsaga,
    Redux: SiRedux,
    SVG: SiSvg,
    'C++': SiCplusplus,
    Deno: SiDeno
};