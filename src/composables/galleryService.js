// ============================================================
// Gallery Service
// ============================================================
//
// Current:
// Vue frontend + localStorage
//
// Future:
// Vue frontend + Laravel API
//
// Component-এর CRUD logic এখানে রাখা হয়েছে যাতে পরে backend
// যুক্ত করার সময় componentগুলো পরিবর্তন করতে না হয়.
// ============================================================

import { galleries as initialGalleries } from "@/constants/gallery";

const STORAGE_KEY = "alumni_gallery_data";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/**
 * Create a simple slug from title
 */
const createSlug = (title) => {
    return String(title || "")
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

/**
 * Generate next numeric ID
 */
const generateId = (items) => {
    if (!items.length) {
        return 1;
    }

    return (
        Math.max(
            ...items.map((item) => Number(item.id) || 0)
        ) + 1
    );
};

/**
 * Normalize gallery object
 */
const normalizeGallery = (gallery, id = null) => {
    return {
        id:
            id !== null
                ? Number(id)
                : Number(gallery.id),

        title: gallery.title || "",

        slug:
            gallery.slug ||
            createSlug(gallery.title),

        category:
            gallery.category || "other",

        categoryName:
            gallery.categoryName || "অন্যান্য",

        date: gallery.date || "",

        image: gallery.image || "",

        featured: Boolean(gallery.featured),

        status:
            gallery.status || "published",

        createdAt:
            gallery.createdAt ||
            new Date().toISOString(),

        updatedAt:
            new Date().toISOString(),
    };
};

/*
|--------------------------------------------------------------------------
| Initial Data
|--------------------------------------------------------------------------
|
| Existing gallery.js data-তে status/slug না থাকলেও সমস্যা হবে না.
| Service নিজে এগুলো normalize করে নেবে.
|
*/

const getInitialData = () => {
    return initialGalleries.map((gallery) =>
        normalizeGallery(gallery)
    );
};

/*
|--------------------------------------------------------------------------
| Read Data
|--------------------------------------------------------------------------
*/

/**
 * Get all galleries
 */
export const getGalleries = () => {
    try {
        const storedData =
            localStorage.getItem(STORAGE_KEY);

        /*
        |--------------------------------------------------------------------------
        | First time
        |--------------------------------------------------------------------------
        */

        if (!storedData) {
            const initialData =
                getInitialData();

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(initialData)
            );

            return initialData;
        }

        const parsedData =
            JSON.parse(storedData);

        /*
        |--------------------------------------------------------------------------
        | Safety
        |--------------------------------------------------------------------------
        */

        if (!Array.isArray(parsedData)) {
            const initialData =
                getInitialData();

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(initialData)
            );

            return initialData;
        }

        return parsedData;
    } catch (error) {
        console.error(
            "GalleryService: Failed to get galleries",
            error
        );

        return [];
    }
};

/*
|--------------------------------------------------------------------------
| Get Single Gallery
|--------------------------------------------------------------------------
*/

/**
 * Get gallery by ID
 */
export const getGalleryById = (id) => {
    const galleries = getGalleries();

    return (
        galleries.find(
            (gallery) =>
                String(gallery.id) === String(id)
        ) || null
    );
};

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

/**
 * Create new gallery
 */
export const createGallery = (data) => {
    try {
        const galleries = getGalleries();

        const newId = generateId(galleries);

        const newGallery = normalizeGallery(
            {
                ...data,
                id: newId,
            },
            newId
        );

        galleries.unshift(newGallery);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(galleries)
        );

        return newGallery;
    } catch (error) {
        console.error(
            "GalleryService: Failed to create gallery",
            error
        );

        throw error;
    }
};

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

/**
 * Update existing gallery
 */
export const updateGallery = (
    id,
    data
) => {
    try {
        const galleries = getGalleries();

        const index = galleries.findIndex(
            (gallery) =>
                String(gallery.id) ===
                String(id)
        );

        if (index === -1) {
            throw new Error(
                "Gallery not found."
            );
        }

        const existingGallery =
            galleries[index];

        const updatedGallery =
            normalizeGallery(
                {
                    ...existingGallery,
                    ...data,

                    /*
                    |--------------------------------------------------------------------------
                    | Keep old image if no new image is supplied
                    |--------------------------------------------------------------------------
                    */

                    image:
                        data.image ||
                        existingGallery.image,

                    /*
                    |--------------------------------------------------------------------------
                    | Keep original creation date
                    |--------------------------------------------------------------------------
                    */

                    createdAt:
                        existingGallery.createdAt,
                },
                existingGallery.id
            );

        galleries[index] =
            updatedGallery;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(galleries)
        );

        return updatedGallery;
    } catch (error) {
        console.error(
            "GalleryService: Failed to update gallery",
            error
        );

        throw error;
    }
};

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

