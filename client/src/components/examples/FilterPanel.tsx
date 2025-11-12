import { FilterPanel } from '../filter-panel'

export default function FilterPanelExample() {
  return (
    <div className="p-8 max-w-sm">
      <FilterPanel onFilterChange={(filters) => console.log('Filters:', filters)} />
    </div>
  )
}
