"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const got_1 = __importDefault(require("got"));
class ItemsRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'ItemsRoutes');
    }
    RouteConfig() {
        // Get all items for given query params
        this.app.route(`/api/items`)
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // Try and cacth to handle errors
            try {
                // as an async function we wait until we get the responde from the external api
                const searchResponse = yield got_1.default(`https://api.mercadolibre.com/sites/MLA/search`, {
                    searchParams: {
                        q: (_a = req.query.q) === null || _a === void 0 ? void 0 : _a.toString(),
                        limit: '4'
                    }
                }).json();
                const categoryId = searchResponse.results[0].category_id;
                // We need to get category tree to build the breadcrumb later on
                const categoryResponse = yield got_1.default(`https://api.mercadolibre.com/categories/${categoryId}`).json();
                // Now we can send our results with category and category tree
                const response = Object.assign(Object.assign({}, searchResponse), { category_path: categoryResponse.path_from_root });
                // const parsedItems = new ItemsResponse(rawResponse).parsedResponse;
                // We send the result
                res.status(200).send(response);
            }
            catch (err) {
                // We send an error back if any
                console.error(err);
                res.status(500).json({
                    error: `🚨 External API request returned an error`,
                    detail: err
                });
            }
        }));
        // Get item info by id
        this.app.route(`/api/items/:id`)
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield got_1.default.get(`https://api.mercadolibre.com/items/${req.params.id}`).json();
                const description = yield got_1.default.get(`https://api.mercadolibre.com/items/${req.params.id}/description`).json();
                const categoryId = item.category_id;
                // We need to get category tree to build the breadcrumb later on
                const categoryResponse = yield got_1.default(`https://api.mercadolibre.com/categories/${categoryId}`).json();
                // Now we can send our results with category and category tree
                const response = Object.assign(Object.assign(Object.assign({}, item), description), { category_path: categoryResponse.path_from_root });
                res.status(200).send(response);
            }
            catch (err) {
                // We send an error back if any
                res.status(500).json({
                    error: `🚨 External API request returned an error`,
                    detail: err
                });
            }
        }));
        return this.app;
    }
}
exports.ItemsRoutes = ItemsRoutes;
