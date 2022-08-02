import { v4 as uuidv4} from "uuid";
import geojsonLength from "geojson-length";
import {simplifyPolyline} from "./simplifyPolyline";

export class Track {
    constructor(geojsonFeature, id) {
        this.id = uuidv4()
        this.file = id
        this.name = geojsonFeature.properties.name

        this.time = new Date(geojsonFeature.properties.time ?? 0).getTime()

        this.length = geojsonLength(geojsonFeature.geometry)



        let coordinates = geojsonFeature.geometry.coordinates.map( c => {
          return [c[1], c[0]]
        })

        this.geometry = simplifyPolyline(coordinates, 0.0007)
    }

}
