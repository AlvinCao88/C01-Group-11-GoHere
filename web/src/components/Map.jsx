import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon } from "leaflet";
import L from 'leaflet';

function Map() {
    //loading washrooms from server? fetch from where?
    // const [washrooms, setWashrooms] = useState([]);
    // const [isLoading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function fetchWashrooms() {
    //         if (typeof window !== 'undefined') {
    //             try {
    //                 const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/washrooms`);
    //                 const data = await res.json();
    //                 setWashrooms(data);
    //                 setLoading(false);
    //             } catch (error) {
    //                 console.error("Error fetching washrooms:", error);
    //                 setLoading(false);
    //             }
    //         }
    //     }

    //     fetchWashrooms();
    // }, []);

    // if (isLoading) return <></>;
    // if (washrooms.length === 0) return <></>;

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Render nothing on the server-side
    }

    const customIcon = new Icon({
        iconUrl: '/placeholder.png',
        iconSize: [38, 38] // size of the icon
    });

    const markers = [
        {
            id: '1',
            name: 'Restaurant A',
            fullAddress: '123 Main St, City, Country',
            latitude: 51.505,
            longitude: -0.09,
            hours: {
                open: ['10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM', '10:00 AM'],
                close: ['8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM', '8:00 PM']
            },
            contact: {
                website: 'www.restaurantA.com',
                number: '123-456-7890'
            }
        },
        {
            id: '2',
            name: 'Pharmacy B',
            fullAddress: '456 Elm St, City, Country',
            latitude: 51.52,
            longitude: -0.1,
            hours: {
                open: ['9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', 'Closed'],
                close: ['6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', 'Closed']
            },
            contact: {
                website: 'www.pharmacyB.com',
                number: '987-654-3210'
            }
        },
        {
            id: '3',
            name: 'Gas Station C',
            fullAddress: '789 Oak St, City, Country',
            latitude: 51.51,
            longitude: -0.08,
            hours: {
                open: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours'],
                close: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours']
            },
            contact: {
                website: 'www.gasstationC.com',
                number: '555-123-4567'
            }
        },
        {
            id: '4',
            name: 'Cafe D',
            fullAddress: '789 Maple St, City, Country',
            latitude: 51.51,
            longitude: -0.11,
            hours: {
                open: ['8:00 AM', '8:00 AM', '8:00 AM', '8:00 AM', '8:00 AM', '8:00 AM', '9:00 AM'],
                close: ['6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '5:00 PM']
            },
            contact: {
                website: 'www.cafeD.com',
                number: '333-555-7777'
            }
        },
        {
            id: '5',
            name: 'Supermarket E',
            fullAddress: '456 Walnut St, City, Country',
            latitude: 51.52,
            longitude: -0.1,
            hours: {
                open: ['7:00 AM', '7:00 AM', '7:00 AM', '7:00 AM', '7:00 AM', '7:00 AM', '8:00 AM'],
                close: ['10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '9:00 PM']
            },
            contact: {
                website: 'www.supermarketE.com',
                number: '888-999-0000'
            }
        },
        {
            id: '6',
            name: 'Hotel F',
            fullAddress: '123 Oak St, City, Country',
            latitude: 51.50,
            longitude: -0.1,
            hours: {
                open: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours'],
                close: ['24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours', '24 Hours']
            },
            contact: {
                website: 'www.hotelF.com',
                number: '111-222-3333'
            }
        },
        {
            id: '7',
            name: 'Park G',
            fullAddress: '345 Pine St, City, Country',
            latitude: 51.51,
            longitude: -0.09,
            hours: {
                open: ['6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM', '6:00 AM'],
                close: ['10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM']
            },
            contact: {
                website: 'www.parkG.com',
                number: '777-888-9999'
            }
        },
        {
            id: '8',
            name: 'Library H',
            fullAddress: '678 Elm St, City, Country',
            latitude: 51.52,
            longitude: -0.12,
            hours: {
                open: ['9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', '9:00 AM', 'Closed'],
                close: ['6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', '6:00 PM', 'Closed']
            },
            contact: {
                website: 'www.libraryH.com',
                number: '555-111-7777'
            }
        },
        {
            id: '9',
            name: 'Gym I',
            fullAddress: '910 Maple St, City, Country',
            latitude: 51.53,
            longitude: -0.08,
            hours: {
                open: ['5:00 AM', '5:00 AM', '5:00 AM', '5:00 AM', '5:00 AM', '6:00 AM', '8:00 AM'],
                close: ['10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '10:00 PM', '9:00 PM', '6:00 PM']
            },
            contact: {
                website: 'www.gymI.com',
                number: '444-666-2222'
            }
        }]    
    
    // L.control.zoom({ position: 'topright' }).addTo(map);
    

    return (
        <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '1000px', width: '80%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {markers.map((marker) => (
                <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={customIcon}>
                    <Popup>
                        <div>
                            <h2>{marker.name}</h2>
                            <p><strong>Address:</strong> {marker.fullAddress}</p>
                            <p><strong>Hours:</strong> {marker.hours.open.join(' - ')} to {marker.hours.close.join(' - ')}</p>
                            <p><strong>Contact:</strong> Website: {marker.contact.website}, Phone: {marker.contact.number}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;

// function Map() {
//     const [isClient, setIsClient] = useState(false);

//     useEffect(() => {
//         setIsClient(true);
//     }, []);

//     if (!isClient) {
//         return null; // Render nothing on the server-side
//     }

//     const customIcon = L.icon({
//         iconUrl: '/placeholder.png',
//         iconSize: [38, 38] // size of the icon
//     });

//     const markers = [
//         // Your markers array
//     ];

//     // Create a marker cluster group
//     const markerClusterGroup = L.markerClusterGroup();

//     // Add markers to the cluster group
//     markers.forEach(marker => {
//         const markerElement = L.marker([marker.latitude, marker.longitude], { icon: customIcon })
//             .bindPopup(`
//                 <div>
//                     <h2>${marker.name}</h2>
//                     <p><strong>Address:</strong> ${marker.fullAddress}</p>
//                     <p><strong>Hours:</strong> ${marker.hours.open.join(' - ')} to ${marker.hours.close.join(' - ')}</p>
//                     <p><strong>Contact:</strong> Website: ${marker.contact.website}, Phone: ${marker.contact.number}</p>
//                 </div>
//             `);
//         markerClusterGroup.addLayer(markerElement);
//     });

//     return (
//         <MapContainer center={[51.505, -0.09]} zoom={5} style={{ height: '1000px', width: '80%' }}>
//             <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             {markerClusterGroup}
//         </MapContainer>
//     );
// }

// export default Map;
