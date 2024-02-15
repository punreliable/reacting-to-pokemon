import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import InfinitePokemon from './components/InfinitePokemon'
import logoOak from './assets/oak.svg'
import './App.scss'

function App() {

  const queryClient = new QueryClient()
  const buyMeACoffeeURL: string = 'https://buymeacoffee.com/punreliable'

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <a href="https://pokeapi.co" target="_blank">
          <img src={logoOak} className="logo" alt="Professor Oak logo" />
        </a>
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>Reacting to Pokemon</h1>
      <div className="card">
        <InfinitePokemon />
      </div>
      <p className="read-the-docs">
        <a href={ buyMeACoffeeURL } target="_blank" className="coffeeLink">Click here to buy us a coffee if you like what we do.</a>
      </p>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
