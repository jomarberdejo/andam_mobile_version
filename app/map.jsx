import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { WebView } from "react-native-webview";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useLocation } from "../context/LocationContext";

const EmergencyMap = () => {
  const { location, loading, getCurrentLocation } = useLocation();

  const webViewRef = useRef();

  const goBack = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
                <style>
                  body, html, #map {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                  }
                  .legend {
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    background-color: white;
                    padding: 0 20px 20px 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    z-index: 999; 
                  }
                  .legend-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 5px;
                  }
                  .legend-item img {
                    width: 20px;
                    height: 20px;
                    margin-right: 5px;
                  }
                </style>
              </head>
              <body>
                <div id="map"></div>
                <div class="legend">
                   <h3> Legends </h3>

                   <div class="legend-item">
                    <img src="https://cdn-icons-png.flaticon.com/512/9204/9204285.png" alt="Your Location">
                    <span>My Current Location</span>
                  </div>

                  <div class="legend-item">
                    <img src="https://cdn.vectorstock.com/i/preview-1x/45/86/shipboard-assembly-station-vector-46194586.webp" alt="Evacuation/Safe Area">
                    <span>Evacuation/Safe Area</span>
                  </div>

                 
                  
                </div>
                <script>
                  function initMap() {
                    const map = L.map('map').setView([11.2905, 124.6962], 13);
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                      attribution: '© OpenStreetMap contributors'
                    }).addTo(map);

                    const markers = [
                      { title: "Guindapunan Elementary School", latitude: 11.30258, longitude: 124.70131 },
                      { title: "Jugaban, National High School", latitude: 11.2993, longitude: 124.6958 },
                      { title: "Plaza Triumpho, Carigara Leyte", latitude: 11.3010, longitude: 124.6864 },
                      { title: "Bislig Carigara Leyte Evacuation Center", latitude: 11.2931, longitude: 124.6755 }
                    ];

                    markers.forEach(marker => {
                      const markerIcon = L.icon({
                        iconUrl: 'https://cdn.vectorstock.com/i/preview-1x/45/86/shipboard-assembly-station-vector-46194586.webp',
                        iconSize: [38, 38],
                        iconAnchor: [22, 22],
                        popupAnchor: [-3, -15],
                       
                      });

                      L.marker([marker.latitude, marker.longitude], { icon: markerIcon })
                        .addTo(map)
                        .bindPopup(marker.title);
                    });

                    
                   
                    

                     

                    const currentLocation = ${JSON.stringify(location)};
                    if (currentLocation && currentLocation.display_name) {
                      const customIcon = L.icon({
                        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9204/9204285.png', 
                        iconSize: [50, 50], 
                        iconAnchor: [25, 50], 
                        popupAnchor: [0, -32] 
                    });
                    L.marker([currentLocation.lat, currentLocation.lon], {icon: customIcon})
                    .addTo(map)
                    .bindPopup('You are here at ' + currentLocation.display_name)
                    .openPopup();
                    }
                  }
                </script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
                <script>
                  window.onload = function() {
                    initMap();
                  }
                </script>
              </body>
            </html>
          `,
        }}
        style={styles.map}
      />
      <Pressable style={styles.backButton} onPress={goBack}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Pressable
        style={styles.fetchButton}
        onPress={getCurrentLocation}
        disabled={loading}
      >
        <Text style={styles.fetchButtonText}>
          {loading ? "Fetching..." : "Refetch Location"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  fetchButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 1,
  },
  fetchButtonText: {
    color: "black",
    fontSize: 16,
  },
});

export default EmergencyMap;
