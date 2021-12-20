const { useEffect, useRef, useState } = require('react');

const useIsOnViewport = ({
  externalRef = null,
  rootMargin = '0px',
  threshold = 0.1,
  once = false,
} = {}) => {
  const [isOnViewport, setIsOnViewport] = useState(false);
  const fromRef = useRef();
  let observerRef = useRef(null)
  let initObserverRef = useRef(() => { console.log('soy una no op')})
  
  useEffect(() => {
    const elementRef = externalRef ? externalRef.current : fromRef.current;

    if (global.IntersectionObserver) {
      const onChange = (entries, io) => {
        const element = entries[0];
        if (element.isIntersecting) {
          setIsOnViewport(true);
          // once && io.unobserve(elementRef);
          if (once) {
            io.unobserve(elementRef);
            console.log('%c apagando io from io hook', 'background: #cae1e6; color: #000; padding: 20px');
          }
        } else {
          !once && setIsOnViewport(false);
        }
      };

      initObserverRef.current = () => {
        if (elementRef) {
          observerRef.current.observe(elementRef);
          console.log('%c iniciando io from io hook', 'background: #cae1e6; color: #fff; padding: 20px');
        }
      }

      observerRef.current = new IntersectionObserver(onChange, { rootMargin, threshold });
      initObserverRef.current()
    }

    return () => {
      observerRef.current && observerRef.current.disconnect();
    };
  }, [rootMargin, threshold, externalRef, once]);

  return { isOnViewport, setIsOnViewport, fromRef, observer: observerRef.current , restartObserver: initObserverRef.current };
};

module.exports = useIsOnViewport;
