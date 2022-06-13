import {Track} from "./Track";

export function trackColor(tracks, track) {
    let index = tracks.indexOf(track) ?? 0
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
        "#77C344",
        "#BE2813",
        "#42C1F7",
        "#579F2B",
        "#B8E297",
        "#2D7FC1",
        "#F5B433"
    ]

    let colorIndex = index % colors.length

    return colors[colorIndex]
}