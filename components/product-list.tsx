import ProductCard from "@/components/ui/product-card";
import {  Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import { Spinner } from "./ui/spinner";

interface ProductListProps {
  title: string;
  items: Product[];
  loading: boolean; 
}

const ProductList: React.FC<ProductListProps> = ({ title, items, loading }) => {
  return (
    <div className="space-y-4 my-12">
      <h3 className="font-unbounded-style font-semibold text-2xl mb-8">{title}</h3>
      {loading ? <Spinner /> : items.length === 0 ? <NoResults /> : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      )}
      
    </div>
  );
};

export default ProductList;
