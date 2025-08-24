'use client'

import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ProductCard } from './ProductCard'
import { SavedProduct } from '@/types/collection'

interface DraggableProductCardProps {
  product: SavedProduct
  index: number
  onMove: (dragIndex: number, hoverIndex: number) => void
  onRemove: (productCode: string) => void
}

interface DragItem {
  index: number
  type: string
}

export function DraggableProductCard({ 
  product, 
  index, 
  onMove, 
  onRemove 
}: DraggableProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: 'product',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onMove(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: 'product',
    item: () => {
      return { index, type: 'product' }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))

  return (
    <div 
      ref={ref} 
      style={{ 
        opacity,
        transform: isDragging ? 'scale(0.2)' : 'scale(1)',
        transition: 'all 0.2s ease',
        zIndex: isDragging ? 1000 : 'auto'
      }} 
      data-handler-id={handlerId}
      className={`${isDragging ? 'shadow-2xl' : ''}`}
    >
      <ProductCard
        product={{
          productCode: product.productCode,
          colorCode: product.colorCode,
          name: product.name,
          imageUrl: product.imageUrl,
          outOfStock: false,
          isSaleB2B: true
        }}
        isSaved={true}
        onRemove={onRemove}
        showActions={true}
      />
      
      {/* Drag Handle Indicator */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-black bg-opacity-50 text-white p-1 rounded">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
        </div>
      </div>
    </div>
  )
}