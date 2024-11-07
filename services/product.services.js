const db = require('../config/db.config');

const TABLE = 'Products';

async function getAllProducts() {
    return await db.select().from(TABLE);
}

async function getProductById(id) {
    return await db.select().from(TABLE).where('ProductID', id).first();
}

async function getAllProductsWithFilter(filters) {

    const { page, limit } = filters.pagination;

    let query = db(TABLE)
        .select(
            'p.ProductID',
            'ProductName',
            'BriefDescription',
            'FullDescription',
            'TechnicalSpecifications',
            'p.Price',
            'ImageURL',
            'CategoryID',
            db.raw('COALESCE(SUM(CI.Quantity), 0) AS TotalSales')
        )
        .from(TABLE + ' as p')
        .leftJoin('CartItems as CI', 'p.ProductID', 'CI.ProductID')
        .groupBy(
            'p.ProductID',
            'ProductName',
            'BriefDescription',
            'FullDescription',
            'TechnicalSpecifications',
            'p.Price',
            'ImageURL',
            'CategoryID'
        );

    if (filters?.filters) {
        const { minPrice, maxPrice, name, categoryId } = filters.filters;

        if (name) {
            query = query.where('ProductName', 'LIKE', `%${name}%`);
        }
        if(categoryId) {
            query = query.where('CategoryID', categoryId);
        }

        query = query.where('p.Price', '>=', minPrice)
            .where('p.Price', '<=', maxPrice);

    }

    const offset = (page - 1) * limit;

    if (filters?.sortBy) {
        switch (filters.sortBy) {
            case 'price':
                query = query.orderBy('Price')
                    .offset(offset)
                    .limit(limit);
                break;
            case 'popularity':
                query = query.orderBy('TotalSales', 'desc')
                    .offset(offset)
                    .limit(limit);
                break;
            case 'category':
                query = query.orderBy('CategoryID')
                    .offset(offset)
                    .limit(limit);
                break;
            default:
                break;
        }
    }


    // query = query.orderBy('p.ProductID') // Ensure you have an ORDER BY clause
    //     .offset(offset)
    //     .limit(limit);
    const products = await query;
    const totalElements = products.length;
    const totalPages = Math.ceil(totalElements / limit);

    return await {
        totalElements,
        totalPages,
        products,
    };
}

module.exports = {
    getAllProducts,
    getProductById,
    getAllProductsWithFilter
};