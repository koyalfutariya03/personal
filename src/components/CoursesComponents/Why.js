// components/CoursesComponents/Why.js (Updated)

"use client";

import { useState, useEffect, useRef } from "react";
import styles from "@/styles/CoursesComponents/Why.module.css";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

const Why = ({ data }) => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!data) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading "Why" section data...</p>
      </div>
    );
  }

  return (
    <div 
      ref={sectionRef} 
      className={`${styles.containerYds} ${sectionInView ? styles.fadeIn : styles.hidden}`}
    >
      <SectionComponent section={data} />
    </div>
  );
};

const SectionComponent = ({ section }) => {
  const titleRef = useRef(null);
  // Global expanded state for desktop - all cards expand together
  const [globalExpanded, setGlobalExpanded] = useState(false);
  // Individual expanded states for mobile - each card expands independently
  const [individualExpanded, setIndividualExpanded] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      const title = titleRef.current;
      title.classList.add(styles.titleAnimation);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Reset states when switching between mobile/desktop
      if (mobile) {
        setGlobalExpanded(false);
      } else {
        setIndividualExpanded({});
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleExpandToggle = (cardIndex) => {
    if (isMobile) {
      // Mobile: toggle individual card
      setIndividualExpanded(prev => ({
        ...prev,
        [cardIndex]: !prev[cardIndex]
      }));
    } else {
      // Desktop: toggle all cards
      setGlobalExpanded(prev => !prev);
    }
  };

  const isCardExpanded = (cardIndex) => {
    if (isMobile) {
      return individualExpanded[cardIndex] || false;
    } else {
      return globalExpanded;
    }
  };

  return (
    <>
      <h2 ref={titleRef} className={styles.title}>
        <span className={styles.accent} dangerouslySetInnerHTML={{ __html: section.title }}></span>
      </h2>
      <div className={styles.cardsContainerYds}>
        {section.cards && section.cards.length > 0 ? (
          section.cards.map((card, index) => (
            <DataCard
              key={index}
              title={card.title}
              content={card.content}
              listItems={card.listItems}
              index={index}
              expanded={isCardExpanded(index)}
              onExpandToggle={() => handleExpandToggle(index)}
              isMobile={isMobile}
            />
          ))
        ) : (
          <p className={styles.noCards}>No cards available for this section.</p>
        )}
      </div>
    </>
  );
};

const DataCard = ({ title, content, listItems, index, expanded, onExpandToggle, isMobile }) => {
  const [cardRef, cardInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const [showReadMore, setShowReadMore] = useState(false);
  const contentRef = useRef(null);

  // Character limits for different screen sizes
  const DESKTOP_CHAR_LIMIT = 120;
  const MOBILE_CHAR_LIMIT = 100;

  // Calculate total content length
  const getTotalContentLength = () => {
    let totalLength = 0;
    
    if (Array.isArray(content)) {
      totalLength += content.join(' ').replace(/<[^>]*>/g, '').length;
    } else {
      totalLength += content.replace(/<[^>]*>/g, '').length;
    }
    
    if (listItems && listItems.length > 0) {
      totalLength += listItems.join(' ').length;
    }
    
    return totalLength;
  };

  // Check if content should be truncated
  useEffect(() => {
    const totalLength = getTotalContentLength();
    const charLimit = isMobile ? MOBILE_CHAR_LIMIT : DESKTOP_CHAR_LIMIT;
    setShowReadMore(totalLength > charLimit);
  }, [content, listItems, isMobile]);

  // Truncate content based on character limit
  const getTruncatedContent = () => {
    const charLimit = isMobile ? MOBILE_CHAR_LIMIT : DESKTOP_CHAR_LIMIT;
    let currentLength = 0;
    const truncatedContent = [];
    const truncatedListItems = [];

    // Process content paragraphs
    if (Array.isArray(content)) {
      for (let i = 0; i < content.length; i++) {
        const paragraph = content[i];
        const textLength = paragraph.replace(/<[^>]*>/g, '').length;
        
        if (currentLength + textLength <= charLimit) {
          truncatedContent.push(paragraph);
          currentLength += textLength;
        } else {
          const remainingChars = charLimit - currentLength;
          if (remainingChars > 50) {
            const truncatedParagraph = paragraph.replace(/<[^>]*>/g, '').substring(0, remainingChars) + '...';
            truncatedContent.push(truncatedParagraph);
          }
          break;
        }
      }
    } else {
      const textLength = content.replace(/<[^>]*>/g, '').length;
      if (textLength <= charLimit) {
        truncatedContent.push(content);
        currentLength = textLength;
      } else {
        const truncatedText = content.replace(/<[^>]*>/g, '').substring(0, charLimit) + '...';
        truncatedContent.push(truncatedText);
        currentLength = charLimit;
      }
    }

    // Process list items if there's space left
    if (listItems && listItems.length > 0 && currentLength < charLimit) {
      for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        if (currentLength + item.length <= charLimit) {
          truncatedListItems.push(item);
          currentLength += item.length;
        } else {
          break;
        }
      }
    }

    return { content: truncatedContent, listItems: truncatedListItems };
  };

  const renderContent = () => {
    if (!showReadMore || expanded) {
      // Show full content
      return (
        <>
          {Array.isArray(content) ? (
            content.map((paragraph, idx) => (
              <p
                key={idx}
                className={styles.textMutedForegroundClass}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></p>
            ))
          ) : (
            <p
              className={styles.textMutedForegroundClass}
              dangerouslySetInnerHTML={{ __html: content }}
            ></p>
          )}
          
          {listItems && listItems.length > 0 && (
            <ul className={styles.listClass}>
              {listItems.map((item, index) => (
                <li key={index} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          )}
        </>
      );
    } else {
      // Show truncated content
      const truncated = getTruncatedContent();
      return (
        <>
          {truncated.content.map((paragraph, idx) => (
            <p
              key={idx}
              className={styles.textMutedForegroundClass}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></p>
          ))}
          
          {truncated.listItems.length > 0 && (
            <ul className={styles.listClass}>
              {truncated.listItems.map((item, index) => (
                <li key={index} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          )}
        </>
      );
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`${styles.cardClassYds} ${cardInView ? styles.cardVisible : styles.cardHidden} ${expanded ? styles.cardExpanded : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={styles.cardHeader}>
        <h2
          className={styles.textPrimaryClass}
          dangerouslySetInnerHTML={{ __html: title }}
        ></h2>
        <div className={styles.cardIcon}>
          <FontAwesomeIcon icon={faLightbulb} />
        </div>
      </div>
      
      <div ref={contentRef} className={styles.cardContent}>
        {renderContent()}
      </div>
      
      {showReadMore && (
        <div className={styles.readMoreContainer}>
          <button 
            className={styles.readMoreButton}
            onClick={onExpandToggle}
            aria-expanded={expanded}
          >
            {expanded ? (isMobile ? 'Read Less' : 'Read Less') : (isMobile ? 'Read More' : 'Read More')}
            {!isMobile && !expanded && (
              <span className={styles.allCardsHint}></span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Why;