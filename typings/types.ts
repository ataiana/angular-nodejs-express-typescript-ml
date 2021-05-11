export interface Result {
  id: string;
  site_id: string;
  title: string;
  seller: {
    id: number;
    power_seller_status: string;
    car_dealer: boolean;
    real_estate_agency: boolean;
    tags: string[];
  };
  price: number;
  currency_id: string;
  available_quantity: boolean;
  sold_quantity: boolean;
  buying_mode: string;
  listing_type_id: string;
  stop_time: string;
  condition: string;
  permalink: string;
  thumbnail: string;
  accepts_mercadopago: boolean;
  installments: {
    quantity: boolean;
    amount: boolean;
    rate: number;
    currency_id: string;
  };
  address: {
    state_id: string;
    state_name: string;
    city_id: string;
    city_name: string;
  };
  shipping: {
    free_shipping: boolean;
    mode: string;
    tags: string[];
    logistic_type: string;
    store_pick_up: boolean;
  };
  seller_address: {
    id: string;
    comment: string;
    address_line: string;
    zip_code: string;
    country: {
      id: string;
      name: string;
    };
    state: {
      id: string;
      name: string;
    };
    city: {
      id: string;
      name: string;
    };
    latitude: string;
    longitude: string;
  };
  attributes: [
    {
      name: string;
      value_id: number;
      value_name: string;
      value_struct: null;
      attribute_group_id: string;
      attribute_group_name: string;
      source: number;
      id: string;
    },
    {
      attribute_group_name: string;
      source: number;
      id: string;
      name: string;
      value_id: number;
      value_name: string;
      value_struct: null;
      attribute_group_id: string;
    }
  ];
  original_price: null;
  category_id: string;
  official_store_id: number;
  catalog_product_id: string;
  tags: string[];
  catalog_listing: boolean;
}

export interface Items {
  site_id: string;
  query: string;
  paging: {
    total: number;
    offset: number;
    limit: number;
    primary_results: number;
  };
  categoryId: string;
  category_path: Path[];
  results: Result[];
}
export interface Category {
    path_from_root: Path[];
}

export interface Path {
  id: string;
  name: string;
}

export interface ItemResponse {
  pictures: Picture[];
  description: Record<string, unknown>;
  category_path: Path[];
  category_id: string;
  sold_quantity: number;
  condition: string;
  title: string;
  price: number;
  plain_text: string;
}

export interface Picture {
  url: string;
}
