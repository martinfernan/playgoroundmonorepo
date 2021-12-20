const { useState, useEffect } = require('react');
const useIsOnViewport = require('./useIntersectionObserver');

// const TrackService = require('../../services/track');

const useRecommendations = ({ props, componentRef }) => {
  const {isOnViewport} = useIsOnViewport({externalRef: componentRef})
  const [recommendations, setRecommendations] = useState([1, 2, 3, 4]);

  // When productId (or another dependency) changes, clean the recos, and fetch recommendations
  // If the ref is on the viewport and has at least one client already fetched, dont update the recommendations and track the ignored request

  // if (recommendations.length > 0 && isOnViewport) {
  //   // TrackService.requestIgnored(client);
  //   console.log(`%c Ignorando track from ${client}`, 'background: #feaa8f; color: #fff; padding: 20px')
  //   return;
  // }

  useEffect(() => {

    setRecommendations([])

    props.clients.forEach((client) => {
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then((json) => {
          setRecommendations((prevRecommendations) => {
            console.log(`Recomendaciones adentro del foreach ${recommendations}`)
            if( isOnViewport && recommendations.length > 0 ) return [...prevRecommendations]
            return [...prevRecommendations, { client, reco: json }]
          });
        })
    })


    
  }, [props.productId])

  

  return { recommendations };
};

module.exports = useRecommendations;

// En componente comparador:

// const {apiResponse} = props
// const myRef = useRef()

// const recommendations = apiResponse ? apiResponse.recommendations : {recommendations} = useRecommendations({props, componentRef: myRef})
// TODO ... Meter el llamado a useRecommendations en un efect que dependa de productId ???

