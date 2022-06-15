import {Track} from "./Track";

export function trackColor(tracks, track) {
    let index = [...tracks]
        .sort( (lhs, rhs) => {
            if (lhs.name < rhs.name)
                return -1
            if (lhs.name > rhs.name)
                return 1
            return 0
        })
        .sort( (lhs, rhs) => lhs.length - rhs.length)
        .sort( (lhs, rhs) => lhs.time.getMilliseconds() - rhs.time.getMilliseconds())
        .indexOf(track) ?? 0

    const colors = [
        "#0F2E3F",
        "#EC3C1A",
        "#F4A88B",
        "#246590",
        "#3DACF7",
        "#E87AA4",
        "#2D038F",
        "#CE0755",
        "#B97A19",
        "#8E5AF7",
        "#89ff00",
        "#BE2813",
        "#42C1F7",
        "#2a6706",
        "#00ff9d",
        "#2D7FC1",
        "#F5B433"
    ]

    let colorIndex = index % colors.length

    return colors[colorIndex]
}