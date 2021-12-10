import {
  MapContainer,
  MapConsumer,
  TileLayer,
  useMapEvents
} from "react-leaflet";
import React from "react";
import { LeafletEvent, LeafletMouseEvent, Map } from "leaflet";
import { Box } from "@mui/material";
import VectorTileLayer from "react-leaflet-vector-tile-layer";

interface Props {
  mapCenter: any;
  setMapCenter: React.Dispatch<any>;
  weatherData: any;
  weatherStep: number;
  mouseCoords: any;
  setMouseCoords: React.Dispatch<any>;
}

interface MapEventsProps {
  setMouseCoords: React.Dispatch<any>;
  setMapCenter: React.Dispatch<any>;
}

const MapEvents = (props: MapEventsProps): null => {
  const map = useMapEvents({
    mousemove: (event: LeafletMouseEvent) => {
      props.setMouseCoords(event.latlng);
    },
    drag: (event: LeafletEvent) => {
      props.setMapCenter(event.target.getCenter());
    }
  });
  return null;
};

const MapEngine = (props: Props): JSX.Element => {
  return (
    <MapContainer
      animate={false}
      center={{ lat: 35.77, lng: -93.34 }}
      style={{ height: "100%", width: "100%" }}
      zoom={5}
    >
      <MapEvents
        setMouseCoords={props.setMouseCoords}
        setMapCenter={props.setMapCenter}
      />
      <TileLayer
        attribution="Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
        className="basemap"
        maxNativeZoom={19}
        maxZoom={19}
        subdomains={["clarity"]}
        url="https://{s}.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      {props.weatherData !== null && (
        <TileLayer
          key={`weather-data-${
            props.weatherData.radar.past[props.weatherStep].time
          }`}
          url={`${props.weatherData.host}${
            props.weatherData.radar.past[props.weatherStep].path
          }/512/{z}/{x}/{y}/6/1_0.png`}
          //zIndex={10}
        />
      )}
    </MapContainer>
  );
};

export default React.memo(MapEngine);
