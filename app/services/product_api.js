const API_URL = "https://fakestoreapi.com/products";

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error.message);

    return [];
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching product:", error.message);

    return null;
  }
};