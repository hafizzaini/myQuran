export interface ListingGet<entries> {
  success: boolean;
  reason: string;
  entries: entries[];
  limit: number;
  offset: number;
  total: number;
  search: string;
}

export interface DetailsGet<item> {
  success: boolean;
  reason: string;
  state: item;
}

export interface ResponsePost {
  success: boolean;
  reason: string;
  state: {
    id: string;
  };
}

export interface GetListParameters {
  search?: string;
  offset?: number;
  limit?: number;
}

export interface MappifyItem {
  buildingName: string;
  flatNumberPrefix: string;
  flatNumber: string;
  flatNumberSuffix: string;
  levelNumber: string;
  numberFirst: number;
  numberFirstPrefix: string;
  numberFirstSuffix: string;
  numberLast: string;
  numberLastPrefix: string;
  numberLastSuffix: string;
  streetName: string;
  streetType: string;
  streetSuffixCode: string;
  suburb: string;
  state: string;
  postCode: string;
  location: {
    lat: number;
    lon: number;
  };
  streetAddress: string;
}

export interface MappifyResponse {
  type: string;
  result: MappifyItem[];
  confidence: number;
}
