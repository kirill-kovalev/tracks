import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";
import {Cell} from "@vkontakte/vkui";

export const TrackCell = ({track, onClick, isExcluded, accentColor}) => {
    return (
        <Cell onClick={onClick} style={{
            width: "100%"
        }}>
            <span
                style={{
                    fontSize: 8,
                    paddingLeft: 36,
                    color: 'lightGrey',
                    fontWeight: 600
                }}
            >{ track.id }</span>
            <div className="trackCell-container" style={{
                width: "100%"
            }}>
                <div className={"trackCell-Icon"}>
                    { isExcluded ?
                        <Icon24CheckCircleOff fill={accentColor}/> :
                        <Icon24CheckCircleOn fill={accentColor}/>
                    }
                </div>

                <div className={"trackCell-Text-vStack"}>

                    <div className="trackCell-Text-hStack">
                        <span>{ track.name }</span>
                        <span>{ (track.length / 1000).toFixed(2) } km</span>
                    </div>
                    <span>{
                        track.time.toLocaleDateString("ru-ru", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }</span>
                </div>
            </div>
        </Cell>
    )
}