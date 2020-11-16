import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem, NavbarBrand,
  Container
} from 'reactstrap'

const Header = ()  => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleHandle = () => {
    setIsOpen(!isOpen)
  }
    return (
      <Navbar light className="header" expand="sm">
        <Container className="content-container content-container--header">
            <NavbarBrand className="header__title">
              <img className="logo" src="./images/logo.png" alt="Painel do Agro" />
              <h1>Painel do Agro</h1>
            </NavbarBrand>
            <NavbarToggler onClick={toggleHandle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem className="nav__links">
                  <NavLink to="/" activeClassName="is-active" className="nav-btn" exact={true}><h1>Home</h1></NavLink>
                  <NavLink to="/map" activeClassName="is-active" className="nav-btn"><h1>Mapa</h1></NavLink>
                  <NavLink to="/news" activeClassName="is-active" className="nav-btn"><h1>Notícias</h1></NavLink>
                  <NavLink to="/about" activeClassName="is-active" className="nav-btn"><h1>Sobre</h1></NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </Container>
      </Navbar>
    )
}

export { Header as default }