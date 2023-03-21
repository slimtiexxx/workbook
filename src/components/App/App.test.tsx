import React from 'react'
import { screen } from '@testing-library/react'
import App from '@components/App/App'
import { renderWithProviders } from '@utils/testUtils'

describe('<App />', () => {
  it('renders basic components', () => {
    renderWithProviders(<App />)

    expect(screen.queryByText('Today')).toBeVisible()
  })
})

export {}
