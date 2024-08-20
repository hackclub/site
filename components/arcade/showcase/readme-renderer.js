import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import style from './readme-renderer.module.css'

const ReadmeRenderer = ({ markdown }) => {
  return (
    <ReactMarkdown
      className={style.reactMarkDown}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      linkTarget={'_blank'}
      >
      {markdown}
    </ReactMarkdown>
  )
}
export default ReadmeRenderer