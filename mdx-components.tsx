import type { MDXComponents } from 'mdx/types'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    const componentsWithStyles = useThemedStylesWithMdx(
        components
    )

    return {
        ...componentsWithStyles,
    }
}