const { useState, useCallback } = require('react');
// const RecommendationsService = require('../../services');

const useGetRecommendations = (props) => {
  const [results, setResults] = useState([1,2,3,4,5,6,7,8]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // const getRecommendations = RecommendationsService.fetchRecommendations;
  const getRecommendations = () => fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => { return { data: [json], isLoaded: true } })

  const getRecommendationsByClient = useCallback((client) => {
    // const query = {
    //   site_id: props.siteId,
    //   product_id: props.productId,
    //   tracking: true,
    //   product_details: true,
    //   pdp_filters: props.pdp_filters || null,
    //   // env: RecommendationsService.getLab(props),
    // };

    const query = {}

    setLoading(true);
    setError(false);

    getRecommendations({ ...query, client })
      .then((response) => {
        console.warn(`Fetcheando data de ${client}`)
        console.error(`Resultados de ${client}`, response)
        setResults((prevResults) => [...prevResults, 2]);
        console.info('estos son los resultados', results)
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    
    return { results, error, loading };
  }, [error, loading, results]);

  return getRecommendationsByClient;
};

module.exports = useGetRecommendations;
