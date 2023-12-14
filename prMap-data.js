let prMap;
prMap = L.map("map");

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 30,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(prMap);

prMap.setView([18.2208, -66.5901], 10);

const locations = [
    {
      name: "Santurce",
      coordinates: [18.4481, -66.0642],
      styles: {
        Sicá: ["Bélen Santurce"],
        Cumbé: ["Cuembé Santurce"],
        Yubá: ["Leró Santurce"],
      },
      popup: "<b>Santurce</b>",
    },
    {
      name: "San Juan",
      coordinates: [18.4436, -66.1136],
      styles: {
        Cumbé: ["Cuembé Cataño"],
        Holandes: ["Holandé Cataño"],
      },
      popup: "<b>San Juan</b>",
    },
    {
      name: "Loiza",
      coordinates: [18.4401, -65.8798],
      styles: {
        Sica: ["Bámbules", "Rulé", "Seis corrido"],
        Yubá: ["Corvé Loiza"],
      },
      popup: "<b>Loiza</b>",
    },
    {
      name: "Ponce",
      coordinates: [18.0111, -66.6141],
      styles: {
        Holandés: ["Mariandá"],
        Cumbé: ["Belén Sur"],
        Yubá: ["Leró Sur"],
      },
      popup: "<b>Ponce</b>",
    },
    {
      name: "Mayaguëz",
      coordinates: [18.2013, -67.1397],
      styles: {
        Holandés: ["Holandés"],
      },
      popup: "<b>Mayagüez</b>",
    },
  ];
  
locations.forEach((location, index) => {
    // Add marker to the map
    const marker = L.marker(location.coordinates).addTo(prMap);
    
    // Set popup content
    const popupContent = `
        <b>${location.name}</b><br>
        ${formatStyles(location.styles)}
    `;
    
    // Bind popup to the marker
    marker.bindPopup(popupContent).openPopup();

    // Set view on marker click and show the corresponding slide
    marker.on('click', function () {
        prMap.setView(location.coordinates, 12);
    });
});

function formatStyles(styles) {
    let stylesContent = '<b>Music Styles:</b><br>';
    for (const style in styles) {
        stylesContent += `<b>${style}:</b> ${styles[style].join(', ')}<br>`;
    }
    return stylesContent;
}

// Function to find locations with the same style
function findLocationsWithStyle(style, locations) {
    return locations.filter(location => location.styles.hasOwnProperty(style));
}


const styleColors = {
    'Sicá': 'red',
    'Cumbé': 'blue',
    'Yubá': 'green',
    'Holandés': 'purple'
};

// Assuming 'styles' is an array of the style names you want to draw lines for.
const styles = ['Sicá', 'Cumbé', 'Yubá', 'Holandés'];
styles.forEach(style => {
    drawLinesForStyle(style, locations, prMap);
});

function getIntermediatePoints(start, end, numberOfPoints) {
    let latlngs = [];
    for (let i = 0; i <= numberOfPoints; i++) {
        let lat = start[0] + (end[0] - start[0]) * i / numberOfPoints;
        let lng = start[1] + (end[1] - start[1]) * i / numberOfPoints;
        latlngs.push([lat, lng]);
    }
    return latlngs;
}

function drawLinesForStyle(style, locations, map) {
    let locationsWithStyle = findLocationsWithStyle(style, locations);
    if (locationsWithStyle.length > 1) {
        for (let i = 0; i < locationsWithStyle.length - 1; i++) {
            const start = locationsWithStyle[i].coordinates;
            const end = locationsWithStyle[i + 1].coordinates;
            const intermediatePoints = getIntermediatePoints(start, end, 10);
            L.polyline(intermediatePoints, {
                color: styleColors[style] || 'black',
                weight: 4
            }).addTo(map);
        }
    }
}

function findLocationsWithStyle(style, locations) {
    return locations.filter(location => location.styles.hasOwnProperty(style));
}

// Add markers to the map
locations.forEach((location, index) => {
    const marker = L.marker(location.coordinates).addTo(prMap);
    const popupContent = `<b>${location.name}</b><br>${formatStyles(location.styles)}`;
    marker.bindPopup(popupContent).openPopup();
    marker.on('click', function () {
        prMap.setView(location.coordinates, 12);
    });
});

function goToLocation(location) {
    // Check the selected value and take action accordingly
    switch (location) {
        case 'catano':
            prMap.setView([18.4436, -66.1136], 12);
            break;
        case 'santurce':
            prMap.setView([18.4481, -66.0642], 12);
            break;
        case 'loiza':
            prMap.setView([18.4401, -65.8798], 12);
            break;
        case 'ponce':
            prMap.setView([18.0111, -66.6141], 12);
            break;
        case 'mayaguez':
            prMap.setView([18.2063, -67.1656], 12);
            break;
        // Add more cases if you have additional locations
        default:
            break;
    }
}

function toggleVisibility(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}
