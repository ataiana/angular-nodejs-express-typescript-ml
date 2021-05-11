import { CommonRoutesConfig } from '../common/common.routes.config';
import { Application, Request, Response } from 'express';
import got from 'got';
import { Items, ItemResponse, Category } from '../../typings/types';

export class ItemsRoutes extends CommonRoutesConfig {

    constructor( app: Application ) {
        super(app, 'ItemsRoutes');
    }

    RouteConfig(): Application {
        // Get all items for given query params
        this.app.route(`/api/items`)
            .get( async (req: Request, res: Response) => {
                // Try and cacth to handle errors
                try {
                    // as an async function we wait until we get the responde from the external api
                    const searchResponse: Items = await got(
                        `https://api.mercadolibre.com/sites/MLA/search`,
                        {
                            searchParams: { 
                                q: req.query.q?.toString(),
                                limit: '4'
                            }
                        }
                    ).json();
                    const categoryId: string = searchResponse.results[0].category_id;
                    // We need to get category tree to build the breadcrumb later on
                    const categoryResponse: Category = await got(
                        `https://api.mercadolibre.com/categories/${categoryId}`
                    ).json();
                    // Now we can send our results with category and category tree
                    const response = {
                        ...searchResponse,
                        category_path: categoryResponse.path_from_root
                    };

                    // const parsedItems = new ItemsResponse(rawResponse).parsedResponse;
                    // We send the result
                    res.status(200).send( response );
                } catch (err) {
                    // We send an error back if any
                    console.error(err);
                    res.status(500).json({
                        error: `🚨 External API request returned an error`,
                        detail: err
                    })
                }
                
            });
        // Get item info by id
        this.app.route(`/api/items/:id`)
            .get( async (req: Request, res: Response) => {
                try {
                    const item: ItemResponse = await got.get(
                        `https://api.mercadolibre.com/items/${req.params.id}`
                    ).json();
                    const description: ItemResponse = await got.get(
                        `https://api.mercadolibre.com/items/${req.params.id}/description`
                    ).json();

                    const categoryId: string = item.category_id;
                    // We need to get category tree to build the breadcrumb later on
                    const categoryResponse: Category = await got(
                        `https://api.mercadolibre.com/categories/${categoryId}`
                    ).json();
                    // Now we can send our results with category and category tree
                    const response = {
                        ...item,
                        ...description,
                        category_path: categoryResponse.path_from_root
                    }
    
                    res.status(200).send( response );
                } catch (err) {
                    // We send an error back if any
                    res.status(500).json({
                        error: `🚨 External API request returned an error`,
                        detail: err
                    })
                }
                
            });
        return this.app
    }

}