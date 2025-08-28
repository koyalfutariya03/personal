// InterviewQuestion.js (Next.js version with module CSS)
import React, { useState } from 'react';
import styles from '@/InterviewQuestion.module.css';

const InterviewQuestion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const togglePanel = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.accordionOption}>
        <h2 className={styles.title}>Interview Questions</h2>
      </div>
      <div className={styles.clearfix}></div>
      <div className={styles.panelGroup} role="tablist" aria-multiselectable="true">
        {panels.map((panel, index) => (
          <div className={styles.panel} key={index}>
            <div className={styles.panelHeading} role="tab">
              <h4 className={styles.panelTitle}>
                <button
                  className={`${styles.button} ${activeIndex === index ? styles.active : ''}`}
                  onClick={() => togglePanel(index)}
                  aria-expanded={activeIndex === index}
                >
                  {panel.title}
                </button>
              </h4>
            </div>
            <div
              className={`${styles.panelCollapse} ${activeIndex === index ? styles.show : ''}`}
              role="tabpanel"
            >
              <div className={styles.panelBody}>{panel.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const panels = [
  {
    title: 'Collapsible Group Item #1',
    content:
      'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
  },
  {
    title: 'Collapsible Group Item #2',
    content:
      'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
  },
  {
    title: 'Collapsible Group Item #3',
    content:
      'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod.',
  },
];

export default InterviewQuestion;
