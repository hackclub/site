import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Flex, Text, Spinner } from 'theme-ui'

function NavIcon({ isBack }) {
    const style = {
        height: '1em',
        fill: 'white',
        margin: 0,
    }

    return isBack ?
        <svg style={style} viewBox="10.73 7.72 9.27 16.53">
            <g>
                <path d="M19.768,23.89c0.354,-0.424 0.296,-1.055 -0.128,-1.408c-1.645,-1.377 -5.465,-4.762 -6.774,-6.482c1.331,-1.749 5.1,-5.085 6.774,-6.482c0.424,-0.353 0.482,-0.984 0.128,-1.408c-0.353,-0.425 -0.984,-0.482 -1.409,-0.128c-1.839,1.532 -5.799,4.993 -7.2,6.964c-0.219,0.312 -0.409,0.664 -0.409,1.054c0,0.39 0.19,0.742 0.409,1.053c1.373,1.932 5.399,5.462 7.2,6.964l0.001,0.001c0.424,0.354 1.055,0.296 1.408,-0.128Z" ></path>
            </g>
        </svg>
        :
        <svg style={style} viewBox="12.75 7.72 9.25 16.53">
            <g>
                <path d="M12.982,23.89c-0.354,-0.424 -0.296,-1.055 0.128,-1.408c1.645,-1.377 5.465,-4.762 6.774,-6.482c-1.331,-1.749 -5.1,-5.085 -6.774,-6.482c-0.424,-0.353 -0.482,-0.984 -0.128,-1.408c0.353,-0.425 0.984,-0.482 1.409,-0.128c1.839,1.532 5.799,4.993 7.2,6.964c0.219,0.312 0.409,0.664 0.409,1.054c0,0.39 -0.19,0.742 -0.409,1.053c-1.373,1.932 -5.399,5.462 -7.2,6.964l-0.001,0.001c-0.424,0.354 -1.055,0.296 -1.408,-0.128Z"></path>
            </g>
        </svg>
}

export default function NavButton({ isBack, form, clickHandler }) {
    const router = useRouter()
    const [spinner, setSpinner] = useState(false)

    const click = async () => {
        // Save form data
        new FormData(form.current).forEach((value, key) => {
            sessionStorage.setItem('bank-signup-' + key, value)
        })

        // Run the parent's click handler for this button.
        // If it returns false, don't navigate.
        if (!isBack && clickHandler) {
            setSpinner(true)

            const result = await clickHandler()
            setSpinner(false)
            if (!result) return
            
        }

        const step = parseInt(router.query.step)

        if (!step) {
            step = 1
        } else if (step === 1 && isBack) {
            router.push('/bank')
            return
        } else if (step < 1) {
            step = 1
        } else {
            step += isBack ? -1 : 1
        }
        router.push({ 
            pathname: router.pathname,
            query: { ...router.query, step } }, 
            undefined, 
            {}
        )

        setSpinner(false)
    }

    return (
        <Button
            variant={ isBack ? 'outline' : 'ctaLg' }
            sx={{
                color: 'white',
                borderColor: 'muted',
                width: 'fit-content',
                translate: isBack ? '-3.3rem' : '-3.8rem', // Keyline alignment
                mb: 5,
            }}
            onClick={click}
        >
            <Flex sx={{
                flexDirection: isBack ? 'row' : 'row-reverse',
                placeItems: 'center',
                mx: isBack ? 2 : 4,
                fontSize: isBack ? 2 : 4,
                gap: 3,
            }}>
                <NavIcon isBack={isBack} />
                <Text
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    {isBack ? 'Back' : 'Next'}
                </Text>
            </Flex>
            {!isBack && spinner && <Spinner sx={{
                height: '32px',
                color: 'white',
                position: 'absolute',
                right: 0
            }} />}
        </Button>
    )
}