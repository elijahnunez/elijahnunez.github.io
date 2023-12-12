let prMap;
prMap = L.map("map");

// create tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 30,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(prMap);

prMap.setView([18.2208, -66.5901], 10);

// Load GeoJSON data from a file
fetch('bomba_styles_by_barrio.json')
    .then(response => response.json())
    .then(data => {
        // Add GeoJSON layer with popup content
        L.geoJSON(data.places, {
            onEachFeature: function (feature, layer) {
                // Add marker to the map
                const marker = L.marker(feature.coordinates).addTo(prMap);
                
                // Set popup content
                const popupContent = `
                    <b>${feature.popup}</b><br>
                    ${formatStyles(feature.styles)}
                `;
                
                // Bind popup to the marker
                marker.bindPopup(popupContent).openPopup();

                // Set view on marker click
                marker.on('click', function () {
                    prMap.setView(feature.coordinates, 12);
                    showSlide(3); // Show Slide 3 when a location is clicked
                });
            }
        }).addTo(prMap);
    })
    .catch(error => console.error('Error loading GeoJSON data:', error));

function formatStyles(styles) {
    let stylesContent = '<b>Music Styles:</b><br>';
    for (const style in styles) {
        stylesContent += `<b>${style}:</b> ${styles[style].join(', ')}<br>`;
    }
    return stylesContent;
}

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

function showSlide(slideIndex) {
    // Hide all slides
    var slides = document.getElementsByClassName('slide');
    for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }

    // Show the selected slide
    var selectedSlide = document.getElementById('slide' + slideIndex);
    if (selectedSlide) {
        selectedSlide.classList.add('active');
    }
}
// Initial setup to show the first slide
showSlide(1);
