import {
    ButtonGroup,
    Cell,
    FixedLayout,
    Group, List,
    Panel,
    SegmentedControl,
    SplitCol,
    SubnavigationButton
} from "@vkontakte/vkui";
import {trackColor} from "../Model/trackColor";
import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";
import {TrackCell} from "./TrackCell";
import './TrackCell.css';
import {useState} from "react";
import {useStorage} from "../Model/useStorage";

export const SideList = ({tracks, excludedTrackIds, setExcludedTrackIds, ...props}) => {

    let [filter, setFilter] = useState("time");
    // let [isAsc, setIsAsc] = useState(false);


    const sorted = [...tracks].sort( (lhs, rhs) => {
        switch (filter) {
            case "time":
                return rhs.time - lhs.time
            case "name":
                if (lhs.name < rhs.name)
                    return -1
                if (lhs.name > rhs.name)
                    return 1
                return 0
            case "distance":
                return lhs.length - rhs.length
        }
    })

    return (
            <div style={props.style}>
                <SegmentedControl
                    options={[
                        {
                            label: "Время",
                            value: "time",
                        },
                        {
                            label: "Дистанция",
                            value: "distance",
                        },
                        {
                            label: "Имя",
                            value: "name",
                        },
                    ]}

                    onChange={ val => setFilter(val) }
                />

                <ButtonGroup mode="horizontal" gap="space" style={{
                    padding: "15px 0",
                    alignItems: "center"
                }}>
                    <SubnavigationButton
                        before={<Icon24CheckCircleOff/>}
                        size={"l"}
                        onClick={() => setExcludedTrackIds(tracks.map( t=> t.id))}
                    >
                        Скрыть все
                    </SubnavigationButton>
                    <SubnavigationButton
                        before={<Icon24CheckCircleOn/>}
                        size={"l"}
                        onClick={() => setExcludedTrackIds([]) }
                    >
                        Показать все
                    </SubnavigationButton>
                </ButtonGroup>

                <List>
                    {
                        sorted.map((i) => {
                            return (
                                <TrackCell
                                    key={i.id}
                                    onClick={() => {
                                        if (excludedTrackIds.includes(i.id)) {
                                            setExcludedTrackIds(old => old.filter(id => id !== i.id))
                                        } else {
                                            setExcludedTrackIds(old => [...old, i.id])
                                        }
                                    }}
                                    isExcluded={excludedTrackIds.includes(i.id)}
                                    track={i}
                                    accentColor={ trackColor(tracks, i) }
                                />
                            )
                        })
                    }
                </List>
            </div>
    )
}