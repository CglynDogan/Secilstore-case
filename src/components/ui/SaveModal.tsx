'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { SavedProduct } from '@/types/collection'

interface SaveModalProps {
  isOpen: boolean
  onClose: () => void
  savedProducts: SavedProduct[]
  collectionId: number
}

export function SaveModal({ 
  isOpen, 
  onClose, 
  savedProducts,
  collectionId 
}: SaveModalProps) {
  
  const generateRequestPayload = () => {
    return {
      collectionId: collectionId,
      savedProducts: savedProducts.map((product, index) => ({
        productCode: product.productCode,
        colorCode: product.colorCode,
        name: product.name,
        imageUrl: product.imageUrl,
        order: index + 1,
        addedAt: product.addedAt
      })),
      timestamp: new Date().toISOString(),
      action: 'save_collection_products',
      totalCount: savedProducts.length
    }
  }

  const requestPayload = generateRequestPayload()

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-6 w-6 text-green-600 mr-2" />
                    <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                      Kaydetme İsteği
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Request Summary */}
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                      İstek Özeti
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-green-700 dark:text-green-300">Koleksiyon ID:</span>
                        <span className="ml-2 font-mono">{collectionId}</span>
                      </div>
                      <div>
                        <span className="text-green-700 dark:text-green-300">Toplam Ürün:</span>
                        <span className="ml-2 font-mono">{savedProducts.length}</span>
                      </div>
                      <div>
                        <span className="text-green-700 dark:text-green-300">İşlem:</span>
                        <span className="ml-2 font-mono">save_collection_products</span>
                      </div>
                      <div>
                        <span className="text-green-700 dark:text-green-300">Zaman:</span>
                        <span className="ml-2 font-mono text-xs">{new Date().toLocaleString('tr-TR')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Request Payload */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      API Request Payload:
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                        {JSON.stringify(requestPayload, null, 2)}
                      </pre>
                    </div>
                  </div>

                  {/* Endpoint Information */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                      API Endpoint Bilgisi
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-blue-700 dark:text-blue-300">Method:</span>
                        <span className="ml-2 font-mono bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">POST</span>
                      </div>
                      <div>
                        <span className="text-blue-700 dark:text-blue-300">URL:</span>
                        <span className="ml-2 font-mono text-xs break-all">
                          https://maestro-api-dev.secil.biz/Collection/{collectionId}/SaveProducts
                        </span>
                      </div>
                      <div>
                        <span className="text-blue-700 dark:text-blue-300">Headers:</span>
                        <div className="ml-2 mt-1 font-mono text-xs bg-blue-100 dark:bg-blue-800 p-2 rounded">
                          Authorization: Bearer [ACCESS_TOKEN]<br/>
                          Content-Type: application/json
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product List */}
                  {savedProducts.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Kaydedilecek Ürünler ({savedProducts.length} adet):
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-48 overflow-y-auto">
                        <div className="space-y-2">
                          {savedProducts.map((product, index) => (
                            <div key={product.productCode} className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <span className="w-6 h-6 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                                  {index + 1}
                                </span>
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                                  <span className="ml-2 text-gray-500 dark:text-gray-400 font-mono text-xs">
                                    {product.productCode}
                                  </span>
                                </div>
                              </div>
                              <span className="text-gray-400 dark:text-gray-500 text-xs">
                                Sıra: {index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onClose}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Kapat
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Anladım
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}