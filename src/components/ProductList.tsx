import axios from "axios";
import { Product } from "../entities";
import { useQuery } from "react-query";

const ProductList = () => {
  const {
    data: products,
    error,
    isLoading,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>("/products");
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (products!.length === 0) return <p>No products available.</p>;

  return (
    <ul>
      {products!.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

export default ProductList;
