import React from 'react';
import styles from '@/styles/CoursesComponents/Learningpath.module.css';

const LearningPath = () => {
  return (
    <div className={styles.container}>
      <h2>Learning Path</h2>
      <ul className={styles.infoWrapper}>
        {[
          { id: 1, text: 'Get Trained' },
          { id: 2, text: 'Info title of some content' },
          { id: 3, text: 'Info title of some content' },
          { id: 4, text: 'Experience Alteration System' },
          { id: 5, text: 'Job Readiness' },
        ].map(({ id, text }) => (
          <li key={id} className={`${styles.infobox} ${styles[`infobox${id}`]}`}>
            <a className={styles.row} href={`#${id}`}>
              <span className={styles.icon}>
                <i className="fa fa-rocket" aria-hidden="true"></i>
              </span>
              <span className={styles.infoText}>
                <h4>{text}</h4>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningPath;
