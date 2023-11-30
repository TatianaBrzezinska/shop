import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectIsLoading } from '../../store';
import { CategoryPreview, Spinner } from '../../components';

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    );
                })
            )}
        </Fragment>
    );
};
