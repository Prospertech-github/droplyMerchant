import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// 6.510166905925071, 3.376875983033225

export const lists = [
  {
    title: "Picked up order 123",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    date: "Sep 20, 2021 ",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Delivered order 123",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Logged in",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Changed password",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
  {
    title: "Arrived at pickup location",
    date: "Sep 20, 2021 ",
    desc: "This parcel is paid for by the customer. Please contact the customer for any further information.",
    time: "12:32 AM",
    status: "ok",
  },
];
const TrackingParcel = () => {
  return (
    <div className="h-[500px] w-full">
      <MapContainer
        center={[6.510166905925071, 3.376875983033225]}
        zoom={17}
        maxZoom={18}
        minZoom={6}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[6.510166905925071, 3.376875983033225]}>
          <Popup>
            <div className="">Univelcity</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TrackingParcel;
