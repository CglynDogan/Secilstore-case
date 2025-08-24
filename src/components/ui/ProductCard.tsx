'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product } from '@/types/collection'
import { PlusIcon, CheckIcon, TrashIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'

interface ProductCardProps {
  product: Product
  isSelected?: boolean
  isSaved?: boolean
  onSelect?: (product: Product) => void
  onRemove?: (productCode: string) => void
  showActions?: boolean
}

export function ProductCard({ 
  product, 
  isSelected = false, 
  isSaved = false,
  onSelect, 
  onRemove,
  showActions = true 
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const getBorderColor = () => {
    if (!product.isActive) return 'border-red-500'
    if (product.outOfStock === true) return 'border-yellow-500'
    if (product.isRelocated) return 'border-purple-500'
    if (product.outOfStock === false) return 'border-black'
    return 'border-gray-200 dark:border-gray-700'
  }

  const handleSelect = () => {
    if (onSelect) {
      onSelect(product)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onRemove) {
      onRemove(product.productCode)
    }
  }

  return (
    <div 
      className={clsx(
        'relative bg-white dark:bg-gray-800 rounded-lg border-2 transition-all duration-200 cursor-pointer group',
        isSelected 
          ? 'border-primary-500 shadow-lg' 
          : getBorderColor()
      )}
      onClick={handleSelect}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-lg">
        {!imageError ? (
          <Image
            src={product.imageUrl}
            alt={product.name || 'Product'}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-xs text-gray-500">Görsel yüklenemedi</p>
            </div>
          </div>
        )}

        {/* Status Indicators */}
        {product.outOfStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Stokta Yok
          </div>
        )}

        {isSaved && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <CheckIcon className="w-4 h-4" />
          </div>
        )}

        {/* Action Buttons */}
        {showActions && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
              {!isSaved ? (
                <button
                  onClick={handleSelect}
                  className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-full transition-colors"
                  title="Sabitlere Ekle"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleRemove}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                  title="Sabitlerden Çıkar"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Selection Overlay */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary-600 bg-opacity-20 flex items-center justify-center">
            <div className="bg-primary-600 text-white rounded-full p-2">
              <CheckIcon className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
          {product.name || 'Ürün Adı'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {product.productCode}
        </p>
        
        {/* Color indicator */}
        {product.colorCode && (
          <div className="flex items-center mt-2">
            <div 
              className="w-3 h-3 rounded-full border border-gray-300 mr-2"
              style={{ backgroundColor: `#${product.colorCode}` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.colorCode}
            </span>
          </div>
        )}
      </div>

      {/* Added Indicator */}
      {isSaved && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-center py-1">
          <span className="text-xs font-medium">Eklendi</span>
        </div>
      )}
    </div>
  )
}