import { useContext, Fragment } from 'react';

import { CategoriesContext } from '../../contexts';
import { CategoryPreview } from '../../components';

export const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                );
            })}
        </Fragment>
    );
};
