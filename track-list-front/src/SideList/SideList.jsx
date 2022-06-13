import {Cell, Group, Panel, SplitCol} from "@vkontakte/vkui";
import {trackColor} from "../Model/trackColor";
import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";


export const SideList = ({tracks, excludedTrackIds, setExcludedTrackIds}) => {

    return (
        <SplitCol fixed spaced width={280} maxWidth={280}>
            <Panel>
                <Group>
                    {
                        tracks.map((i) => {
                            let accentColor = trackColor(tracks, i)
                            return (
                                <Cell
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
                                >

                                    { excludedTrackIds.includes(i.id) ?
                                        <Icon24CheckCircleOff fill={ accentColor }/> :
                                        <Icon24CheckCircleOn fill={ accentColor } />
                                    }

                                    {i.name} <br/>
                                    { (i.length / 1000).toFixed(2) } km
                                </Cell>
                            )
                        })
                    }
                </Group>
            </Panel>
        </SplitCol>
    )
}