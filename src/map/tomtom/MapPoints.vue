<template>
    <div id="map" class="w-full h-screen"></div>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue';
  import mapboxgl from 'mapbox-gl';
  import "mapbox-gl/dist/mapbox-gl.css";
  
  export default defineComponent({
    setup() {
      onMounted(() => {
        try {
          console.log('Mapbox GL version:', mapboxgl.version);
          
          mapboxgl.accessToken = "pk.eyJ1IjoibmFxd2FsIiwiYSI6ImNscjRnNHg1ZTFtdWwyaXJ5d2pwYXh4a3UifQ.B4zc2JBs8gWuIaujj1aC2w"; // Replace with your actual Mapbox access token
          const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [101.5373634537886, 3.0128861026549743],
            zoom: 12
          });
  
          map.on('load', () => {
            console.log('Map loaded');
  
            // Add a single point
            // map.addSource('point', {
            //   type: 'geojson',
            //   data: {
            //     type: 'FeatureCollection',
            //     features: [{
            //       type: 'Feature',
            //       geometry: {
            //         type: 'Point',
            //         coordinates: [101.5373634537886, 3.0128861026549743]
            //       },
            //       properties: {
            //         title: 'Start Point'
            //       }
            //     }]
            //   }
            // });
  
            // map.addLayer({
            //   id: 'point',
            //   type: 'circle',
            //   source: 'point',
            //   paint: {
            //     'circle-radius': 10,
            //     'circle-color': '#FF6B6B'
            //   }
            // });
  
            // Add a path
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [101.5373634537886, 3.0128861026549743],
                    [101.54954196522527, 2.964137956543894],
                    // Add more coordinates to define your path
                  ]
                }
              }
            });
  
            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#888',
                'line-width': 8
              }
            });
  
            console.log('Point and path added to map');
          });
  
        } catch (error) {
          console.error('Error in map initialization:', error);
        }
      });
  
      return {};
    }
  });
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 100vh;
  }
  </style>