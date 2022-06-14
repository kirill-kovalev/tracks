import {Cell, Group, Panel, SplitCol} from "@vkontakte/vkui";
import {trackColor} from "../Model/trackColor";
import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";
import {TrackCell} from "./TrackCell";
import './TrackCell.css';

export const SideList = ({tracks, excludedTrackIds, setExcludedTrackIds}) => {

    return (
        <SplitCol spaced width={400} >
            <Panel>
                <Group>
                    {
                        tracks.map((i) => {
                            return (
                                <TrackCell
                                    key={i.id}
                                    onClick={() => {
                                        if (excludedTrackIds.includes(i.id)) {
                                            let newTracks = excludedTrackIds.filter(id => id !== i.id)

                                            setExcludedTrackIds(newTracks)
                                        } else {
                                            let newTracks = excludedTrackIds.concat([i.id])
                                            setExcludedTrackIds(newTracks)
                                        }
                                    }}
                                    isExcluded={!excludedTrackIds.includes(i.id)}
                                    track={i}
                                    accentColor={ trackColor(tracks, i) }
                                />
                            )
                        })
                    }
                </Group>
            </Panel>
        </SplitCol>
    )
}