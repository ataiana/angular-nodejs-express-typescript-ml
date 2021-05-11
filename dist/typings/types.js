"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsResponse = void 0;
class ItemsResponse {
    constructor(rawResponse) {
        var _a;
        this.result = Object.assign(Object.assign({}, rawResponse), { categoryId: (_a = rawResponse.results[0]) === null || _a === void 0 ? void 0 : _a.category_id });
    }
}
exports.ItemsResponse = ItemsResponse;
