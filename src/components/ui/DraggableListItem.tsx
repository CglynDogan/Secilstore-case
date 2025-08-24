"use client";

import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { SavedProduct } from "@/types/collection";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DraggableListItemProps {
  product: SavedProduct;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (productCode: string) => void;
}

interface DragItem {
  index: number;
  type: string;
}

export function DraggableListItem({
  product,
  index,
  onMove,
  onRemove,
}: DraggableListItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: string | symbol | null }
  >({
    accept: "list-product",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: "list-product",
    item: () => {
      return { index, type: "list-product" };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-200 cursor-move group ${
        isDragging ? "scale-95 shadow-lg" : ""
      }`}
    >
      {/* Drag Handle */}
      <div className="mr-3 opacity-50 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </div>

      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-12 h-12 object-cover rounded-lg mr-3"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAzNkMzMC42Mjc0IDM2IDM2IDMwLjYyNzQgMzYgMjRDMzYgMTcuMzcyNiAzMC42Mjc0IDEyIDI0IDEyQzE3LjM3MjYgMTIgMTIgMTcuMzcyNiAxMiAyNEMxMiAzMC42Mjc0IDE3LjM3MjYgMzYgMjQgMzZaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K";
        }}
      />
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          {product.name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {product.productCode}
        </p>
      </div>
      <button
        onClick={() => onRemove(product.productCode)}
        className="p-1 text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
