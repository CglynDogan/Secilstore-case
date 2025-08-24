"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterModal } from "@/components/ui/FilterModal";
import { DraggableProductCard } from "@/components/ui/DraggableProductCard";
import { DraggableListItem } from "@/components/ui/DraggableListItem";
import { DraggableColumnItem } from "@/components/ui/DraggableColumnItem";
import { SaveModal } from "@/components/ui/SaveModal";
import { useLazyGetCollectionProductsQuery } from "@/store/api/apiSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addSavedProduct,
  removeSavedProduct,
  setCurrentPage,
  setSelectedYear,
  clearSavedProducts,
  reorderSavedProducts,
} from "@/store/slices/collectionSlice";
import { Product, AdditionalFilter, SavedProduct } from "@/types/collection";
import {
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  InformationCircleIcon,
  Square2StackIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import toast from "react-hot-toast";

function CollectionDetailPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const collectionId = parseInt(searchParams.get('id') || '84')
  const dispatch = useAppDispatch();

  const { savedProducts, currentPage, selectedYear } = useAppSelector(
    (state) => state.collection
  );

  const [getProducts, { data: productsData, isLoading, error }] =
    useLazyGetCollectionProductsQuery();
  const [filters, setFilters] = useState<AdditionalFilter[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "remove" | "clear" | "cancel" | "error"
  >("remove");
  const [productToRemove, setProductToRemove] = useState<string | null>(null);

  const pageSize = 6;
  const totalPages = Math.ceil(
    (productsData?.data?.meta?.totalProduct || 0) / pageSize
  );


  const [savedProductsView, setSavedProductsView] = useState<
    "grid" | "list" | "columns"
  >("grid");
  const [savedProductsPage, setSavedProductsPage] = useState(1);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  useEffect(() => {
    if (collectionId) {
      getProducts({
        collectionId,
        page: currentPage,
        pageSize,
        additionalFilters: filters,
      });
    }
  }, [collectionId, currentPage, filters, getProducts]);

  const handleProductSelect = (product: Product) => {
    const savedProduct: SavedProduct = {
      productCode: product.productCode,
      colorCode: product.colorCode,
      name: product.name || "Ürün",
      imageUrl: product.imageUrl,
      addedAt: new Date().toISOString(),
    };

    dispatch(addSavedProduct(savedProduct));
    toast.success("Ürün sabitlere eklendi");
  };

  const handleRemoveProduct = (productCode: string) => {
    setProductToRemove(productCode);
    setConfirmAction("remove");
    setIsConfirmModalOpen(true);
  };

  const confirmRemoveProduct = () => {
    try {
      if (productToRemove) {
        dispatch(removeSavedProduct(productToRemove));
        toast.success("Ürün sabitlerden çıkarıldı");
      }
      setIsConfirmModalOpen(false);
      setProductToRemove(null);
    } catch (error) {
      setConfirmAction("error");
    }
  };

  const handleClearAllSaved = () => {
    setConfirmAction("clear");
    setIsConfirmModalOpen(true);
  };

  const confirmClearAll = () => {
    try {
      dispatch(clearSavedProducts());
      toast.success("Tüm sabitler temizlendi");
      setIsConfirmModalOpen(false);
    } catch (error) {
      setConfirmAction("error");
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    

    setTimeout(() => {
      const productsGrid = document.getElementById('products-grid');
      if (productsGrid) {
        productsGrid.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleYearChange = (year: number) => {
    dispatch(setSelectedYear(year));
  };

  const isProductSaved = (productCode: string) => {
    return savedProducts.some((p) => p.productCode === productCode);
  };

  const handleMoveProduct = (dragIndex: number, hoverIndex: number) => {
    dispatch(
      reorderSavedProducts({ fromIndex: dragIndex, toIndex: hoverIndex })
    );
  };

  const getItemsPerPage = () => {
    switch (savedProductsView) {
      case "grid":
        return 4;
      case "columns":
        return 12;
      case "list":
        return 6;
      default:
        return 4;
    }
  };

  const itemsPerPage = getItemsPerPage();
  const totalSavedPages = Math.ceil(savedProducts.length / itemsPerPage);
  const startIndex = (savedProductsPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSavedProducts = savedProducts.slice(startIndex, endIndex);

  const handleSavedProductsPageChange = (page: number) => {
    setSavedProductsPage(page);
  };

  const handleViewChange = (view: "grid" | "list" | "columns") => {
    setSavedProductsView(view);
    setSavedProductsPage(1);
  };

  const handleSave = () => {
    setIsSaveModalOpen(true);
  };

  const handleCancel = () => {
    setConfirmAction("cancel");
    setIsConfirmModalOpen(true);
  };

  const confirmCancel = () => {
    dispatch(clearSavedProducts());
    toast("Değişiklikler iptal edildi");
    setIsConfirmModalOpen(false);
    router.push("/collections");
  };

  const handleApplyFilters = (newFilters: AdditionalFilter[]) => {
    setFilters(newFilters);
    dispatch(setCurrentPage(1));
    setIsFilterModalOpen(false);
  };


  return (
    <DashboardLayout
      title="Sabitleri Düzenle"
      subtitle={`Koleksiyon - ${collectionId} / ${
        productsData?.data?.meta?.totalProduct || 0
      } Ürün`}
    >
      <div className="space-y-6">
        {/* Year Selector and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleYearChange(selectedYear - 1)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
              Yıl: {selectedYear}
            </span>
            <button
              onClick={() => handleYearChange(selectedYear + 1)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="btn-primary flex items-center"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filtreler
          </button>
        </div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Collection Products */}
          <div className="lg:col-span-2">
            <div className="card p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-4">
                Koleksiyon Ürünleri
              </h3>

              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-600 dark:text-red-400">
                    Ürünler yüklenirken hata oluştu
                  </div>
                </div>
              ) : !productsData?.data?.data?.length ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 dark:text-gray-400">
                    Bu koleksiyonda ürün bulunamadı
                  </div>
                </div>
              ) : (
                <>
                  <div id="products-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {productsData.data.data.map((product) => (
                      <ProductCard
                        key={product.productCode}
                        product={product}
                        isSaved={isProductSaved(product.productCode)}
                        onSelect={handleProductSelect}
                        onRemove={handleRemoveProduct}
                      />
                    ))}
                  </div>

    
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-6">
                      <button
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>

                      {[...Array(Math.min(totalPages, 9))].map((_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium ${
                              currentPage === page
                                ? "bg-primary-600 text-white"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* View Control Buttons */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">
                  Sabitler
                </h3>
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <div className="relative group">
                    <div
                      className="p-2 rounded-md transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-help"
                      title="Bilgi"
                    >
                      <InformationCircleIcon className="h-4 w-4" />
                    </div>
                    
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg text-gray-900 dark:text-gray-100 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-48">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-red-500 rounded"></div>
                          <span>Kırmızı çerçeve: Pasif</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-yellow-500 rounded"></div>
                          <span>Sarı çerçeve: Tükendi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-purple-500 rounded"></div>
                          <span>Mor çerçeve: Yer değiştirdi</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 border-2 border-black dark:border-gray-900 rounded"></div>
                          <span>Siyah çerçeve: Aktif</span>
                        </div>
                      </div>
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-white dark:border-l-gray-800"></div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewChange("list")}
                    className={`p-2 rounded-md transition-colors ${
                      savedProductsView === "list"
                        ? "bg-primary-600 text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                    title="Liste Görünümü (6 ürün/sayfa)"
                  >
                    <Square2StackIcon className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleViewChange("columns")}
                    className={`p-2 rounded-md transition-colors ${
                      savedProductsView === "columns"
                        ? "bg-primary-600 text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                    title="Üç Sütun Görünümü (12 ürün/sayfa)"
                  >
                    <ViewColumnsIcon className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleViewChange("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      savedProductsView === "grid"
                        ? "bg-primary-600 text-white"
                        : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                    title="Grid Görünümü (4 ürün/sayfa)"
                  >
                    <Squares2X2Icon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {savedProducts.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={handleClearAllSaved}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Tümünü Temizle
                  </button>
                </div>
              )}
            </div>

            {/* Saved Products */}
            <div className="card p-4 sm:p-6">

              {savedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Henüz sabit ürün eklenmedi
                  </p>
                </div>
              ) : (
                <>
                  {/* Grid View */}
                  {savedProductsView === "grid" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        {currentSavedProducts.map((product, index) => (
                          <DraggableProductCard
                            key={product.productCode}
                            product={product}
                            index={startIndex + index}
                            onMove={handleMoveProduct}
                            onRemove={handleRemoveProduct}
                          />
                        ))}
                      </div>

                      {/* Grid Pagination */}
                      {totalSavedPages > 1 && (
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          <button
                            onClick={() =>
                              handleSavedProductsPageChange(
                                Math.max(1, savedProductsPage - 1)
                              )
                            }
                            disabled={savedProductsPage === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronLeftIcon className="h-5 w-5" />
                          </button>

                          {[...Array(totalSavedPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                              <button
                                key={page}
                                onClick={() =>
                                  handleSavedProductsPageChange(page)
                                }
                                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                                  savedProductsPage === page
                                    ? "bg-primary-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}

                          <button
                            onClick={() =>
                              handleSavedProductsPageChange(
                                Math.min(totalSavedPages, savedProductsPage + 1)
                              )
                            }
                            disabled={savedProductsPage === totalSavedPages}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronRightIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* List View */}
                  {savedProductsView === "list" && (
                    <>
                      <div className="space-y-3">
                        {currentSavedProducts.map((product, index) => (
                          <DraggableListItem
                            key={product.productCode}
                            product={product}
                            index={startIndex + index}
                            onMove={handleMoveProduct}
                            onRemove={handleRemoveProduct}
                          />
                        ))}
                      </div>

                      {/* List Pagination */}
                      {totalSavedPages > 1 && (
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          <button
                            onClick={() =>
                              handleSavedProductsPageChange(
                                Math.max(1, savedProductsPage - 1)
                              )
                            }
                            disabled={savedProductsPage === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronLeftIcon className="h-5 w-5" />
                          </button>

                          {[...Array(totalSavedPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                              <button
                                key={page}
                                onClick={() =>
                                  handleSavedProductsPageChange(page)
                                }
                                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                                  savedProductsPage === page
                                    ? "bg-primary-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}

                          <button
                            onClick={() =>
                              handleSavedProductsPageChange(
                                Math.min(totalSavedPages, savedProductsPage + 1)
                              )
                            }
                            disabled={savedProductsPage === totalSavedPages}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronRightIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Three Columns View */}
                  {savedProductsView === "columns" && (
                    <>
                      <div className="grid grid-cols-3 gap-2">
                        {currentSavedProducts.map((product, index) => (
                          <DraggableColumnItem
                            key={product.productCode}
                            product={product}
                            index={startIndex + index}
                            onMove={handleMoveProduct}
                            onRemove={handleRemoveProduct}
                          />
                        ))}
                      </div>

                      {/* Columns Pagination */}
                      {totalSavedPages > 1 && (
                        <div className="flex items-center justify-center space-x-2 mt-4">
                          <button
                            onClick={() =>
                              handleSavedProductsPageChange(
                                Math.max(1, savedProductsPage - 1)
                              )
                            }
                            disabled={savedProductsPage === 1}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronLeftIcon className="h-5 w-5" />
                          </button>

                          {[...Array(totalSavedPages)].map((_, index) => {
                            const page = index + 1;
                            return (
                              <button
                                key={page}
                                onClick={() =>
                                  handleSavedProductsPageChange(page)
                                }
                                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                                  savedProductsPage === page
                                    ? "bg-primary-600 text-white"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                }`}
                              >
                                {page}
                              </button>
                            );
                          })}

                          <button
                            onClick={() =>
                              handleSavedProductsPageChange(
                                Math.min(totalSavedPages, savedProductsPage + 1)
                              )
                            }
                            disabled={savedProductsPage === totalSavedPages}
                            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                          >
                            <ChevronRightIcon className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  onClick={handleSave}
                  disabled={savedProducts.length === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Kaydet ({savedProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
        collectionId={collectionId}
        currentFilters={filters}
      />

      {/* Save Modal */}
      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        savedProducts={savedProducts}
        collectionId={collectionId}
      />

      {/* Confirmation Modal */}
      <Transition appear show={isConfirmModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsConfirmModalOpen(false)}
        >
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full">
                    <XMarkIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>

                  <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">
                    Uyarı!
                  </Dialog.Title>

                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                    {confirmAction === "remove"
                      ? "Sabitlerden Çıkarılacaktır Emin Misiniz?"
                      : confirmAction === "clear"
                      ? "Tüm Ürünler Sabitlerden Çıkarılacaktır Emin Misiniz?"
                      : confirmAction === "cancel"
                      ? "Yapılan Bütün Değişikliklerden Vazgeçilecektir Emin Misiniz?"
                      : "Sabitler İçerisinden Çıkarılırken Hata Oluştu."}
                  </p>

                  <div className="flex space-x-3">
                    {confirmAction === "error" ? (
                      <button
                        onClick={() => setIsConfirmModalOpen(false)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        TAMAM
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setIsConfirmModalOpen(false)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Vazgeç
                        </button>
                        <button
                          onClick={
                            confirmAction === "remove"
                              ? confirmRemoveProduct
                              : confirmAction === "clear"
                              ? confirmClearAll
                              : confirmCancel
                          }
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                          Onayla
                        </button>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </DashboardLayout>
  );
}

export default function CollectionDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollectionDetailPageContent />
    </Suspense>
  );
}
