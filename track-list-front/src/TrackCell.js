import {Icon24CheckCircleOff, Icon24CheckCircleOn} from "@vkontakte/icons";

const TrackCell = (props) => {
    <div>
        <div className="icon">
            { props.isExcluded ?
                <Icon24CheckCircleOff/> :
                <Icon24CheckCircleOn/>
            }
        </div>

        <div>
            <div>{ props.track.name }</div>
            <div>{ (props.track.length / 1000).toFixed(2) } km</div>
            <div>{ props.track.time }</div>
        </div>
    </div>
}