export default function Comma({ children }) {
  return children
    ? children.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : ''
}
