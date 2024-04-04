import './App.scss'
import { SWRConfig } from 'swr'
import SearchBox from './components/SearchBox/intex'

function App() {
  const fetcher = async (url: string) => {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
      // Handle network errors
      return error
    }
};
  return (
    <SWRConfig
      value={{
        refreshInterval: 30000,
        fetcher: fetcher
      }}
    >
    <>
      <h1>Genome search</h1>
        <SearchBox />
      </>
    </SWRConfig>
  )
}

export default App
