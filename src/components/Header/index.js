import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderSearchBar from "../HeaderSearchBar";


const Header = () => {
    
    const DesktopHeader = ({children}) => <DesktopContainer>
        <Link to="/">
            <h1>linkr</h1>
        </Link>
        {children}
    </DesktopContainer>

    const MobileHeader = ({children}) => 
        <MobileHolder>
            <MobileContainer>
                <Link to="/">
                    <h1>linkr</h1>
                </Link>
            </MobileContainer>
            <MobileSearchBarHolder>
                {children}
            </MobileSearchBarHolder>
        </MobileHolder>

    return <>
    <DesktopHeader><HeaderSearchBar/></DesktopHeader>
    <MobileHeader><HeaderSearchBar/></MobileHeader>
    </>

}

export default Header

const Container = styled.div`
    background-color: var(--darker-grey);
    position: sticky;
    top: 0;
    height: 72px;
    padding: 0 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;
    h1 {
        color: white;
        font-size: 49px;
        font-family: var(--title-font);
    }
    a {
        text-decoration: none;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 17px;
    }
    @media screen and (max-width: 650px) {
        h1 {
            font-size: 45px;
        }
    }
`

const DesktopContainer = styled(Container)`
    @media screen and (max-width: 650px) {
        display: none
    }
`

const MobileHolder = styled.header`
    position: sticky;
    top: 0;
    background-color: var(--lighter-grey);
    z-index: 2;
    @media screen and (min-width: 650px) {
        display: none
    }
`

const MobileSearchBarHolder = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const MobileContainer = styled(Container)`
    position: relative;
`
