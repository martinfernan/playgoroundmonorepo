const { useCallback, useState } = require('react');
// const TrackService = require('../../services/track');
const TrackServicePrint = (trackData) => { console.log(`%c Trackeando Print ${trackData}`, 'background: #f4a261; color: #fff; padding: 20px'); }
const TrackService = { print: TrackServicePrint}

const useTrackOnPrint = () => {
  const whenIdle = global.requestIdleCallback ? requestIdleCallback : setTimeout;
  const [trackedOnPrint, setTrackedOnPrint] = useState(false)

  const trackOnPrint = useCallback((track) => {
    whenIdle(() => {
      if (!trackedOnPrint) {
        TrackService.print(track);
        setTrackedOnPrint(true)
      }

    });
  }, [whenIdle, trackedOnPrint]);

  return { trackOnPrint, trackedOnPrint, setTrackedOnPrint };
};

module.exports = useTrackOnPrint;
