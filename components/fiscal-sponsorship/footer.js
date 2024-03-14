import Footer from '../footer'

// Footer with default props for HCB-specific contact information
const HcbFooter = props => (
  <Footer
    phoneNumber="+1 (844) 237 2290"
    phoneNumberUri="+1-844-237-2290"
    email="hcb@hackclub.com"
    {...props}
  />
)

export default HcbFooter
