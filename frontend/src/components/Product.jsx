const Product = () => (
  <div className="flex flex-col mr-6 mb-6">
    <a href="/product">
      <div className="w-48 h-48 rounded-2xl bg-gray-400 mb-1">
        Фотография продукта
      </div>
      <p>Название продукта</p>
    </a>
    <p className="font-bold">1000 ₽</p>
    <p className="text-sm font-light">Сегодня 13:41</p>
  </div>
);

export default Product;
