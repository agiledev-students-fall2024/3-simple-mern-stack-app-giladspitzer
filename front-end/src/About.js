import './About.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const About = props => {
  const [aboutText, setAboutText] = useState(null)
  const [imgUrl, setImgUrl] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const fetchAboutData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const { aboutText, imgUrl } = response.data
        setAboutText(aboutText)
        setImgUrl(imgUrl)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  useEffect(() => {
    setTimeout(fetchAboutData, 2000)
  }, [])
  if (error) {
    return (
      <div className="error-message">
        <p>Sorry, an error occurred 😞</p>
        <button onClick={() => alert(error)}>See Details</button>
      </div>
    )
  }

  if (!loaded) {
    return (
      <div className="loading-placeholder">
        <div className="image-placeholder"></div>
        <div className="text-placeholder"></div>
      </div>
    )
  }

  return (
    <div className="about-content">
      {/* Show fetched data once it's loaded */}
      {imgUrl && (
        <img src={imgUrl} alt="About section" style={{ maxWidth: '100%' }} />
      )}
      {aboutText && <p>{aboutText}</p>}
    </div>
  )
}

// make this component available to be imported into any other file
export default About
