import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import defaultStyles from './style.scss'

export const DELTA_UP = '+'
export const DELTA_DOWN = '-'

const itemPropType = PropTypes.shape({
  figure: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  desc: PropTypes.string.isRequired,
  deltaType: PropTypes.oneOf([DELTA_UP, DELTA_DOWN]),
  deltaContent: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number,
  ]),
})

const renderDelta = (item, deltaClass) => {
  if (!item.deltaContent)
    return null

  const classes = [deltaClass]
  switch (item.deltaType) {
    case DELTA_UP:
      classes.push(defaultStyles.deltaUp)
      break
    case DELTA_DOWN:
      classes.push(defaultStyles.deltaDown)
      break
    default:
      break
  }

  return <small className={classNames(classes)}>{item.deltaContent}</small>
}

/**
 * Stat card component for displaying large, simple metrics.
 *
 * @example
 * // A stat card with a number and a description.
 * <StatCard item={{ stat: 12, desc: 'Cups of coffee', }}/>
 *
 * @example
 * // A stat card with a number and description, along with a 'delta'
 * // indicating a 'success'. Alternatives are 'warning', 'danger', 'info'.
 * <StatCard item={{
 *   stat: 12,
 *   desc: 'Coffees',
 *   deltaType: 'success',
 *   deltaContent: '25%'
 * }}/>
 *
 * @example
 * // A stat card with multiple items.
 * <StatCard items={[
 *   { stat: 12, desc: 'Coffees', deltaType: 'success', deltaContent: '25%' },
 *   { stat: 8, desc: 'Teas', deltaType: 'danger', deltaContent: '25%' },
 *   { stat: 1, desc: 'Juices' }
 * ]}/>
 */
export default class StatCard extends Component {
  static propTypes = {
    item: itemPropType,
    items: PropTypes.arrayOf(itemPropType),
    styleNames: PropTypes.shape({
      statcard: PropTypes.object,
      figure: PropTypes.object,
      desc: PropTypes.object,
      delta: PropTypes.object,
    }),
  }

  renderItem = (item, styleNames) => {
    const classes = Object.assign({}, styleNames, item.styleNames)
    return (<div key={item.key || item.desc}>
      <span className={classes.desc}>{item.desc}</span>
      <div className={classes.figure}>
        {item.figure}
        {renderDelta(item, classes.delta)}
      </div>
    </div>)
  }

  render() {
    const styleNames = Object.assign({}, defaultStyles, this.props.styleNames)
    if (this.props.item)
      return (<div className={styleNames.statcard}>
        {this.renderItem(this.props.item, styleNames)}
      </div>)
    return (<div className={styleNames.statcard}>
      {this.props.items.map(item => this.renderItem(item, styleNames))}
    </div>)
  }
}
