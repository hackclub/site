import base from '@hackclub/theme'
import { merge } from 'lodash'
import { Theme, ThemeUIStyleObject } from 'theme-ui'

// Extend the base theme type to include our custom properties
interface CustomTheme extends Omit<Theme, 'styles' | 'forms'> {
  useColorSchemeMediaQuery?: boolean;
  buttons?: {
    primary?: {
      textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
    };
  };
  layout?: {
    copy?: {
      maxWidth?: (string | null)[];
    };
  };
  text?: {
    title?: {
      fontSize?: number[];
    };
  };
  styles?: {
    a?: ThemeUIStyleObject & {
      ':focus,:hover'?: {
        textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed' | 'wavy';
      };
    };
  };
  forms?: {
    label?: ThemeUIStyleObject & {
      color?: string;
      display?: 'flex' | 'block' | 'inline' | 'inline-block' | 'grid' | 'inline-grid' | 'none';
      flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
      textAlign?: 'left' | 'right' | 'center' | 'justify';
      lineHeight?: string;
      fontSize?: number;
    };
    input?: ThemeUIStyleObject & {
      bg?: string;
      color?: string;
      fontFamily?: string;
      borderRadius?: string;
      border?: number;
      '::-webkit-input-placeholder'?: {
        color?: string;
      };
      '::-moz-placeholder'?: {
        color?: string;
      };
      ':-ms-input-placeholder'?: {
        color?: string;
      };
      '&[type="search"]::-webkit-search-decoration'?: {
        display?: 'none';
      };
    };
  };
}

const theme: CustomTheme = {
  ...base,
  useColorSchemeMediaQuery: false,
  buttons: {
    ...base.buttons,
    primary: merge(base.buttons?.primary || {}, {
      textTransform: 'uppercase' as const
    })
  },
  layout: {
    ...base.layout,
    copy: {
      ...base.layout?.copy,
      maxWidth: [null, null, 'copyPlus']
    }
  },
  text: {
    ...base.text,
    title: {
      ...base.text?.title,
      fontSize: [5, 6]
    }
  },
  styles: {
    ...base.styles,
    a: {
      ...base.styles?.a,
      ':focus,:hover': {
        textDecorationStyle: 'solid' as const
      }
    }
  },
  forms: {
    ...base.forms,
    label: {
      ...base.forms?.label,
      color: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
      lineHeight: '1.5',
      fontSize: 2
    },
    input: {
      ...base.forms?.input,
      bg: 'background',
      color: 'text',
      fontFamily: 'body',
      borderRadius: 'default',
      border: 1,
      '::-webkit-input-placeholder': {
        color: 'muted'
      },
      '::-moz-placeholder': {
        color: 'muted'
      },
      ':-ms-input-placeholder': {
        color: 'muted'
      },
      '&[type="search"]::-webkit-search-decoration': {
        display: 'none'
      }
    }
  }
}

export default theme 