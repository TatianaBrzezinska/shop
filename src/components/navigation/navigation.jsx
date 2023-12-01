import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CartIcon, CartDropdown } from '../../components';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { selectCurrentUser, selectIsCartOpen, signOutStart } from '../../store';

import {
  NavigationContainer,
  Logo,
  NavLinks,
  NavLink
} from './navigation.styles.jsx';

export const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const signOutUser = () => dispatch(signOutStart());
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