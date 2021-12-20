const { useCallback, useState, useEffect } = require('react');
const useIsOnViewport = require('./useIntersectionObserver');
// const TrackService = require('../../services/track');
const TrackService = (trackData) => {console.log(`%c Trackeando View data track from ${trackData}`, 'background: #2a9d8f; color: #fff; padding: 20px')}

const useTrackOnView = ({ componentRef = null , trackingFunction = null } = {}) => {
  const { isOnViewport, setIsOnViewport, restartObserver } = useIsOnViewport({ externalRef: componentRef, rootMargin: '0px', threshold: 0.1, once: true });
  const [trackedOnView, setTrackedOnView] = useState(false)

  const serviceToUse = trackingFunction || TrackService;

  const whenIdle = global.requestIdleCallback ? requestIdleCallback : setTimeout;

  const trackOnView = useCallback((track) => {
    if (!global.IntersectionObserver) return;

    whenIdle(() => {
      if (!trackedOnView && isOnViewport) {
        serviceToUse(track);
        setTrackedOnView(true)
        setIsOnViewport(false)
      }
    });
  }, [serviceToUse, whenIdle, trackedOnView, isOnViewport, setIsOnViewport]);

  useEffect(() => {
    if (global.IntersectionObserver && !trackedOnView) {
      restartObserver()
    }
  }, [trackedOnView, restartObserver])

  return { trackOnView, trackedOnView, setTrackedOnView, isOnViewport, setIsOnViewport };
};

module.exports = useTrackOnView;
