import { Box, Text, Grid } from 'theme-ui'
import CarouselCards from './carousel-cards'
export default function Carousel({ cards }) {
    return (
        <Grid id="winners" gap={2} columns={[1, null, 3]} sx={{m:'2', justifyContent:'center', alignItems:'center', justifyItems:'center'}}>
            {cards.map((card, idx) => (
                <CarouselCards key={idx} {...card} />
            ))}
      </Grid>
    )
}