import { DeviceCard } from '../device-card'

export default function DeviceCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <DeviceCard
        id="1"
        name="iPhone 15 Pro Max"
        brand="Apple"
        image="https://images.unsplash.com/photo-1696446702052-1fbb43c00af0?w=400&h=600&fit=crop"
        screenSize='6.7"'
        camera="48MP"
        battery="4422mAh"
        price="$1,199"
        onClick={() => console.log('Device clicked')}
      />
    </div>
  )
}
