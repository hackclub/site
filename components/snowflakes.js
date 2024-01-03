import { Button } from 'theme-ui'
import Snowfall from 'react-snowfall'
import React, { useEffect, useState } from 'react'


export default function Snow() {
    const [showSnowfall, setShowSnowfall] = useState(true)

    const toggleSnowfall = () => {
        setShowSnowfall(!showSnowfall)
    }
    useEffect(() => {
        const snowflake1 = document.createElement('img')
    });

    return (
        <>
            <Button
                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 30,
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    gradient: 'linear-gradient(#FFAFBD, #ffc3a0)',
                    border: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
                onClick={toggleSnowfall}
            >
                {showSnowfall ? '☁️' : '⛄️'}
            </Button>
            {showSnowfall && (
                <Snowfall
                    snowflakeCount={150}
                    color='#caeafc'
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1000
                    }}
                />
            )}
        </>
    )
}