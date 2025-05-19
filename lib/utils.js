export const withCommas = x => x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'

export const cyberpunkVariants = {
    text: {
        title: {
            fontSize: [5, 6],
            fontWeight: 'bold',
            lineHeight: 'title',
            color: 'cyberpunk.textHighlight'
        },
        subtitle: {
            fontSize: [2, 3],
            fontWeight: 'body',
            lineHeight: 'subheading',
            color: 'cyberpunk.text'
        },
        headline: {
            variant: 'text.title',
            fontSize: [4, 5, 6],
            mt: 3,
            mb: 3,
            color: 'cyberpunk.textHighlight'
        },
        ultratitle: {
            variant: 'text.title',
            fontSize: [5, 6, 7],
            mb: 4,
            color: 'cyberpunk.textHighlight'
        },
        lead: {
            fontSize: [2, 3],
            maxWidth: 'copyPlus',
            color: 'cyberpunk.text'
        }
    },
    buttons: {
        primary: {
            textTransform: 'uppercase',
            backgroundImage: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
            '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out'
            },
            gap: 2,
            color: 'white'
        }
    }
} 