// eslint-disable-next-line
import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Cell from '../Cell'

describe('A Cell', () => {
  const handleChangedCell = () => {}
  const executeFormula = () => {}
  const updateCells = () => {}

  const x = 4
  const y = 2
  const cell1 = shallow(
    <Cell
      key={`${x}-${y}`}
      y={y}
      x={x}
      onChangedValue={handleChangedCell}
      updateCells={updateCells}
      executeFormula={executeFormula}
      value={''}
    />,
  )

  const cell2 = shallow(
    <Cell
      key={`${x}-${y}`}
      y={y}
      x={x}
      onChangedValue={handleChangedCell}
      updateCells={updateCells}
      executeFormula={executeFormula}
      value={'Test'}
    />,
  )

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Cell
          key={`${x}-${y}`}
          y={y}
          x={x}
          onChangedValue={handleChangedCell}
          updateCells={updateCells}
          executeFormula={executeFormula}
          value={'Test'}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('is has empty content if initialized with value={""}', () => {
    expect(cell1.text()).toEqual('')
  })

  it('is contains "Test" if initialized with value={"Test"}', () => {
    expect(cell2.text()).toEqual('Test')
  })

  it('is a span in normal state', () => {
    expect(cell1.find('input').length === 0).toEqual(true)
    expect(cell1.find('span').length === 1).toEqual(true)
  })

  it('becomes an input if double clicked', () => {
    cell1.find('span').simulate('doubleClick')
    expect(cell1.find('span').length === 0).toEqual(true)
    expect(cell1.find('input').length === 1).toEqual(true)
  })
})
