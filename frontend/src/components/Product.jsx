const Product = ({ product }) => (
  <div className="flex flex-col mr-6 mb-6">
    <a href={`/product/${product.id}`}>
      <div className="w-48 h-48 rounded-2xl bg-gray-400 mb-1">
        Фотография продукта
      </div>
      <p>{product.name}</p>
    </a>
    <p className="font-bold">{product.price} ₽</p>
    <p className="text-sm font-light">{product.created_at}</p>
  </div>
);

export default Product;
