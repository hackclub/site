import { BaseStyles } from 'theme-ui'
import theme from '@hackclub/theme'
import styled from '@emotion/styled'

export const Styled = styled(BaseStyles)`
  font-size: 1.25rem;
  a {
    word-break: break-word;
  }
  .heading a {
    color: inherit;
    text-decoration: none;
  }
  @media print {
    font-size: 1rem;
    color: black;
    pre,
    code,
    pre code span {
      background-color: ${theme.colors.snow};
      color: black;
      font-size: 1rem !important;
    }
    a {
      color: ${theme.colors.blue};
    }
    a::after {
      content: ' (' attr(href) ') ';
    }
  }
  .details-video summary {
    list-style: none;
  }
  .details-video summary::-webkit-details-marker { // I hate safari
    display: none !important;
  }
  
  .details-video-summary {
    cursor: pointer;
    display: flex;
    gap: 6px;
    align-items: center;
    font-weight: bold;
    padding: 5px 0;
  }
  .details-video-caret  {
    width: 0; 
    height: 0; 
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 8px solid currentColor; // Create a right-facing triangle
  }
  details[open] .details-video-caret  {
    transform: rotate(90deg);
  }
  .video-summary-camera-icon {
    fill: currentColor;
    flex: 0 0 auto;
  }
  .details-video video {
    max-width: 100%;
  }
`

const Content = ({ html }) => (
  <Styled
    as="article"
    className="docs"
    dangerouslySetInnerHTML={{ __html: html }}
  />
)

export default Content