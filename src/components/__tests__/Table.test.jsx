// eslint-disable-next-line
import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import Table from '../Table'
import Row from '../Row'
import Cell from '../Cell'

it('renders correctly', () => {
  const tree = renderer.create(<Table x={10} y={10} />).toJSON()
  expect(tree).toMatchSnapshot()
})

describe('Table', () => {
  let props
  let mountedTable

  const table = () => {
    if (!mountedTable) {
      mountedTable = mount(<Table {...props} />)
    }
    return mountedTable
  }

  beforeEach(() => {
    props = {
      x: 10,
      y: 5,
    }
    mountedTable = undefined
  })

  // Test 5 rows and 10 cols

  // All tests will go here
  it('always renders a div', () => {
    const divs = table().find('div')
    expect(divs.length).toBeGreaterThan(0)
  })

  it('renders 6 `Row`s each with 11 cols', () => {
    // Expect 6 rows, one is the heading row
    expect(table().find(Row).length).toBe(6)

    // Each row has 11 columns (10 + first heading col)
    for (let i = 0; i < props.y + 1; i += 1) {
      expect(table().childAt(i).find(Cell).length).toBe(11)
    }
  })

  it('when a cell is changed, the state of Table changes accordingly', () => {
    const cell = table().childAt(5).childAt(5)
    expect(cell.find('span').length).toBe(1)
    expect(cell.find('input').length).toBe(0)

    cell.simulate('doubleClick')
    expect(cell.find('span').length).toBe(0)
    expect(cell.find('input').length).toBe(1)

    // Enter "Test"
    cell.find('input').node.value = 'Test'
    cell.find('input').simulate('change', cell.find('input'))
    cell.find('input').simulate('keyPress', { key: 'Enter' })
    expect(cell.text()).toBe('Test')

    expect(table().state().data['5']['5']).toBe('Test')

    // Clear "Test"
    cell.simulate('doubleClick')
    cell.find('input').node.value = ''
    cell.find('input').simulate('change', cell.find('input'))
    cell.find('input').simulate('keyPress', { key: 'Enter' })
    expect(cell.text()).toBe('')

    expect(table().state().data['5']['5']).toBe('')
  })

  it('auto updates formula cells', () => {
    const cell1 = table().childAt(5).childAt(5)
    cell1.simulate('doubleClick')
    cell1.find('input').node.value = 'Some value'
    cell1.find('input').simulate('change', cell1.find('input'))
    cell1.find('input').simulate('keyPress', { key: 'Enter' })
    expect(cell1.text()).toBe('Some value')

    const cell2 = table().childAt(3).childAt(3)
    cell2.simulate('doubleClick')
    cell2.find('input').node.value = '=E5'
    cell2.find('input').simulate('change', cell2.find('input'))
    cell2.find('input').simulate('keyPress', { key: 'Enter' })
    expect(cell2.text()).toBe('Some value')
  })

  it('if pointing to an empty cell, a formula result is empty, not INVALID', () => {
    const cell3 = table().childAt(3).childAt(4)
    cell3.simulate('doubleClick')
    cell3.find('input').node.value = '=A1'
    cell3.find('input').simulate('change', cell3.find('input'))
    cell3.find('input').simulate('keyPress', { key: 'Enter' })
    expect(cell3.text()).toBe('')
  })

  it('if pointing to an unexiting cell, a formula result is INVALID', () => {
    const cell4 = table().childAt(3).childAt(3)
    cell4.simulate('doubleClick')
    cell4.find('input').node.value = '=Z20'
    cell4.find('input').simulate('change', cell4.find('input'))
    cell4.find('input').simulate('keyPress', { key: 'Enter' })
    expect(cell4.text()).toBe('INVALID')
  })
})
