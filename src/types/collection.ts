export interface Collection {
  id: number;
  name: string;
  description?: string;
  filters: CollectionFilters;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionFilters {
  useOrLogic: boolean;
  filters: Filter[];
}

export interface Filter {
  id: string;
  title: string;
  values: FilterValue[];
}

export interface FilterValue {
  value: string;
  valueName: string;
}

export interface Product {
  productCode: string;
  colorCode: string;
  name: string | null;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
  brand?: string;
  category?: string;
  price?: number;
  isActive?: boolean;
  isRelocated?: boolean;
}

export interface ProductsResponse {
  status: number;
  message: string;
  data: {
    meta: {
      page: number;
      pageSize: number;
      totalProduct: number;
    };
    data: Product[];
  };
}

export interface CollectionProductsRequest {
  additionalFilters: AdditionalFilter[];
  page: number;
  pageSize: number;
}

export interface AdditionalFilter {
  id: string;
  value: string;
  comparisonType: number;
}

export interface SavedProduct {
  productCode: string;
  colorCode: string;
  name: string;
  imageUrl: string;
  addedAt: string;
}