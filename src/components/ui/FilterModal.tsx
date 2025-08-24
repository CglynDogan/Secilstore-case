"use client";

import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AdditionalFilter } from "@/types/collection";
import { useGetCollectionFiltersQuery } from "@/store/api/apiSlice";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: AdditionalFilter[]) => void;
  collectionId: number;
  currentFilters: AdditionalFilter[];
}

export function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  collectionId,
  currentFilters,
}: FilterModalProps) {
  const { data: filtersData, isLoading } =
    useGetCollectionFiltersQuery(collectionId);

  const [selectedFilters, setSelectedFilters] =
    useState<AdditionalFilter[]>(currentFilters);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");
  const [productCode, setProductCode] = useState("");
  const [allSizesStock, setAllSizesStock] = useState(false);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setSelectedFilters(currentFilters);
  }, [currentFilters]);

  const handleApply = () => {
    let filtersToApply: AdditionalFilter[] = [];

    if (productCode.trim()) {
      filtersToApply.push({
        id: "productCode",
        value: productCode.trim(),
        comparisonType: 0,
      });
    }

    filtersToApply = [...filtersToApply, ...selectedFilters];

    onApplyFilters(filtersToApply);
    onClose();
  };

  const handleClear = () => {
    setSelectedFilters([]);
    setSelectedWarehouse("");
    setMinStock("");
    setMaxStock("");
    setProductCode("");
    setAllSizesStock(false);
    setSortOption("");
    onApplyFilters([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Filtreler
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Basit 4 Sütunlu Grid - Görsele Uygun */}
          <div className="grid grid-cols-4 gap-4">
            {/* Filtreler */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filtreler
              </label>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">Yıl</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-2">
                <option value="">Lütfen filtre seçiniz</option>
                {isLoading ? (
                  <option>Yükleniyor...</option>
                ) : (
                  filtersData?.data?.slice(0, 1).map((filter) =>
                    filter.values?.slice(0, 5).map((value) => (
                      <option key={value.value} value={value.value}>
                        {value.valueName}
                      </option>
                    ))
                  )
                )}
              </select>
            </div>

            {/* Stok */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stok
              </label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
              >
                <option value="">Lütfen depo seçiniz</option>
                <option value="merkez">Merkez Depo</option>
                <option value="istanbul">İstanbul Depo</option>
              </select>
              <input
                type="number"
                placeholder="Minimum Stok"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-2"
              />
              <input
                type="number"
                placeholder="Maksimum Stok"
                value={maxStock}
                onChange={(e) => setMaxStock(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white mt-2"
              />
            </div>

            {/* Ürün Kodu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ürün Kodu
              </label>
              <input
                type="text"
                placeholder="Seçiniz"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  id="allSizesStock"
                  checked={allSizesStock}
                  onChange={(e) => setAllSizesStock(e.target.checked)}
                  className="mr-2"
                />
                <label
                  htmlFor="allSizesStock"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  Tüm Bedenlerinde Stok Olanlar
                </label>
              </div>
            </div>

            {/* Sıralamalar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className="flex items-center">
                  Sıralamalar
                  <span className="ml-1 w-4 h-4 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs">
                    ?
                  </span>
                </span>
              </label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Seçiniz</option>
                <option value="name_asc">İsim A-Z</option>
                <option value="name_desc">İsim Z-A</option>
                <option value="code_asc">Ürün Kodu A-Z</option>
                <option value="code_desc">Ürün Kodu Z-A</option>
              </select>
            </div>
          </div>

          {/* Uygulanan Kriterler - Görseldeki gibi */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Uygulanan Kriterler
            </h4>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 min-h-[120px] bg-gray-50 dark:bg-gray-700">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  Yıl: 2024
                  <button className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons - Görseldeki gibi */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleClear}
              className="bg-black hover:bg-gray-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Seçimi Temizle
            </button>
            <button
              onClick={handleApply}
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-3 px-8 rounded-lg border border-gray-300 transition-colors"
            >
              Ara
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
