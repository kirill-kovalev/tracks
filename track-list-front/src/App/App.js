import {AppRoot, PanelHeader} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {ALL_TRACKS, Track} from "../Model/Track";
import {useStorage} from "../Model/useStorage";

import {SideList} from "../SideList/SideList";
import {TrackMap} from "../Map/TrackMap";
import {useEffect, useState} from "react";


function _fetch(url) {
    return new Promise( (resolve, reject) => {
        let data = JSON.stringify([
            {
                name: "1",
                url: "https://github.com/kirill-kovalev/tracks-raw/raw/main/2281D11A-157B-4BF6-98D9-A89235834F74.json"
            },
            {
                name: "2",
                url: "https://github.com/kirill-kovalev/tracks-raw/raw/main/06050111-732C-49FD-B37E-BF62BEBC1E6C.json"
            },
            {
                name: "3",
                url: "https://github.com/kirill-kovalev/tracks-raw/raw/main/29_05_.json"
            },
            {
                name: "4",
                url: "https://github.com/kirill-kovalev/tracks-raw/raw/main/30FB1C01-65C1-4D2E-9797-628514D0F5D4.json"
            },
            {
                name: "5",
                url: "https://github.com/kirill-kovalev/tracks-raw/raw/main/5.05.22.json"
            }
        ])
        resolve(data)
    });
}

export const App = () => {
    const [tracks, setTracks] = useState([])//useStorage("tracks", [])

    const [excludedTrackIds, setExcludedTrackIds] = useState([]) //useStorage("excluded",[]);

    useEffect(() => {
        _fetch("/tracks")
            .then(j => JSON.parse(j))
            .then(l => {
                return l.map( t => {
                    console.log("fetching tracks from: "+t.url)
                    fetch(t.url)
                        .then( r=>{
                            console.log("fetched track " + t.url)
                            return r
                        })
                        .then(r => r.json())
                        .then(d => d.features)
                        .then(features => {
                            return features.map(f => new Track(f) )
                        })
                        .then(fl => {
                            console.log("added track " + fl[0].name)
                            console.log("total tracks " + tracks.length)
                            setTracks(tracks.concat(fl))
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