import {Cell, FixedLayout, Group, Panel, SegmentedControl, SplitCol} from "@vkontakte/vkui";
import {trackColor} from "../Model/trackColor";
import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";
import {TrackCell} from "./TrackCell";
import './TrackCell.css';
import {useState} from "react";
import {useStorage} from "../Model/useStorage";

export const SideList = ({tracks, excludedTrackIds, setExcludedTrackIds}) => {

    let [filter, setFilter] = useState("time");
    // let [isAsc, setIsAsc] = useState(false);


    const sorted = [...tracks].sort( (lhs, rhs) => {
        switch (filter) {
            case "time":
                return lhs.time.getMilliseconds() - rhs.time.getMilliseconds()
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

    console.log(sorted.map(i => i.id))

    return (
        <SplitCol spaced maxWidth={400} width={"25%"} minWidth={150} >

            <Group>
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
                <Panel>
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
                </Panel>
            </Group>
        </SplitCol>
    )
}