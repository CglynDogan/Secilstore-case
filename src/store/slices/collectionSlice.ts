import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Collection, Product, SavedProduct, AdditionalFilter } from '@/types/collection'

interface CollectionState {
  collections: Collection[]
  currentCollection: Collection | null
  products: Product[]
  savedProducts: SavedProduct[]
  filters: AdditionalFilter[]
  currentPage: number
  totalProducts: number
  pageSize: number
  isLoading: boolean
  error: string | null
  selectedYear: number
}

const initialState: CollectionState = {
  collections: [],
  currentCollection: null,
  products: [],
  savedProducts: [],
  filters: [],
  currentPage: 1,
  totalProducts: 0,
  pageSize: 36,
  isLoading: false,
  error: null,
  selectedYear: 2024,
}

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload
    },
    setCurrentCollection: (state, action: PayloadAction<Collection | null>) => {
      state.currentCollection = action.payload
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
    },
    setProductsPagination: (
      state,
      action: PayloadAction<{
        products: Product[]
        currentPage: number
        totalProducts: number
      }>
    ) => {
      const { products, currentPage, totalProducts } = action.payload
      state.products = products
      state.currentPage = currentPage
      state.totalProducts = totalProducts
    },
    addSavedProduct: (state, action: PayloadAction<SavedProduct>) => {
      const exists = state.savedProducts.find(
        (p) => p.productCode === action.payload.productCode
      )
      if (!exists) {
        state.savedProducts.push(action.payload)
      }
    },
    removeSavedProduct: (state, action: PayloadAction<string>) => {
      state.savedProducts = state.savedProducts.filter(
        (p) => p.productCode !== action.payload
      )
    },
    clearSavedProducts: (state) => {
      state.savedProducts = []
    },
    reorderSavedProducts: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload
      const [removed] = state.savedProducts.splice(fromIndex, 1)
      state.savedProducts.splice(toIndex, 0, removed)
    },
    setFilters: (state, action: PayloadAction<AdditionalFilter[]>) => {
      state.filters = action.payload
    },
    addFilter: (state, action: PayloadAction<AdditionalFilter>) => {
      const existingIndex = state.filters.findIndex(
        (f) => f.id === action.payload.id
      )
      if (existingIndex >= 0) {
        state.filters[existingIndex] = action.payload
      } else {
        state.filters.push(action.payload)
      }
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.filters = state.filters.filter((f) => f.id !== action.payload)
    },
    clearFilters: (state) => {
      state.filters = []
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  setLoading,
  setError,
  setCollections,
  setCurrentCollection,
  setProducts,
  setProductsPagination,
  addSavedProduct,
  removeSavedProduct,
  clearSavedProducts,
  reorderSavedProducts,
  setFilters,
  addFilter,
  removeFilter,
  clearFilters,
  setCurrentPage,
  setSelectedYear,
  clearError,
} = collectionSlice.actions

export default collectionSlice.reducer