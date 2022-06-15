import {AppRoot, PanelHeader} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {ALL_TRACKS, Track} from "../Model/Track";

import {SideList} from "../SideList/SideList";
import {TrackMap} from "../Map/TrackMap";
import {useEffect, useState} from "react";
import {useStorage} from "../Model/useStorage";

const API_ENDPOINT = "https://api.tracks.kidev.ru"

export const App = () => {
    const [tracks, setTracks] = useState([]) //useStorage("tracks", [])
    const [isMounted, setIsMounted] = useState(false)


    const [excludedTrackIds, setExcludedTrackIds] = useState([]);

    useEffect(async () => {
        setIsMounted(true)

        const trackIds = await fetch(API_ENDPOINT).then(j => j.json())

        if (isMounted) {
            trackIds.forEach(id => {
                const url = `${API_ENDPOINT}/${id}`

                fetch(url)
                    .then(trackData => {
                        console.log("fetched track " + id)
                        return trackData.json()
                    })
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
        }

        return () => {
            setIsMounted(false)
        }
    }, [isMounted]);

    return (
        <AppRoot>
            <PanelHeader>Tracks</PanelHeader>
            <TrackMap
                tracks={tracks}
                excludedTrackIds={excludedTrackIds}
            />
            <SideList
                tracks={tracks}
                excludedTrackIds={excludedTrackIds}
                setExcludedTrackIds={setExcludedTrackIds}
            />

        </AppRoot>
    );
};






























//
// const panels = ["panel 1", "panel 2", "panel 3"];
// const modals = ["modal 1", "modal 2"];
//
// const Example = withAdaptivity(
//     ({ viewWidth }) => {
//       const platform = usePlatform();
//       const [panel, setPanel] = React.useState(panels[0]);
//       const [modal, setModal] = React.useState(null);
//       const [popout, setPopout] = React.useState(null);
//
//       const modalRoot = (
//           <ModalRoot activeModal={modal}>
//             <ModalPage
//                 id={modals[0]}
//                 onClose={() => setModal(null)}
//                 header={<ModalPageHeader>Modal 1</ModalPageHeader>}
//             >
//               <Group>
//                 <CellButton onClick={() => setModal(modals[1])}>Modal 2</CellButton>
//               </Group>
//             </ModalPage>
//             <ModalPage
//                 id={modals[1]}
//                 onClose={() => setModal(null)}
//                 header={<ModalPageHeader>Modal 2</ModalPageHeader>}
//             >
//               <Group>
//                 <CellButton onClick={() => setModal(modals[0])}>Modal 1</CellButton>
//               </Group>
//             </ModalPage>
//           </ModalRoot>
//       );
//
//       const isDesktop = viewWidth >= ViewWidth.TABLET;
//       const hasHeader = platform !== VKCOM;
//
//       return (
//
//       );
//     },
//     {
//       viewWidth: true,
//     }
// );
//
// <Example />;
