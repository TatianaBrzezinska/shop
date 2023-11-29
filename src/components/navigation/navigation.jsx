import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { UserContext, CartContext } from '../../contexts';

import { CartIcon, CartDropdown } from '../../components';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { signOutUser } from '../../utils/firebase';

import {
  NavigationContainer,
  Logo,
  NavLinks,
  NavLink
} from './navigation.styles.jsx';

export const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to='/'>
          <CrwnLogo className='logo' />
        </Logo>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};