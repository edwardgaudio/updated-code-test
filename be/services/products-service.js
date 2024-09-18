const {getDB} = require('../db/index');
const db = getDB();

/*
* The tradeoff made in this service is that most of the heavy computation is handed off to the database layer.
* In the event that we need to do heavy data processing in the app layer after the DB query is complete,
* for example if calculating scores of products in the app layer as opposed to letting the DB handle that, we could leverage the use of
* worker threads to do the calculation and parsing of data, so that the main thread is not blocked.  Additionally, indexing can be
* used to improve query performance and caching to reduce database load.
*
* */

const getProducts = async () => {
    try {
        return await db('products_to_characteristics')
            .leftJoin('products', 'products_to_characteristics.product_id', 'products.id')
            .leftJoin('characteristics', 'products_to_characteristics.characteristic_id', 'characteristics.id')
            .select('products.name')
            .select(db.raw('ARRAY_AGG(characteristics.name) AS characteristics'))
            .groupBy('products.id');
    } catch (error) {
        console.error(error);
        return 'An error occurred';
    }
}

// Can add caching to this function to improve performance instead of having to query db every time
const getProductsByCharacteristic = async (characteristic) => {
    try {
        return await db('products_to_characteristics')
            .leftJoin('products', 'products_to_characteristics.product_id', 'products.id')
            .leftJoin('characteristics', 'products_to_characteristics.characteristic_id', 'characteristics.id')
            .select('products.name')
            .where('characteristics.name', characteristic)
            .groupBy('products.id');
    } catch (error) {
        console.error(error);
        return 'An error occurred';
    }
}

const getProductsByScore = async () => {
    try {
        return await db('products_to_characteristics')
            .leftJoin('products', 'products_to_characteristics.product_id', 'products.id')
            .leftJoin('characteristics', 'products_to_characteristics.characteristic_id', 'characteristics.id')
            .select('products.name')
            .select(db.raw(`COALESCE(SUM(characteristics.score), 0) AS score`))
            .groupBy('products.id')
            .orderBy('score', 'desc');
    } catch (error) {
        console.error(error);
        return 'An error occurred';
    }
}

module.exports = {
    getProducts,
    getProductsByCharacteristic,
    getProductsByScore
};