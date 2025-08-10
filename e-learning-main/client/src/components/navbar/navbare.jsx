import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../../public/logo.svg";

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  width: 2rem;
  height: auto;
  cursor: pointer;
  color: var(--white);
  img {
    margin-right: 0.5rem;
  }
`;

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5rem;
  background: #373b44; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4286f4, #373b44); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4286f4, #373b44); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: var(--white);
  position: relative;
  z-index: 500;
  @media only screen and (max-width: 64em) {
    padding: 0.5rem 3rem;
  }
  @media only screen and (max-width: 40em) {
    padding: 0.5rem 1.5rem;
  }
`;

const Nav = styled.nav`
  width: 39rem;
  max-width: 40rem;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  transition: all 0.3s;
  @media only screen and (max-width: 48em) {
    display: none;
  }
  a {
    font-weight: 600;
    line-height: 1.5;
    color: var(--white);
    &::after {
      content: "";
      display: block;
      height: 3px;
      width: 0;
      background: transparent;
      transition: width 0.5s;
    }
    &:not(:last-child):hover::after {
      width: 100%;
      background: var(--purple);
    }
  }
`;

const Button = styled.button`
  background-color: #0082c8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only screen and (max-width: 40em) {
    font-size: 1.2rem;
    &:hover {
      transform: none;
    }
    &:focus {
      transform: none;
    }
  }
`;

const HamburgerBtn = styled.button`
  display: none;
  @media only screen and (max-width: 48em) {
    display: inline-block;
  }
  position: relative;
  background-color: transparent;
  width: 2rem;
  height: 2px;
  margin-top: 0rem;
  transition: all 0.3s;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    cursor: pointer;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const MobileMenu = styled.nav`
  display: none;
  @media only screen and (max-width: 48em) {
    display: flex;
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  overflow-x: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.clicked ? "1" : 0)};
  visibility: ${(props) => (props.clicked ? "visible" : "hidden")};
  transition: all 0.5s;
  z-index: -10;
  background-color: rgb(53 53 63 / 95%);
  border-radius: 20px;
  margin: 0.5rem;
  a {
    color: var(--white);
    font-weight: 600;
    font-size: 1.5rem;
    margin: 1.5rem;
    cursor: pointer;
  }
`;

const Navbare = () => {
  const [click, setClick] = useState(false);
  const ref = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const scrollUp = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleClick = (id, e) => {
    setClick(!click);
    scrollUp(id, e);
  };

  useEffect(() => {
    const element = ref.current;
    const mq = window.matchMedia("(max-width: 40em)");

    if (mq.matches) {
      gsap.to(element, {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        padding: "1rem 2.5rem",
        borderRadius: "0 0 50px 50px",
        border: "2px solid var(--white)",
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: "bottom+=200 top",
          end: "+=100",
          scrub: true,
        },
      });
    } else {
      gsap.to(element, {
        position: "fixed",
        top: "1rem",
        left: "3rem",
        right: "3rem",
        padding: "1.5rem 2rem",
        borderRadius: "50px",
        border: "3px solid var(--white)",
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: "bottom+=300 top",
          end: "+=250",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <Headers ref={ref}>
      <Logo to="/">
        <img src={logo} alt="CodeBucks" />
        <h3>Linkhub</h3>
      </Logo>
      <Nav>
        <Link to="#home" onClick={(e) => scrollUp("home", e)}>
          Acceuil
        </Link>
        <Link to="#about" onClick={(e) => scrollUp("about", e)}>
          Qui sommes-nous
        </Link>
        <Link to="#cours" onClick={(e) => scrollUp("cours", e)}>
          Services
        </Link>
        <Link to="#footer" onClick={(e) => scrollUp("footer", e)}>
          Contactez-nous
        </Link>
        <Link to="/login">
          <Button>inscrivez</Button>
        </Link>
      </Nav>
      <HamburgerBtn clicked={+click} onClick={() => setClick(!click)}>
        <span></span>
      </HamburgerBtn>
      <MobileMenu clicked={+click}>
        <Link to="#home" onClick={(e) => handleClick("home", e)}>
          Acceuil
        </Link>
        <Link to="#about" onClick={(e) => handleClick("about", e)}>
          Qui sommes-nous
        </Link>
        <Link to="#services" onClick={(e) => handleClick("services", e)}>
          Services
        </Link>
        <Link to="#contact" onClick={(e) => handleClick("contact", e)}>
          <Button>Contactez-nous</Button>
        </Link>
      </MobileMenu>
    </Headers>
  );
};

export default Navbare;
