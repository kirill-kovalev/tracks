import {useState} from "react";
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  Panel,
  PanelHeader,
  Group,Cell,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {Map, YMaps} from "react-yandex-maps";


class Track {
  constructor(id) {
    this.id = id
    this.name = "Test Track";
    this.timestamp = 1654856186
    this.distance = 65320

  }

}


export const App = () => {
  const [tracks, setTracks] = useState([
    new Track("99955f2f-8e31-46fa-b61d-7f0bf7ce6624"),
    new Track("99955f2f-8e31-46fa-b61d-7f0bf7ce6625"),
    new Track("99955f2f-8e31-46fa-b61d-7f0bf7ce6626")
  ])
  // let tracks = [ new Track("tttt")]

  const [selectedTracks, setSelectedTracks] = useState([]);

  return (
      <AppRoot>
        <YMaps>
          <Map  style = {
            {
              position: "fixed",
              top: 0,
              bottom:0,
              left: 0,
              right: 0
            }
          } defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
        </YMaps>
        <PanelHeader>Panel 1</PanelHeader>
        <SplitLayout>
          <SplitCol fixed spaced width={280} maxWidth={280}>
            <Panel>
              <Group>
                {
                  tracks.map((i) => {

                    return (
                        <Cell
                            key={i.id}
                            onClick={() => {
                              // if (selectedTracks.contains(i.id)) {
                              //   let newTracks = selectedTracks.filter(id => id !== i.id)
                              //   setSelectedTracks(newTracks)
                              // } else {
                              //   let newTracks = selectedTracks + [i.id]
                              //   setSelectedTracks(newTracks)
                              // }
                            }
                            }
                        >
                          {i.name}
                        </Cell>
                    )
                  })
                }
              </Group>
            </Panel>
          </SplitCol>

        </SplitLayout>
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