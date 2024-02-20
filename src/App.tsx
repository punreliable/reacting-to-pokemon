import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { InfinitePokemon } from './components/InfinitePokemon'
import logoOak from './assets/oak.svg'
import './App.scss'

function App() {

  const buyMeACoffeeURL: string = 'https://buymeacoffee.com/punreliable'
  const pokeAPIURL: string = 'https://pokeapi.co'
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <a href={pokeAPIURL} target="_blank">
          <img src={logoOak} className="logo" alt="Professor Oak" />
        </a>
      </div>
      <h1>Reacting to Pokemon</h1>
      <div className="card">
        <InfinitePokemon />
      </div>
      <div className="card">
        <p className="read-the-docs">
          <a href={ buyMeACoffeeURL } target="_blank" className="coffeeLink">
            Click here to buy us a coffee if you like what we do.
          </a>
        </p>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
