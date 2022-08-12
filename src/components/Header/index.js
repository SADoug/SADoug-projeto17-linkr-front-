import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import userContext from "../../contexts/userContext";
import HeaderDropdownIcon from "../HeaderDropdownIcon/index";
import HeaderSearchBar from "../HeaderSearchBar/index";
import { ProfilePic } from "../../styles/profilePic";


const Header = () => {
    const [dropDownState, setDropDownState] = useState(false);
    const [logOutDropDownState, setLogOutDropDownState] = useState(false);
    const [user, setUser] = useContext(userContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }

    const myProfile = () => {
        navigate(`/user/${user.id}`)
    }

    const DesktopHeader = ({ children }) => <DesktopContainer>
        <Link to="/">
            <h1>linkr</h1>
        </Link>
        {children}
        <DropdownButton onClick={() => setLogOutDropDownState(!logOutDropDownState)} >
            <HeaderDropdownIcon dropDownState={logOutDropDownState} />
            <profilePic alt='profile-picture' radius={53} />
        </DropdownButton>
        <DropdownLogout state={logOutDropDownState}>
            <div onClick={myProfile}>my profile</div>
            <div onClick={logout}>logout</div>
        </DropdownLogout>
    </DesktopContainer>

    const MobileHeader = ({ children }) => <MobileHolder>
        <MobileContainer>
            <Link to="/">
                <h1>linkr</h1>
            </Link>
            <DropdownButton onClick={() => setLogOutDropDownState(!logOutDropDownState)}  >
                <HeaderDropdownIcon dropDownState={logOutDropDownState} />
                <ProfilePic alt='profile-picture' radius={44} />
            </DropdownButton>
            <DropdownLogout state={logOutDropDownState}>
                <div onClick={myProfile}>my profile</div>
                <div onClick={logout}>logout</div>
            </DropdownLogout>
        </MobileContainer>
        <MobileSearchBarHolder>
            {children}
        </MobileSearchBarHolder>
    </MobileHolder>

    return <>
        <DesktopHeader><HeaderSearchBar setDropDownState={setDropDownState} /></DesktopHeader>
        <MobileHeader><HeaderSearchBar setDropDownState={setDropDownState} /></MobileHeader>
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

const DropdownButton = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
    width: 150px;
    height: 100%;
    cursor: pointer;
    background-color: var(--darker-grey);
    @media screen and (max-width: 650px) {
        gap: 12px;
    }
`

const DropdownLogout = styled.div`
    position: absolute;
    background-color: var(--darker-grey);
    //display: flex;
    //flex-direction: column;
    right: 0;
    top: 72px;
    z-index: -1;
    transform: translateY(${props => props.state ? '0%' : '-100%'});
    transition: transform 250ms;
    width: 150px;
    //height: 94px;
    border-radius: 0 0 0 20px;
    
    div {
        height: 47px;
        //height: 50%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 17px;
        :hover {
            cursor: pointer;
        }
    }
`