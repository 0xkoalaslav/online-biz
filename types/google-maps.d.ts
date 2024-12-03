declare namespace google.maps.places {
  interface Autocomplete {
    addListener(eventName: string, handler: () => void): void;
    getPlace(): google.maps.places.PlaceResult;
  }
  
  interface PlaceResult {
    address_components?: google.maps.GeocoderAddressComponent[];
    formatted_address?: string;
  }
} 