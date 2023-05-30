import { Container, Row, Col } from 'react-bootstrap';
import Footer__Generic from './Footer__Generic';
import Footer__Payments from './Footer__Payments';
import { useMatch, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer__Admin from './Footer__Admin';

function Footer(){
    const [footer_global, setFooter] = useState();
    const currentYear = new Date().getFullYear();
    const isAdminRoute = useMatch('/admin/*');
    const isProductRoute = useMatch('/product/*');
    const isGenericRoute = useMatch('/');
    const { userInfo } = useSelector(state => state.auth);

    return(
        <footer>
            <Container>
                { isGenericRoute && <Footer__Generic/> }
                { isAdminRoute   && <Footer__Admin/> }
                { isProductRoute && <Footer__Payments/> }
                <Row>
                    <Col className="text-center py-3">
                        <p>Gadget Geeks  &copy; { currentYear }</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;