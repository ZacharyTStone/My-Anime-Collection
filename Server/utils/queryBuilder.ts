import { Request } from "express";
import sanitize from "mongo-sanitize";

/**
 * Interface for query parameters
 */
export interface QueryParams {
    sort?: string;
    search?: string;
    currentPlaylistID?: string;
    page?: number;
    limit?: number;
}

/**
 * Interface for sort options
 */
export interface SortOptions {
    [key: string]: Record<string, 1 | -1>;
}

/**
 * Sort options for anime queries
 */
export const SORT_OPTIONS: SortOptions = {
    latest: { creationDate: -1 },
    oldest: { creationDate: 1 },
    rating: { rating: -1, popularity: -1 },
    episodeCount: { episodeCount: -1 },
    format: { format: -1 },
    "a-z": { title: 1 },
    "z-a": { title: -1 },
    "date added": { createdAt: -1 },
} as const;

/**
 * Interface for query object
 */
export interface QueryObject {
    createdBy: string;
    playlistID: string;
    title?: any;
}

/**
 * Builds a query object for anime searches with user and playlist filtering
 * @param req - Express request object containing user and query parameters
 * @returns Query object for MongoDB with user and playlist constraints
 * @example
 * ```typescript
 * const query = buildAnimeQuery(req);
 * // Returns: { createdBy: "userId", playlistID: "playlistId", title: { $regex: "search", $options: "i" } }
 * ```
 */
export const buildAnimeQuery = (req: Request): QueryObject => {
    const { search, currentPlaylistID } = sanitize(req.query);

    let queryObject: QueryObject = {
        createdBy: sanitize(req.user!.userId),
        playlistID: currentPlaylistID,
    };

    if (search) {
        // Add case-insensitive search for title
        queryObject.title = { $regex: search, $options: "i" };
    }

    return queryObject;
};

/**
 * Gets pagination parameters from request
 * @param req - Express request object
 * @returns Object with page, limit, and skip values
 */
export const getPaginationParams = (req: Request) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

/**
 * Applies sorting to a query based on sort parameter
 * @param query - MongoDB query object
 * @param sort - Sort parameter from request
 * @returns Query with sorting applied
 */
export const applySorting = (query: any, sort?: string) => {
    if (sort && sort in SORT_OPTIONS) {
        return query.sort(SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]);
    }
    return query;
};

/**
 * Applies pagination to a query
 * @param query - MongoDB query object
 * @param skip - Number of documents to skip
 * @param limit - Maximum number of documents to return
 * @returns Query with pagination applied
 */
export const applyPagination = (query: any, skip: number, limit: number) => {
    return query.skip(skip).limit(limit);
};

/**
 * Calculates pagination metadata
 * @param totalCount - Total number of documents
 * @param limit - Number of documents per page
 * @returns Object with pagination metadata
 */
export const calculatePaginationMeta = (totalCount: number, limit: number) => {
    const numOfPages = Math.ceil(totalCount / limit);
    return { totalCount, numOfPages };
};
