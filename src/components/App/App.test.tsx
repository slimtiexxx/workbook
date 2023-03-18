import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '@components/App/App'

describe('<App />', () => {
  it('renders basic components', () => {
    render(<App />)

    expect(screen.queryByText('Today')).toBeVisible()
  })
})

export {}
