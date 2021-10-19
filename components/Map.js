import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';
import { FlagIcon } from '@heroicons/react/solid';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})
    
    const coordinates = searchResults.map((result) => ({
        longitude: result.long, // returns longtitude
        latitude: result.lat, // returns latitud 
    }))    
    
    const center = getCenter(coordinates)
    
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8,
    })

    return <ReactMapGL
        mapStyle='mapbox://styles/stream3x/ckux6r3mxh6jt17s0l5sl4jjt'
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}>
            
        {searchResults.map(result => (
            <div key={result.long}>
                <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                    <p
                    className='cursor-pointer text-2xl animate-bounce'
                    onClick={() => {
                        setSelectedLocation(result)
                    }}
                    >📌</p>
                </Marker>

                {/* Click Marker => Show Popup */}
                {selectedLocation.long === result.long ? (
                    <Popup
                    onClose={() => setSelectedLocation({})}
                    closeOnClick={true}
                    longitude={result.long}
                    latitude={result.lat}
                    >
                    </Popup>
                ):(false)}
            </div>
        ))}

    </ReactMapGL>

}

export default Map
