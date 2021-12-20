import React, { useState, useRef, useEffect } from 'react'
import useTrackOnPrint from '../hooks/useTrackOnPrint'
import useTrackOnView from '../hooks/useTrackOnView'
import useRecommendations from '../hooks/useRecommendations'

const Comparator = (props) => {
  const { track, productId, handleProductId } = props
  const [recommendations, setRecommendations] = useState([1,2,3])
  const comparatorRef = useRef()
  const { trackOnPrint, trackedOnPrint, setTrackedOnPrint } = useTrackOnPrint()
  const { trackOnView, trackedOnView, setTrackedOnView, isOnViewport: wasOnViewport } = useTrackOnView({ componentRef: comparatorRef })
  const { recommendations: recommendationsFromService } = useRecommendations({ props, componentRef: comparatorRef })
  
  // Log for test the number of renders
  console.log('render comp')
  // console.log(`Tengo estas recomendaciones from service: ${recommendationsFromService}`)

  
  // TRACK RESET => When productId (or another dependency) changes, set all tracks to untracked
  useEffect(() => {
    setTrackedOnPrint(false)
    setTrackedOnView(false)
  }, [productId, setTrackedOnPrint, setTrackedOnView])


  // TRACK ON PRINT => Automatic track when becomes untracked
  useEffect(() => {
    trackOnPrint(track)
  }, [track, trackOnPrint, trackedOnPrint])


  // TRACK ON VIEW => Track when is on the viewport and is untracked
  useEffect(() => {
    if (wasOnViewport) {
      trackOnView(track)
    }
  }, [wasOnViewport, track, trackOnView, trackedOnView])


  // SET RECOMMENDATIONS => When productId (or another dependency) changes, setting the recommendations
  useEffect(() => {
    props.apiResponse ? setRecommendations(props.apiResponse.recommendations) : setRecommendations(recommendationsFromService)
  }, [productId, props.apiResponse, recommendationsFromService])


  return (
    <section ref={comparatorRef} style={{ border: '2px solid red', minHeight: '80vh' }}>
      <h2>This is Comparator</h2>
      <p>Tengo {recommendations.length} recomendaciones</p>
      <br />
      <p>Product ID = {productId}</p>
      <button onClick={() => handleProductId(productId + 1)}>Change Product ID</button>
    </section>
  )
}

export default Comparator
