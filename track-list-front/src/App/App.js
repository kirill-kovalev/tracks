import {AppRoot, PanelHeader} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {ALL_TRACKS} from "../Model/Track";
import {useStorage} from "../Model/useStorage";

import {SideList} from "../SideList/SideList";
import {TrackMap} from "../Map/TrackMap";

export const App = () => {
    const [tracks, setTracks] = useStorage("tracks", ALL_TRACKS)

    const [excludedTrackIds, setExcludedTrackIds] = useStorage("excluded",[]);

// fetch("")

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