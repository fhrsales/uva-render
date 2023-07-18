<script>
    import { onMount, onDestroy } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import 'mapbox-gl/dist/mapbox-gl.css';
    import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
    import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
    import { buffer } from '@turf/turf';
  
    export let accessToken = 'pk.eyJ1IjoibHVjYXN0aGF5bmFuLWVzdGFkYW8iLCJhIjoiY2xnM3N1amQzMGlqeDNrbWdla3doY2o2dCJ9.OXh3OY3_HFqAiF-zzZ6SDQ'; // Chave de acesso do Mapbox
    export let center = [-46.62889, -23.55594]; // Centro inicial do mapa
    export let zoom = 10.8; // Nível de zoom inicial
  
    let map;
    let mapContainer;
    let directions;
    let watchId;
    let obstacles; // Array para armazenar os obstáculos
    let clearances; // Variável para armazenar o objeto JSON dos obstáculos
  
    // Função para carregar os obstáculos a partir do arquivo JSON
    async function loadObstacles() {
      try {
        const response = await fetch('https://arte.estadao.com.br/arc/teste/obstacles.json');
        const data = await response.json();
        clearances = data;
  
        // Extrair os recursos do objeto GeoJSON
        const { features } = clearances;
  
        // Criar um objeto GeoJSON somente com os recursos
        const obstaclesGeoJSON = {
          type: 'FeatureCollection',
          features: features,
        };
  
        // Converter o objeto GeoJSON em um objeto turf.js
        obstacles = buffer(obstaclesGeoJSON, 0.035, { units: 'kilometers' });
        console.log(obstacles);
      } catch (error) {
        console.error('Erro ao carregar os obstáculos:', error);
      }
    }
  
    onMount(() => {
      mapboxgl.accessToken = accessToken;
      map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/light-v11',
        center: center,
        zoom: zoom
      });
  
      directions = new MapboxDirections({
        accessToken: accessToken,
        unit: 'metric',
        alternatives: false,
        geometries: "geojson",
        controls: { instructions: false },
        flyTo: true,
        interactive: false,
        language: "pt-BR", // Definindo o idioma como pt-BR
        placeholderDestination: "Para onde você quer ir?",
        languagePlaceholderDestination: "Destino",
        geocoder: {
            language: "pt-BR",
        },
        steps: true,
        });

  
      directions.on("origin", (origin) => {
        console.log("Origem atualizada:", origin);
      });
  
      directions.on("destination", (destination) => {
        console.log("Destino atualizado:", destination);
      });
  
      map.on('load', async () => {
        map.scrollZoom.disable();
        map.dragRotate.disable();
        map.touchZoomRotate.disableRotation();
        map.addControl(new mapboxgl.NavigationControl({
          showCompass: false,
        }), 'bottom-right');
  
        map.addControl(directions, 'top-right');
  
        startContinuousGeolocation();
        await loadObstacles();
  
        map.addSource('obstacles', {
          type: 'geojson',
          data: obstacles,
        });
  
        map.addLayer({
          id: "clearances",
          type: "fill",
          source: "obstacles",
          layout: {},
          paint: {
            "fill-color": "#f03b20",
            "fill-opacity": 0.4,
            "fill-outline-color": "#f03b20",
          },
        });
      });
    });
  
    onDestroy(() => {
      if (map) {
        map.remove();
      }
    });
  
    function startContinuousGeolocation() {
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(position => {
          const { latitude, longitude } = position.coords;
          const origin = [longitude, latitude];
          directions.setOrigin(origin);
        });
      }
    }
  
    function stopContinuousGeolocation() {
      if (navigator.geolocation && watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    }
  </script>
  
  <div id="map-container" class='G' bind:this={mapContainer}>
    <div id="map"></div>
  </div>
  <p>© Mapbox © OpenStreetMap Improve this map</p>
  
  <style>
    #map-container {
      position: relative;
      /* width: 100%; */
      height: calc(100vh - 250px);
    }
  
    #map {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  
    :global(.mapboxgl-ctrl-bottom-left, .mapbox-directions-profile, .mapboxgl-compact, #mapbox-directions-origin-input, .mapbox-form-label, .directions-icon, .mapboxgl-ctrl-attrib) {
      display: none;
    }
  
    :global(.mapboxgl-ctrl-directions) {
      width: calc(100vw - 20px);
      max-width: 400px;
    }
  
    :global(.mapboxgl-ctrl-geocoder) {
      margin-left: 0;
      width: inherit;
      max-width: inherit;
    }
  </style>
  