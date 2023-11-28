import { useContext } from 'react';

import { CategoryPreview } from '../../components';

import { CategoriesContext } from '../../contexts';

import './shop.styles.scss';

export const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <div className='shop-container'>
            {Object.keys(categoriesMap).map((key) => {
                const products = categoriesMap[key];
                return <CategoryPreview key={key} title={key} products={products} />;
            })}
        </div>
    );
};
