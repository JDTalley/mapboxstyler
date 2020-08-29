function generateJSON() {
    // text area content
    let textArea;

    switch (gType) {
        case 'Point':
            textArea = "'paint': {'circle-radius': " +
            points.radius +
            ", 'circle-color': " +
            points.color +
            ", 'circle-blur': " +
            points.blur +
            ", 'circle-opacity': " +
            points.opacity +
            ", 'circle-stroke-color': " +
            points.sColor +
            ", 'circle-stroke-opacity': " +
            points.sOpacity +
            ", 'circle-stroke-width': " +
            points.sWidth +
            "}"
            break;
        case 'LineString':
            textArea = "'paint': {'line-blur': " +
            lines.blur +
            ", 'line-cap': '" +
            lines.cap +
            "', 'line-color': " +
            lines.color +
            ", 'line-opacity': " +
            lines.opacity +
            ", 'line-width': " +
            lines.width +
            "}"
            break;
    }

    selectors.jsonArea.value = textArea;
}