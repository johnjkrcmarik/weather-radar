import "./styles.css";
import React from "react";
import MapEngine from "./MapEngine";
import "leaflet/dist/leaflet.css";
import { Box, CssBaseline } from "@mui/material";

const getWeatherData = async (setWeatherData: React.Dispatch<object>) => {
  const response = await fetch(
    "https://api.rainviewer.com/public/weather-maps.json"
  );

  if (!response.ok) {
    return {};
  }

  const json = await response.json();
  setWeatherData(await json);
};

/* CAS PLANNER */
export default function App() {
  const [weatherData, setWeatherData] = React.useState<any | null>(null);
  const [weatherStep, setWeatherStep] = React.useState(0);
  const [mapCenter, setMapCenter] = React.useState<any>({
    lat: 35.77,
    lng: -93.34
  });
  const [mouseCoords, setMouseCoords] = React.useState<any>(null);

  React.useEffect(() => {
    getWeatherData(setWeatherData);
  }, []);

  React.useEffect(() => {
    if (weatherData !== null) {
      const numSteps = weatherData.radar.past.length;
      setInterval(() => {
        setWeatherStep((prevStep: any) => (prevStep + 1) % numSteps);
      }, 500);
    }
  }, [weatherData]);

  return (
    <div className="App">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw"
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <MapEngine
            weatherData={weatherData}
            weatherStep={weatherStep}
            mapCenter={mapCenter}
            setMapCenter={setMapCenter}
            mouseCoords={mouseCoords}
            setMouseCoords={setMouseCoords}
          />
        </Box>
      </Box>
    </div>
  );
}
