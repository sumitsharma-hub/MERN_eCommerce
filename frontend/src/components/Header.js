import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions'
const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <div>
            <Navbar bg="primary" expand="lg" variant="dark" collapseOnSelect  >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>E-BUY</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="cartHead" >
                            <LinkContainer to="/cart">
                                <Nav.Link > <i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}> Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                <LinkContainer to="/login">
                                    <Nav.Link ><i className="fas fa-user"></i>Sign In</Nav.Link>
                                </LinkContainer>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
