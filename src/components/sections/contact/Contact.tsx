import React from "react";
import styles from "./Contact.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Animation } from "../../animation/Animation";

export const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.canvas}>
        <Animation type={"zigzag"} numVertices={30} width={window.innerWidth} height={580} />
      </div>
      <a href="mailto:samikh90@gmail.com" className={styles.icon}>
        <AiOutlineMail size={25} />
      </a>
      <a
        href="https://github.com/SamkHarks"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiGithub size={25} className={styles.icon} />
      </a>
      <a
        href="https://www.linkedin.com/in/sami-h%C3%A4rk%C3%B6nen-di/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin size={25} className={styles.icon} />
      </a>
    </div>
  );
};