/**
 * Delete gallery
 */
export const deleteGallery = (id) => {
    try {
        const galleries = getGalleries();

        const exists = galleries.some(
            (gallery) =>
                String(gallery.id) ===
                String(id)
        );

        if (!exists) {
            throw new Error(
                "Gallery not found."
            );
        }

        const updatedGalleries =
            galleries.filter(
                (gallery) =>
                    String(gallery.id) !==
                    String(id)
            );

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                updatedGalleries
            )
        );

        return true;
    } catch (error) {
        console.error(
            "GalleryService: Failed to delete gallery",
            error
        );

        throw error;
    }
};

/*
|--------------------------------------------------------------------------
| Featured Galleries
|--------------------------------------------------------------------------
*/

/**
 * Get featured galleries
 */
export const getFeaturedGalleries = (
    limit = null
) => {
    const galleries =
        getGalleries().filter(
            (gallery) =>
                gallery.featured === true &&
                gallery.status ===
                    "published"
        );

    if (limit) {
        return galleries.slice(0, limit);
    }

    return galleries;
};

/*
|--------------------------------------------------------------------------
| Published Galleries
|--------------------------------------------------------------------------
*/

/**
 * Get only published galleries
 */
export const getPublishedGalleries = () => {
    return getGalleries().filter(
        (gallery) =>
            gallery.status === "published"
    );
};

/*
|--------------------------------------------------------------------------
| Category Filter
|--------------------------------------------------------------------------
*/

/**
 * Get galleries by category
 */
export const getGalleriesByCategory = (
    category
) => {
    if (!category || category === "all") {
        return getPublishedGalleries();
    }

    return getPublishedGalleries().filter(
        (gallery) =>
            gallery.category === category
    );
};

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

/**
 * Search galleries
 */
export const searchGalleries = (
    keyword
) => {
    const galleries =
        getGalleries();

    const search =
        String(keyword || "")
            .trim()
            .toLowerCase();

    if (!search) {
        return galleries;
    }

    return galleries.filter(
        (gallery) =>
            gallery.title
                ?.toLowerCase()
                .includes(search) ||
            gallery.categoryName
                ?.toLowerCase()
                .includes(search)
    );
};

/*
|--------------------------------------------------------------------------
| Toggle Featured
|--------------------------------------------------------------------------
*/

/**
 * Toggle featured status
 */
export const toggleGalleryFeatured = (
    id
) => {
    const gallery =
        getGalleryById(id);

    if (!gallery) {
        throw new Error(
            "Gallery not found."
        );
    }

    return updateGallery(id, {
        featured: !gallery.featured,
    });
};

/*
|--------------------------------------------------------------------------
| Toggle Status
|--------------------------------------------------------------------------
*/

/**
 * Toggle Published / Draft
 */
export const toggleGalleryStatus = (
    id
) => {
    const gallery =
        getGalleryById(id);

    if (!gallery) {
        throw new Error(
            "Gallery not found."
        );
    }

    return updateGallery(id, {
        status:
            gallery.status ===
            "published"
                ? "draft"
                : "published",
    });
};

/*
|--------------------------------------------------------------------------
| Reset Gallery Data
|--------------------------------------------------------------------------
|
| Development-এর সময় দরকার হতে পারে.
| Production-এ UI থেকে expose না করাই ভালো.
|
*/

export const resetGalleryData = () => {
    const initialData =
        getInitialData();

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(initialData)
    );

    return initialData;
};

/*
|--------------------------------------------------------------------------
| Clear Gallery Data
|--------------------------------------------------------------------------
*/

export const clearGalleryData = () => {
    localStorage.removeItem(
        STORAGE_KEY
    );
};

/*
|--------------------------------------------------------------------------
| Export Storage Key
|--------------------------------------------------------------------------
*/

export const GALLERY_STORAGE_KEY =
    STORAGE_KEY;