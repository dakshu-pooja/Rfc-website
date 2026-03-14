import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, MapPin, Navigation, Map as MapIcon, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useLocation } from '../context/LocationContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom red pin icon to match KFC style
const RedPinIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to handle auto-zoom and detecting location
const LocationMarker = ({ setLocation, setIsMapReady }) => {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        setIsMapReady(true);
        map.locate({ setView: true, maxZoom: 16 }).on("locationfound", function (e) {
            setPosition(e.latlng);
            setLocation(e.latlng);
        });

        map.on("locationerror", function () {
            console.error("Location access denied or failed.");
        });
    }, [map, setLocation, setIsMapReady]);

    return position === null ? null : (
        <Marker position={position} icon={RedPinIcon}>
            <Popup className="custom-popup">
                <div className="font-[900] text-kfc-black uppercase italic text-[11px] tracking-tight">You are here!</div>
            </Popup>
        </Marker>
    );
};

const DeliveryAddressModal = ({ isOpen, onClose, onBack, onSignIn, onUseLocation, onConfirmLocation }) => {
    const { updateLocation } = useLocation();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [isDeliveryUnavailable, setIsDeliveryUnavailable] = useState(false);

    const detailedLocations = [
        'Tamil Nadu, India', 'Tamia, Madhya Pradesh, India', 'Tamilnadu, Tamil Nadu',
        'Tamiya, Madhya Pradesh, India', 'Chennai, Tamil Nadu, India', 'Mumbai, Maharashtra, India', 'Delhi, India',
        'Bangalore, Karnataka, India', 'Hyderabad, Telangana, India', 'Indiranagar, Bangalore, Karnataka'
    ];

    const suggestions = detailedLocations.filter(s => s.toLowerCase().includes(query.toLowerCase()));

    const handleConfirm = (directValue = null) => {
        const val = typeof directValue === 'string' ? directValue : query;
        if (!val || !val.trim()) return;

        const cleanVal = val.trim();
        // Validation logic: Only Chennai is accepted for now as per user requirement simulation
        if (cleanVal.toLowerCase().includes('chennai') || cleanVal === 'Current Location') {
            updateLocation(cleanVal);
            onConfirmLocation?.(cleanVal);
        } else {
            setIsDeliveryUnavailable(true);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setIsDeliveryUnavailable(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.98, opacity: 0 }}
                        className="bg-white w-full max-w-[700px] min-h-[420px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col relative rounded-xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-3.5 bg-white shrink-0">
                            <button onClick={onBack} className="p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center">
                                <ChevronLeft className="w-6 h-6 text-[#212529]" />
                            </button>
                            <h2 className="text-[22px] font-[900] text-[#212529] uppercase tracking-wider font-black">SELECT A KFC</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center">
                                <X className="w-6 h-6 text-[#212529]" />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex flex-col flex-grow bg-[#F8F7F5] border-t border-gray-100 overflow-y-auto relative max-h-[calc(90vh-100px)]">
                            {/* Static View (Search) */}
                            {!showMap && (
                                <div className="flex flex-col flex-grow bg-white border-t border-gray-100">
                                    {/* Sign in / Use location row */}
                                    <div className="px-10 pt-10 pb-6 flex items-center justify-center gap-6 text-[#212529]">
                                        <p className="text-[13px] font-medium tracking-tight">Already a member? <span className="underline font-bold cursor-pointer hover:opacity-75" onClick={onSignIn}>Sign in / Sign up</span></p>
                                        <div className="w-[1px] h-3 bg-gray-300"></div>
                                        <button
                                            onClick={() => {
                                                setQuery('Current Location');
                                                onUseLocation?.();
                                                handleConfirm('Current Location');
                                            }}
                                            className="flex items-center gap-2 text-[13px] font-bold hover:opacity-75 transition-opacity"
                                        >
                                            <Navigation className="w-4 h-4 fill-kfc-black rotate-[45deg]" />
                                            <span className="underline">Use My Location</span>
                                        </button>
                                    </div>

                                    {/* Search and Confirm Row */}
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleConfirm();
                                        }}
                                        className="px-10 flex items-center gap-4 mb-4"
                                    >
                                        <div className="relative flex items-center border rounded-full px-5 py-0 transition-all flex-grow bg-white border-gray-200 h-[52px]">
                                            <MapPin className="w-5 h-5 text-kfc-red mr-2 shrink-0" />
                                            <div className={`flex-grow h-[36px] flex items-center px-4 transition-all ${isFocused ? 'border-[1.5px] border-[#FFB100] rounded-[4px]' : 'border-transparent'}`}>
                                                <input
                                                    type="text"
                                                    value={query}
                                                    onFocus={() => setIsFocused(true)}
                                                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                                    onChange={(e) => {
                                                        setQuery(e.target.value);
                                                        setIsDeliveryUnavailable(false);
                                                    }}
                                                    placeholder="Search by State, City or Zip"
                                                    className="w-full text-[14px] font-medium outline-none text-[#212529] placeholder:text-[#5A5E62] bg-transparent"
                                                />
                                            </div>
                                            {query && (
                                                <button type="button" onClick={clearSearch} className="ml-2 p-1 hover:opacity-75">
                                                    <div className="w-5 h-5 rounded-full bg-[#5A5E62] flex items-center justify-center text-white">
                                                        <X className="w-3.5 h-3.5 stroke-[3px]" />
                                                    </div>
                                                </button>
                                            )}

                                            {query && suggestions.length > 0 && isFocused && (
                                                <div className="absolute top-full mt-2 left-0 right-0 bg-[#202124] rounded-[15px] shadow-2xl z-50 overflow-hidden py-2.5 border border-gray-800">
                                                    <div className="px-5 py-1.5"><span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">Suggested Search Terms</span></div>
                                                    {suggestions.map((s, i) => (
                                                        <div
                                                            key={i}
                                                            onMouseDown={(e) => {
                                                                e.preventDefault(); // Prevent input onBlur from firing before this
                                                                setQuery(s);
                                                                setIsFocused(false);
                                                                setIsDeliveryUnavailable(false);
                                                            }}
                                                            className="px-5 py-2.5 hover:bg-gray-800 cursor-pointer group flex items-start gap-4"
                                                        >
                                                            <MapPin className="w-4 h-4 mt-1 text-gray-500 group-hover:text-kfc-red" />
                                                            <span className="text-[13px] font-bold text-white uppercase tracking-tight">{s}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            className={`text-[14px] font-[900] uppercase px-12 py-[16px] rounded-full transition-all shadow-sm shrink-0 ${query ? 'bg-kfc-black text-white hover:bg-black' : 'bg-[#EAECEE] text-[#9BA4AD] cursor-not-allowed'}`}
                                        >
                                            CONFIRM
                                        </button>
                                    </form>

                                    {/* Error UI Section */}
                                    <div className="px-10 h-[220px]">
                                        {isDeliveryUnavailable ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="w-full border border-gray-100 rounded-[10px] p-10 flex flex-col items-center justify-center text-center bg-white shadow-[0_2px_15px_rgba(0,0,0,0.05)]"
                                            >
                                                <div className="text-[#E4002B] mb-3">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                                        <path d="M12 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                                <p className="text-[#E4002B] text-[16px] font-[900] leading-tight mb-8">
                                                    Delivery is currently unavailable for your location. Would you like to order pick up instead?
                                                </p>
                                                <div className="flex gap-4 w-full justify-center">
                                                    <button
                                                        onClick={() => {
                                                            setIsDeliveryUnavailable(false);
                                                            setQuery('');
                                                        }}
                                                        className="px-10 py-3.5 rounded-full border-[1.5px] border-kfc-black text-[14px] font-black text-kfc-black hover:bg-gray-50 transition-all uppercase tracking-tight"
                                                    >
                                                        Search for a different address
                                                    </button>
                                                    <button
                                                        className="px-12 py-3.5 rounded-full border-[1.5px] border-kfc-black text-[14px] font-black text-kfc-black hover:bg-gray-50 transition-all uppercase tracking-tight"
                                                    >
                                                        Order Take Away
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="w-full border-t border-gray-100 mt-6 pt-10 flex items-center justify-between">
                                                <p className="text-[13px] font-medium text-gray-500 italic tracking-tight">Please enter your location</p>
                                                <button onClick={() => setShowMap(true)} className="flex items-center gap-2 text-[13px] font-bold hover:text-kfc-red transition-all group">
                                                    <MapIcon className="w-4 h-4 text-gray-400 group-hover:text-kfc-red" />
                                                    <span className="underline italic">Map</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Map View */}
                            {showMap && (
                                <div className="flex flex-col h-full bg-[#F8F7F5]">
                                    <div className="px-8 py-4 flex flex-col shrink-0">
                                        <div className="flex items-center justify-between text-[#212529] mb-4">
                                            <p className="text-[13px] font-medium tracking-tight">Already a member? <span className="underline font-bold cursor-pointer" onClick={onSignIn}>Sign in / Sign up</span></p>
                                            <button onClick={() => setShowMap(false)} className="flex items-center gap-2 text-[13px] font-bold transition-opacity hover:opacity-75">
                                                <ChevronLeft className="w-4 h-4" />
                                                <span className="underline">Back to Search</span>
                                            </button>
                                        </div>

                                        <div className="mb-4 relative flex items-center border rounded-full px-5 py-0 transition-all w-full bg-white shadow-sm border-gray-200 h-[52px]">
                                            <MapPin className="w-5 h-5 text-kfc-red mr-2 shrink-0" />
                                            <div className="flex-grow h-[36px] flex items-center px-4 border-[1.5px] border-transparent focus-within:border-[#FFB100] focus-within:rounded-[4px] transition-all">
                                                <input
                                                    type="text"
                                                    value={query}
                                                    onChange={(e) => setQuery(e.target.value)}
                                                    placeholder="Search by State, City or Zip"
                                                    className="w-full text-[14px] font-medium outline-none text-[#212529] placeholder:text-[#5A5E62]"
                                                />
                                            </div>
                                            {query && (
                                                <button onClick={clearSearch} className="absolute right-5 p-1 hover:opacity-75">
                                                    <div className="w-5 h-5 rounded-full bg-[#5A5E62] flex items-center justify-center text-white">
                                                        <X className="w-3.5 h-3.5 stroke-[3px]" />
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Map Container - Full Height Flex */}
                                    <div className="mx-8 mb-8 relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-[#E5E7EB] h-[300px]">
                                        {!isMapReady && (
                                            <div className="absolute inset-0 z-[500] bg-gray-100 flex flex-col items-center justify-center gap-3">
                                                <Loader2 className="w-8 h-8 text-kfc-red animate-spin" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#212529]">Initialising Map</p>
                                            </div>
                                        )}

                                        <MapContainer
                                            center={[20, 0]}
                                            zoom={3}
                                            scrollWheelZoom={true}
                                            style={{ height: '300px', width: '100%' }}
                                            minZoom={2}
                                            maxBounds={[[-90, -180], [90, 180]]}
                                        >
                                            <TileLayer
                                                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                                noWrap={true}
                                                attribution='&copy; Google'
                                            />
                                            <LocationMarker setLocation={setUserLocation} setIsMapReady={setIsMapReady} />

                                            {/* Fixed UI Layer within Map */}
                                            <div className="leaflet-top leaflet-center z-[400] mt-8 pointer-events-none w-full flex justify-center">
                                                <div className="bg-white px-8 py-3 rounded-xl shadow-2xl border border-gray-100 pointer-events-auto">
                                                    <p className="text-[14px] font-[900] text-[#212529] tracking-tight">Place the pin at your location.</p>
                                                    <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                                                </div>
                                            </div>
                                        </MapContainer>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default DeliveryAddressModal;
