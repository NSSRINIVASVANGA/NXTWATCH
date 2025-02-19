import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import {ListContainer} from './styledComponents'
import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'
import TrendingVideoItem from '../TrendingVideoItem'

const apiStatusConstants = {
  success: 'SUCCESS',
  progress: 'PROGRESS',
  fail: 'FAIL',
  initial: 'INITIAL',
}

class TrendingVideoBanner extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
  }

  componentDidMount() {
    this.getVideoList()
  }

  getUpdatedData = data => ({
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
    },
    id: data.id,
    publishedAt: data.published_at,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
  })

  onSuccess = data => {
    const updatedList = data.videos.map(eachVideo =>
      this.getUpdatedData(eachVideo),
    )
    this.setState({
      videosList: updatedList,
      apiStatus: apiStatusConstants.success,
    })
  }

  onFail = () => {
    this.setState({apiStatus: apiStatusConstants.fail})
  }

  getVideoList = async () => {
    this.setState({apiStatus: apiStatusConstants.progress})
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data)
    } else {
      this.onFail()
    }
  }

  renderSuccess = isDark => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length === 0 ? (
          <div className="fail-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="fail-img"
            />
            <div className={isDark ? 'fail-dark' : 'fail-light'}>
              <h1> No Serach results found. </h1>
              <p> Try different key words or remove search filters. </p>
              <button type="button" onClick={this.onRetry} className="fail-btn">
                {' '}
                Retry{' '}
              </button>
            </div>
          </div>
        ) : (
          <ListContainer>
            {videosList.map(eachVideo => (
              <TrendingVideoItem details={eachVideo} key={eachVideo.id} />
            ))}
          </ListContainer>
        )}
      </>
    )
  }

  onRetry = () => this.getVideoList()

  renderFail = isDark => (
    <div className="fail-con">
      <img
        src={
          isDark
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        className="fail-img"
      />
      <div className={isDark ? 'fail-dark' : 'fail-light'}>
        <h1> Oops! Something Went Wrong. </h1>
        <p>
          We are having some trouble to complete your requset.
          <br />
          Please try again.
        </p>
        <button type="button" onClick={this.onRetry} className="fail-btn">
          {' '}
          Retry{' '}
        </button>
      </div>
    </div>
  )

  renderProgress = () => (
    <div className="fail-con" data-testid="loader">
      <Loader type="ThreeDots" color="#00306e" height="50" width="50" />
    </div>
  )

  getData = isDark => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess(isDark)
      case apiStatusConstants.progress:
        return this.renderProgress()
      case apiStatusConstants.fail:
        return this.renderFail(isDark)
      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          return <>{this.getData(isDark)}</>
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default TrendingVideoBanner

/*
renderSuccess = isDark => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length === 0 ? (
          <div className="fail-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="fail-img"
            />
            <div className={isDark ? 'fail-dark' : 'fail-light'}>
              <h1> No Serach results found. </h1>
              <p> Try different key words or remove search filters. </p>
              <button type="button" onClick={this.onRetry} className="fail-btn">
                {' '}
                Retry{' '}
              </button>
            </div>
          </div>
        ) : (
          <ListContainer>
            {videosList.map(eachVideo => (
              <TrendingVideoItem details={eachVideo} key={eachVideo.id} />
            ))}
          </ListContainer>
        )}
      </>
    )
  }

*/
