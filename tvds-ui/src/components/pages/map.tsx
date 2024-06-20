import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { MdLocationOn } from "react-icons/md";
import { trpc } from "../../utils/trpc";
import Route from "./route";

type Props = {
  vehicleNumber?: string;
};

export default function Map(props: Props) {
	const { data: tracking } = trpc.detection.trackVehicle.useQuery({
		vehicleNumber: props.vehicleNumber || "",
	}, { enabled: !!props.vehicleNumber });

	const customMarkerIcon = (i: number) =>
		divIcon({
			html: renderToStaticMarkup(
				<div className="relative">
					<MdLocationOn className="text-4xl -mt-[1.1rem] -ml-[0.8rem] text-blue-500" />
					<span className="absolute top-[0.9rem] left-[0.1rem] text-white">
						{i}
					</span>
				</div>
			),
		});

	if (!tracking || tracking.length === 0) {
		return <div>No tracking data</div>;
	}

	return (
		<MapContainer
			center={[tracking[0].latitude, tracking[0].longitude]}
			zoom={13}
			style={{ height: "80vh" }}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{/* {tracking?.map((item, i: number) => (
        <Marker
          key={i}
          position={[item.latitude, item.longitude]}
          icon={customMarkerIcon(i)}
        />
      ))} */}
			<Route trackedData={tracking} />
		</MapContainer>
	);
}
