export default function Sidebar({ children, position }) {
    return <div class={`media-sidebar wpmi__modal__sidebar--${position}`}>
        { children }
    </div>
}
