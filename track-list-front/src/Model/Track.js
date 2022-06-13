import DATA1 from "../data/3B21F7AB-D106-498C-B520-3BA035FF5FA1.json"
import DATA2 from "../data/3C9987A3-DB3B-4C53-A958-8DBC0FDD7748.json"
import DATA3 from "../data/4A0C3BD1-4D29-40F4-AF5A-0D057B0B767F.json"
import { v4 as uuidv4} from "uuid";
import geojsonLength from "geojson-length";


export class Track {
    constructor(geojsonFeature) {
        this.id = geojsonFeature.properties.name.toLowerCase().trim()
        this.name = geojsonFeature.properties.name
        this.time = new Date(geojsonFeature.properties.time)
        this.length = geojsonLength(geojsonFeature.geometry)
        this.geometry = geojsonFeature.geometry.coordinates.map( c => {
          return [c[1], c[0]]
        })
    }

}

export const ALL_TRACKS = [
    DATA1,
    DATA2,
    DATA3
].flatMap( d => d.features)
.map( feature => new Track(feature))