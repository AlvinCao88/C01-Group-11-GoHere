import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Keyboard } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import useSupercluster from "use-supercluster";
import { decode } from "@mapbox/polyline";
import { getGlobalWashroom } from "./GlobalWashroomContext";
import * as Location from "expo-location";

export default function Map({ center, expandFn, location }) {
  const { currentWashroom } = getGlobalWashroom();
  const [loading, setLoading] = useState(true);
  // const mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const bounds = useRef(null);
  const [zoom, setZoom] = useState(12);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/user/query/washrooms`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          setMarkers(data.response);
          setLoading(false);
        } else {
          throw new Error(`Error fetching washrooms: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch markers data and setMarkers

    // Calculate bounds dynamically
    const minX = Math.min(...markers.map((marker) => marker.longitude));
    const minY = Math.min(...markers.map((marker) => marker.latitude));
    const maxX = Math.max(...markers.map((marker) => marker.longitude));
    const maxY = Math.max(...markers.map((marker) => marker.latitude));

    // Update bounds and zoom level
    bounds.current = [minX, minY, maxX, maxY];
    setZoom(Math.round(Math.log2(360 / (maxX - minX)) + 1));
  }, [markers]);

  const onRegionChangeComplete = (region) => {
    // Update bounds and zoom level
    bounds.current = [
      region.longitude - region.longitudeDelta / 2,
      region.latitude - region.latitudeDelta / 2,
      region.longitude + region.longitudeDelta / 2,
      region.latitude + region.latitudeDelta / 2,
    ];
    setZoom(Math.round(Math.log2(360 / region.longitudeDelta) + 1));
  };

  const { clusters } = useSupercluster({
    points: markers.map((marker) => ({
      type: "Feature",
      properties: {
        cluster: false,
        id: marker._id,
        title: marker.name,
        description: marker.fullAddress,
      },
      geometry: {
        type: "Point",
        coordinates: [marker.longitude, marker.latitude],
      },
    })),
    //need to not harcode bounds
    // bounds: [-180, -85, 180, 85],
    bounds: bounds.current,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const getDirections = async (current, destinationLoc) => {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${current}&destination=${destinationLoc}&key=${process.env.EXPO_PUBLIC_GOOGLE_API}`
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (currentWashroom != null) {
          getDirections(
            `${location.latitude}, ${location.longitude}`,
            `${currentWashroom.latitude}, ${currentWashroom.longitude}`
          )
            .then((coords) => setCoords(coords))
            .catch((err) => console.log("Something went wrong", err));
        } else if (currentWashroom == null) {
          setCoords([]);
        }
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    })();
  }, [currentWashroom]);

  return (
    <MapView
      style={styles.map}
      showsUserLocation={true}
      showsMyLocationButton={true}
      region={{
        latitude: center.latitude, //change this to center.latittude
        longitude: center.longitude, //change this to center.longitutde
        latitudeDelta: center.latitudeDelta,
        longitudeDelta: center.longitudeDelta,
      }}
      onRegionChangeComplete={onRegionChangeComplete}
      onPress={Keyboard.dismiss}
      mapPadding={{
        top: 40,
        bottom: 10,
      }}
    >
      {/* Render clustered markers */}
      {loading
        ? null
        : clusters.map((cluster) => {
            // Check if the cluster is null or undefined
            // if (!cluster) return null;

            // Check if the cluster represents a single marker
            //   console.log(cluster.properties.point_count)
            if (cluster.properties.point_count === undefined) {
              return (
                <Marker
                  key={cluster.properties.id}
                  coordinate={{
                    latitude: cluster.geometry.coordinates[1],
                    longitude: cluster.geometry.coordinates[0],
                  }}
                  onPress={() => expandFn(cluster.properties.id)}
                  title={cluster.properties.title}
                  description={cluster.properties.description}
                />
              );
            } else {
              // Render clustered markers
              return (
                <Marker
                  key={cluster.id}
                  title={`${cluster.properties.point_count} markers`}
                  coordinate={{
                    latitude: cluster.geometry.coordinates[1],
                    longitude: cluster.geometry.coordinates[0],
                  }}
                >
                  {/* Custom view for clusters */}
                  <View style={[styles.cluster, { width: 30, height: 30 }]}>
                    <Text style={styles.clusterCount}>
                      {cluster.properties.point_count}
                    </Text>
                  </View>
                </Marker>
              );
            }
          })}
      {/* <Marker */}
      {/*     key={"You are here"} */}
      {/*     coordinate={{ */}
      {/*     latitude: center.latitude, */}
      {/*     longitude: center.longitude */}
      {/*     }} */}
      {/*     title={"You are here!"} */}
      {/*     // description={cluster.properties.description} */}
      {/*     // image={require('../AwesomeProject/assets/favicon.png')} */}
      {/*     image={require('../../assets/here.png')} */}
      {/**/}
      {/* /> */}
      {coords.length > 0 && (
        <Polyline coordinates={coords} strokeWidth={4} strokeColor="#DA5C59" />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 100,
  },
  cluster: {
    borderRadius: 100,
    backgroundColor: "#334155",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clusterCount: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
