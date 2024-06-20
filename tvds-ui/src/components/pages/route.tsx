import { useEffect } from "react";
import L, { divIcon } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MdLocationOn } from "react-icons/md";
import { TrpcRouterOutput } from "../../utils/trpc";

type TrackVehicleType = TrpcRouterOutput["detection"]["trackVehicle"];

// L.Marker.prototype.options.icon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
// });

const Location = () => (
  <svg viewBox="0 0 395.71 395.71" style={{ fill: "#0000ff" }}>
    <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738   c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388   C335.179,61.609,273.569,0,197.849,0z" />
  </svg>
);
const customMarkerIcon = (i: number) =>
  divIcon({
    html: renderToStaticMarkup(
      <div className="relative">
        {/* <MdLocationOn className="text-4xl -mt-[1.5rem] -ml-[0.8rem] text-blue-500" /> */}
        <div className="w-10 -mt-[2.05rem] -ml-[0.95rem] text-blue-500">
          <Location />
        </div>
        <span className="absolute  text-xl top-[0rem] -left-[0.03rem] text-white">
          {i}
        </span>
      </div>
    ),
  });

export default function Route(props: { trackedData: TrackVehicleType }) {
  const map = useMap();
  // const sourceName = props.trackedData.map((i)=> i.location);

  const sourceDetail = props.trackedData.map((item) => {
    return {
      location: item.location,
      name: item.name,
      detections: item.detections.map((i) => {
        return {
          startAt: new Date(i.startAt).toLocaleString(),
        };
      }),
    };
  });
  // @ts-ignore

  useEffect(() => {
    if (!map) {
      return;
    }

    const routingControl = L.Routing.control({
      show: false,
      addWaypoints: false,
      pointMarkerStyle: {},
      lineOptions: {
        styles: [{ color: "#6FA1EC", opacity: 1, weight: 5 }],
        //added the below due to type issues
        extendToWaypoints: true,
        missingRouteTolerance: 1,
      },
      // @ts-ignore
      createMarker: (i, wp, n) =>
        L.marker(wp.latLng, {
          icon: customMarkerIcon(i + 1),
        }).bindTooltip(() => {
          const location = sourceDetail[i].location;
          const name = sourceDetail[i].name;
          const detections = sourceDetail[i].detections.map(
            (detection) => detection.startAt
          );
          return `Loc: ${location}, Source: ${name}, Time: ${detections}`;
        }),

      // bindTooltip(sourceName[i]),

      waypoints: props.trackedData.map((item) => {
        return L.latLng(item.latitude, item.longitude);
      }),
      routeWhileDragging: true,
    });
    routingControl.addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, props.trackedData, sourceDetail]);

  return null;
}
