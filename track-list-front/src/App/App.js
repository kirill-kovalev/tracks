import {AppRoot, PanelHeader} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {ALL_TRACKS, Track} from "../Model/Track";
import {useStorage} from "../Model/useStorage";

import {SideList} from "../SideList/SideList";
import {TrackMap} from "../Map/TrackMap";
import {useEffect, useState} from "react";

export const App = () => {
    let [tracks, setTracks] = useState([]) //useStorage("tracks", [])

    const [excludedTrackIds, setExcludedTrackIds] = useState([]) //useStorage("excluded",[]);


    useEffect(() => {
        const server = "http://localhost:5000"
        fetch(server)
            .then(j => j.json())
            .then(l => {
                return l.map(id => {
                    const url = server+"/"+id
                    fetch(url)
                        .then( r=>{
                            console.log("fetched track " + id)
                            return r
                        })
                        .then(r => r.json())
                        .then(d => d.features)
                        .then(features => {
                            return features.map(f => new Track(f, id) )
                        })
                        .then(fl => {
                            setTracks(prev => [...prev, fl])
                        })
                })
            })

    }, []);

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