import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { CartIcon, CartDropdown } from "..";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { selectCurrentUser, selectIsCartOpen, signOutStart } from "../../store";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  SignOutButton,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <SignOutButton as="span" onClick={signOutUser}>
              SIGN OUT
            </SignOutButton>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
