import { LatLngExpression } from "leaflet";

interface LeafletMarker {
    price: number;
    position: LatLngExpression;
}

export default LeafletMarker;
