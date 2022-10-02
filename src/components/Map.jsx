import React, { useRef } from "react";
import {
  GoogleMap,
  useLoadScript,
} from "@react-google-maps/api";
import "../styles/global.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];

const center = {
  lat:-37.840935,
  lng:144.946457,
}

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAiDeYXEYMQLTJwYVTMstaVE9BOdP9QhNU",
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(20);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="input-container">
      <Search panTo={panTo} />
 

      <GoogleMap
        zoom={15}
        center={center}
        mapContainerClassName="map-container"
        onLoad={onMapLoad}
      >
      </GoogleMap>
    </div>
  );
}


function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -37.840935, lng: () => 144.946457 },
      radius: 200 * 1000,
    },
  });



  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const result = await getGeocode({ address });
            const { lat, lng } = await getLatLng(result[0]);
            panTo({ lat, lng }); 
            console.log(lat,lng)
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

