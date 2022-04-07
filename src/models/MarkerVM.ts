import { LatLngExpression } from "leaflet";

interface LeafletMarker {
    id: string;
    price: number;
    position: LatLngExpression;
}

export default LeafletMarker;
