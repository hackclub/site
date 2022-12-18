export default function Comma({ children }) {
  return children.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
