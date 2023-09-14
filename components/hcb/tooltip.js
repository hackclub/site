import React from 'react'

const addClassNameToChildren = (children, className) =>
  React.Children.map(children, child =>
    React.cloneElement(child, {
      className: `${child.props.className || ''} ${className}`
    })
  )

const tooltip = direction =>
  function Tooltip({ children, text, id }) {
    const escapedText = text.replace(/'/g, "\\'")
    const directionalStyles = {
      e: `
            left: 100%;
            bottom: 50%;
            right: 0;
            margin-left: 0.5rem;
            transform: translateY(50%);
        `,
      w: `
            right: 100%;
            bottom: 50%;
            margin-right: 0.5rem;
            transform: translateY(50%);
        `,
      n: `
            right: 50%;
            bottom: 100%;
            margin-bottom: 0.5rem;
            transform: translateX(50%);
        `,
      s: `
            right: 50%;
            top: 100%;
            margin-top: 0.5rem;
            transform: translateX(50%);
        `
    }[direction || 'e']

    return (
      <>
        <style>{`.tooltipped${id ? '-' + id : ''} {
                position: relative;
            }
            
            @media (min-width: 56em) {
                .tooltipped${id ? '-' + id : ''}:after {
                    background-color: rgba(31, 45, 61, 0.875);
                    border-radius: 0.5rem;
                    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.0625),
                    0 4px 8px 0 rgba(0, 0, 0, 0.125);
                    color: #ffffff;
                    content: '${escapedText}';
                    font-family: $font-family;
                    font-size: 0.875rem;
                    font-weight: 500;
                    height: min-content;
                    letter-spacing: 0;
                    line-height: 1.375;
                    max-width: 16rem;
                    min-height: 1.25rem;
                    opacity: 0;
                    padding: 0.25rem 0.75rem;
                    pointer-events: none;
                    position: absolute;
                    right: 100%;
                    text-align: center;
                    transform: translateY(50%);
                    transition: 0.125s all ease-in-out;
                    width: max-content;
                    z-index: 1000000;
            
                }
            
                .tooltipped${id ? '-' + id : ''}:hover:after,
                .tooltipped${id ? '-' + id : ''}:active:after,
                .tooltipped${id ? '-' + id : ''}:focus:after {
                    opacity: 1;
                    z-index: 9000000;
                    backdrop-filter: blur(2px);
                }
            
                .tooltipped${id ? '-' + id : ''}:after {
                    ${directionalStyles}
                }
            }`}</style>

        {children}
      </>
    )
  }

const Tooltip = tooltip()
Tooltip.N = tooltip('n')
Tooltip.S = tooltip('s')
Tooltip.E = tooltip('e')
Tooltip.W = tooltip('w')

export { Tooltip }
export default Tooltip
