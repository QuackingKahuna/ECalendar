import { Provider } from "react-redux"
import { PropsWithChildren } from "react"
import { render, RenderOptions } from "@testing-library/react-native"
import { AppStore, RootState, setupStore } from "./store"

type ExtendedRenderOptions = Omit<RenderOptions, 'queries'> & {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

export const renderWithProviders = (
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) => {
  const {
    preloadedState,
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      {children}
    </Provider>
  )

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions })
  }
}