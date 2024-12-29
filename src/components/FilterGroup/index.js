import NxtWatchContext from '../../context/NxtWatchContext'
import FilterItem from '../FilterItem'
import './index.css'

const FilterGroup = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDark, filterItemList} = value

      const filtercon = isDark ? 'filter-grp-dark' : 'filter-grp-light'
      return (
        <div className={filtercon}>
          <ul className="list-con">
            {filterItemList.map(eachItem => (
              <FilterItem details={eachItem} key={eachItem.id} />
            ))}
          </ul>
          <div className="footer-con">
            <p className="footer-heading"> CONTACT US </p>
            <ul className="footer-icons-con">
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="footer-icon"
                />
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="footer-icon"
                />
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="footer-icon"
                />
              </li>
            </ul>
            <p> Enjoy! Now to see your channels and recommendations! </p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default FilterGroup
