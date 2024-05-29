import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export default function HorizontalScroll({ styleClasses, children }) {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += event.deltaY;
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);

      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      style={{
        overflowY: 'hidden',
        overflowX: 'scroll',
      }}
      className={`${styleClasses}`}
    >
      {children}
    </div>
  );
}

HorizontalScroll.propTypes = {
  children: PropTypes.any,
  styleClasses: PropTypes.string,
};
