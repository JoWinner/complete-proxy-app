import {ProductInfoProps } from "./ui/product-info";
import ProductInfo from "./ui/product-info";

interface ProductInfoListProps {
  title: string;
  items: ProductInfoProps[];
}



const ProductInfoList: React.FC<ProductInfoListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-2xl px-8">{title}</h3>
      <div className="grid grid-cols-1 gap-14">
        {items.map((item) => (
          <ProductInfo key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ProductInfoList;
