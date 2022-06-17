import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";
import {Caption, Cell, RichCell} from "@vkontakte/vkui";

export const TrackCell = ({track, onClick, isExcluded, accentColor}) => {
    let date = new Date(track.time)
    return (
        <RichCell
            multiline
            onClick={onClick}
            before={
                <div style={{ paddingTop: 23, paddingRight: 18}}>
                    {
                        isExcluded ?
                            <Icon24CheckCircleOff fill={accentColor}/> :
                            <Icon24CheckCircleOn fill={accentColor}/>
                    }
                </div>
            }
            caption={ date.toLocaleDateString("ru-ru", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) }
            after={ `${(track.length / 1000).toFixed(2)} km` }
        >
            <Caption level="4" weight="1" style={{ color: 'lightGrey', marginBottom: 4 }}>
                { track.file }
            </Caption>
            {track.name}
        </RichCell>
    )
}