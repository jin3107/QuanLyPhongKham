/**
 * @typedef {Object} SearchRequest
 * @property {Array} filters - Array of Filter objects
 * @property {Object} sortBy - SortByInfo object
 * @property {number} pageIndex - Page index (0-based)
 * @property {number} pageSize - Page size
 */

export const createSearchRequest = (
	filters = null,
	sortBy = null,
	pageIndex = 0,
	pageSize = 100
) => ({
	filters,
	sortBy,
	pageIndex,
	pageSize,
});
