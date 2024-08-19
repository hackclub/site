import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from './readme-renderer.module.css'

const ReadmeRenderer = ({ markdown }) => {
  return (
    <ReactMarkdown className={style.reactMarkDown} remarkPlugins={[remarkGfm]}>
      {markdown}
    </ReactMarkdown>
  )
}
export default ReadmeRenderer