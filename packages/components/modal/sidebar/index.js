export default function Sidebar({ children, position }) {
    return <div className={`media-sidebar wpmi__modal__sidebar--${position}`}>
        { children }
    </div>
}
