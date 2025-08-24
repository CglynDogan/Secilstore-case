'use client'

import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { SavedProduct } from '@/types/collection'
import { TrashIcon } from '@heroicons/react/24/outline'

interface DraggableColumnItemProps {
  product: SavedProduct
  index: number
  onMove: (dragIndex: number, hoverIndex: number) => void
  onRemove: (productCode: string) => void
}

interface DragItem {
  index: number
  type: string
}

export function DraggableColumnItem({ 
  product, 
  index, 
  onMove, 
  onRemove 
}: DraggableColumnItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: string | symbol | null }>({
    accept: 'column-product',
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
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      const threshold = 0.3
      if (
        dragIndex < hoverIndex && 
        (hoverClientY < hoverMiddleY * threshold || hoverClientX < hoverMiddleX * threshold)
      ) {
        return
      }

      if (
        dragIndex > hoverIndex && 
        (hoverClientY > hoverMiddleY * (2 - threshold) || hoverClientX > hoverMiddleX * (2 - threshold))
      ) {
        return
      }

      onMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: 'column-product',
    item: () => {
      return { index, type: 'column-product' }
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
      style={{ opacity }} 
      data-handler-id={handlerId}
      className={`relative group cursor-move transition-all duration-200 ${
        isDragging ? 'scale-95 shadow-lg' : ''
      }`}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full aspect-square object-cover rounded-lg"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
        }}
      />
      
      {/* Drag Handle Indicator */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-black bg-opacity-50 text-white p-1 rounded">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-lg flex items-center justify-center">
        <button
          onClick={() => onRemove(product.productCode)}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full"
        >
          <TrashIcon className="h-3 w-3" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b-lg">
        <p className="truncate">{product.name}</p>
      </div>
    </div>
  )
}