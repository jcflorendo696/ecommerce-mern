import { Container, Row, Col } from 'react-bootstrap';
import Footer__Generic from './Footer__Generic';
import Footer__Payments from './Footer__Payments';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Footer(){
    const [footer_global, setFooter] = useState();
    const currentYear = new Date().getFullYear();
    const loc = useLocation();
    const { userInfo } = useSelector(state => state.auth);

    useEffect(()=>{
        if(loc.pathname === '/'){
            setFooter('generic');
        }else{
            setFooter('others');
        }
        
    }, [loc])

    return(
        <footer>
            <Container>
                { footer_global == 'generic' 
                    && <Footer__Generic/>
                }
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