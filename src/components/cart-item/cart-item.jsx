import { CartItemContainer, ItemDetails } from './cart-item.styles';

export const CartItem = ({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span>{name}</span>
                <span>
                    {quantity} x ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    );
};