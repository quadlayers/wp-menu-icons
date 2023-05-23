export default function IconPreview({ icon, settings }) {
    return <div class="attachment-info">
        <div class="thumbnail thumbnail-image">
            <i class={ icon }></i>
        </div>

        <div class="details">
            <div class="filename">{ icon }</div>
            <div class="uploaded">{ settings.align }</div>
            <div class="file-size">{ settings.size } <em>(em)</em></div>
        </div>
    </div>
}