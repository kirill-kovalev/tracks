import {Cell, FixedLayout, Group, Panel, SegmentedControl, SplitCol} from "@vkontakte/vkui";
import {trackColor} from "../Model/trackColor";
import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";
import {TrackCell} from "./TrackCell";
import './TrackCell.css';
import {useState} from "react";
import {useStorage} from "../Model/useStorage";

export const SideList = ({tracks, excludedTrackIds, setExcludedTrackIds}) => {

    let [filter, setFilter] = useStorage("excluded","time");

    return (
        <SplitCol spaced width={400} >

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

                    onChange = { (val) => {
                        console.log(val)
                        setFilter(val)
                    }}
                />
                <Panel>
                    {
                        tracks
                            .sort( (lhs, rhs) => {
                                switch (filter) {
                                    case "time":
                                        return lhs.time > rhs.time ? 1 : -1
                                    case "name":
                                        return lhs.name > rhs.name ? 1 : -1
                                    case "distance":
                                        return lhs.length > rhs.length ? 1 : -1
                                }
                            })
                            .map((i) => {
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
                                    isExcluded={!excludedTrackIds.includes(i.id)}
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