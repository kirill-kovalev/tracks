import {Map, Polyline, YMaps} from "react-yandex-maps";
import {trackColor} from "../Model/trackColor";

export const TrackMap = ({tracks, excludedTrackIds}) => {

    return (
        <YMaps>
            <Map
                style = {{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
                defaultState={{
                    center: [59.945455, 30.331429],
                    zoom: 12,
                }}
            >
                {
                    tracks
                        .filter(track => !excludedTrackIds.includes(track.id))
                        .map( track => {
                            return (
                                <Polyline
                                    key={track.id}
                                    geometry={ track.geometry }
                                    options={{
                                        balloonCloseButton: false,
                                        strokeColor: trackColor(tracks, track),
                                        strokeWidth: 8,
                                        strokeOpacity: 1
                                    }}
                                />
                            )
                        })
                }
            </Map>
        </YMaps>
    )
}