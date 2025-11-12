import { SearchBar } from '../search-bar'

export default function SearchBarExample() {
  return (
    <div className="p-8">
      <SearchBar onSearch={(query) => console.log('Search:', query)} />
    </div>
  )
}
