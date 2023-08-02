mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // stylesheet location
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)


// mapboxgl.accessToken = mapToken; 
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/outdoors-v12', // style URL
//     center: campground.geometry.coordinates, // starting position [lng, lat]
//     zoom: 12, // starting zoom
// });

// map.addControl(new mapboxgl.NavigationControl());

// //1 set the marker for latutude and longitute 
// //2. set popup on that marker 
// //3. then we add the marker to the map 
// new mapboxgl.Marker()
//     .setLngLat(campground.geometry.coordinates)
//     .setPopup(
//         new mapboxgl.Popup({offset:25})
//         .setHTML(
//             `<h3>${campground.title}</h3><p>${campground.location}</p>`
//         )
//     )
//     .addTo(map)