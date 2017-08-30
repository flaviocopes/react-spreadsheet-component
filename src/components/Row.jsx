// eslint-disable-next-line
import React from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

/**
 * Row manages a single row of the table
 */
const Row = (props) => {
  const cells = []
  const y = props.y
  for (let x = 0; x < props.x; x += 1) {
    cells.push(
      <Cell
        key={`${x}-${y}`}
        y={y}
        x={x}
        onChangedValue={props.handleChangedCell}
        updateCells={props.updateCells}
        value={props.rowData[x] || ''}
        executeFormula={props.executeFormula}
      />,
    )
  }
  return (
    <div>
      {cells}
    </div>
  )
}

Row.propTypes = {
  /**
   * Function called when a cell of the row changes
   * its value
   */
  handleChangedCell: PropTypes.func.isRequired,

  /**
   * Function called when a cell of the row needs
   * a formula recalculation
   */
  executeFormula: PropTypes.func.isRequired,

  /**
   * Function called when a cell is refreshed and requires
   * an update of the others
   */
  updateCells: PropTypes.func.isRequired,

  /**
   * The number of columns of the table, used to know
   * how many cells to add
   */
  x: PropTypes.number.isRequired,

  /**
   * The identifier value of the row
   */
  y: PropTypes.number.isRequired,

  /**
   * The values of the cells in the row
   */
  rowData: PropTypes.shape({
    string: PropTypes.string,
  }).isRequired,
}

export default Row
