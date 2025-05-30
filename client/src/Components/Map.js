import React, { memo, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { MdLocationPin } from "react-icons/md";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

const Position = ({ text, icon }) => (
  <div className="flex flex-col items-center gap-1">
    <span
      className="
        bg-white 
        shadow-lg 
        px-3 
        py-1.5 
        rounded-lg 
        text-xs 
        font-semibold 
        text-gray-800 
        whitespace-nowrap
        border border-gray-200
        select-none
        "
      style={{ minWidth: "max-content" }}
    >
      {text}
    </span>
    {icon && <div className="drop-shadow-md">{icon}</div>}
  </div>
);

const Map = ({ address }) => {
  const defaultCenter = { lat: 10.762622, lng: 106.660172 };
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (address) return;

    if (!navigator.geolocation) {
      setCoords(defaultCenter);
      setError(new Error("Trình duyệt không hỗ trợ lấy vị trí"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        console.error("Lỗi lấy vị trí hiện tại:", err);
        setCoords(defaultCenter);
        setError(err);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [address]);

  useEffect(() => {
    if (!address) return;

    const fetchCoords = async () => {
      try {
        const results = await geocodeByAddress(address);
        const latLng = await getLatLng(results[0]);
        setCoords(latLng);
        setError(null);
      } catch (err) {
        console.error("Lỗi lấy tọa độ địa chỉ:", err);
        setError(err);
      }
    };

    fetchCoords();
  }, [address]);

  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgb(0 0 0 / 0.1)",
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        defaultZoom={11}
        center={coords ?? defaultCenter}
      >
        {coords && (
          <Position
            lat={coords.lat}
            lng={coords.lng}
            icon={<MdLocationPin color="#e53e3e" size={36} />}
            text={address}
          />
        )}
      </GoogleMapReact>
      {error && (
        <div className="text-red-500 text-sm mt-2">
          Không thể lấy tọa độ của địa chỉ này.
        </div>
      )}
    </div>
  );
};

export default memo(Map);
