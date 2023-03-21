import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { AppStore } from '@app/store'
import { Provider } from 'react-redux'
import { setupStore } from '@app/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  renderOptions: ExtendedRenderOptions = {},
) {
  const store = setupStore()

  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
