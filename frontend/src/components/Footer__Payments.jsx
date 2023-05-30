import { Row, Col } from 'react-bootstrap';

const Footer__Payments = () => {
    return (
        <Row>
            <Col sm={12} md={12} lg={6} xl={6}>
                <h3>Payment Methods</h3>
                <table border="0" cellPadding="10" cellSpacing="0" width="450px">
                    <thead><tr><td align="center"></td></tr></thead>
                    <tbody>
                        <tr><td>
                        <a href="https://www.paypal.com/c2/webapps/mpp/home?locale.x=en_C2" title="PayPal Acceptance Mark">
                            <img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Full_Online_Tray_RGB.png" border="0" alt="PayPal Acceptance Mark" style={{width: '100%'}}/>
                        </a>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </Col>
            <Col sm={12} md={12} lg={6} xl={6}>
                <h6>GADGET GEEKS PAYMENT CONVENIENCE</h6>
                <p>Online shopping and transactions are made simpler as Gadget Geeks offers you convenient ways to pay for your orders online. Aside from the trusted Cash on Delivery option, Gadget Geeks also accepts Credit Card payments through its secured online transaction. records. Customers can also enjoy seamless transactions through the GGWallet function. This digital wallet lets you load online credits and use them to effortlessly pay for the items you want online. You can also avail of other added vouchers, deals, and even cashback through GGWallet, giving you more ways to save more when buying through Gadget Geeks.</p>
                <p>Finally, the platform introduces the GGPayLater option for those who want to shop now and pay later through reasonable installments.</p>
            </Col>

        </Row>
    )
}


export default Footer__Payments;