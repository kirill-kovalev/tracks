import {
    AppRoot, Button, CardScroll,
    FixedLayout, Group, ModalCard, ModalPage,
    ModalRoot, Panel,
    PanelHeader, PanelHeaderButton, Root,
    ScreenSpinner, SizeType,
    SplitCol, SplitLayout,
    useAdaptivity, View,
    ViewWidth
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {ALL_TRACKS, Track} from "../Model/Track";

import {SideList} from "../SideList/SideList";
import {TrackMap} from "../Map/TrackMap";
import {useEffect, useRef, useState} from "react";
import {useStorage} from "../Model/useStorage";
import {Icon28Menu} from "@vkontakte/icons";

const API_ENDPOINT = "https://api.tracks.kidev.ru"

export const App = () => {
    const [tracks, setTracks] = useState([]) //useStorage("tracks", [])
    const [isMounted, setIsMounted] = useState(false)


    const [excludedTrackIds, setExcludedTrackIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(async () => {
        setIsMounted(true)

        const trackIds = await fetch(API_ENDPOINT).then(j => j.json())

        if (isMounted) {
            setIsLoading(true)
            let fetchRequests = trackIds.map(id => {
                const url = `${API_ENDPOINT}/${id}`

                return fetch(url)
                    .then(d => d.json())
                    .then(({features}) => {
                        const newTracks = features.map(f => new Track(f, id))

                        setTracks(prev => {
                            const tracksToAdd = newTracks.filter(t => {
                                return !prev.includes(i => i.id === t.id)
                            })

                            return [...prev, ...tracksToAdd]
                        })

                    })
            })

            Promise.all(fetchRequests)
                .finally( _ => {
                    setIsLoading(false)
                })
        }

        return () => {
            setIsMounted(false)
        }
    }, [isMounted]);

    const adaptivity = useAdaptivity()


    return (
       <>
           <PanelHeader
               after={
                   <PanelHeaderButton onClick={ event => setIsModalShown(true)}>
                       <Icon28Menu />
                   </PanelHeaderButton>
               }
           >
               Tracks
           </PanelHeader>

           <SplitLayout
               modal={
                   adaptivity.viewWidth < ViewWidth.TABLET &&
                   <ModalRoot activeModal={ isModalShown && "select"}>
                       <ModalCard
                           id="select"
                           onClose={ () => setIsModalShown(false) }
                       >
                           <SideList
                               style={{
                                   maxHeight: window.innerHeight * 0.9,
                                   overflow: "scroll"
                               }}
                               tracks={tracks}
                               excludedTrackIds={excludedTrackIds}
                               setExcludedTrackIds={setExcludedTrackIds}
                           />
                       </ModalCard>
                   </ModalRoot>
               }
           >
               {isLoading && <ScreenSpinner/>}

               <TrackMap
                   tracks={tracks}
                   excludedTrackIds={excludedTrackIds}
               />

               { adaptivity.viewWidth >= ViewWidth.TABLET &&
               <SplitCol spaced maxWidth={400} width={"25%"} minWidth={290} >

                   <Group>
                       <SideList
                           tracks={tracks}
                           excludedTrackIds={excludedTrackIds}
                           setExcludedTrackIds={setExcludedTrackIds}
                       />
                   </Group>
               </SplitCol>
               }
           </SplitLayout>
       </>
    );
};
