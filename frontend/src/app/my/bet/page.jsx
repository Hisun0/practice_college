import Product from "@/components/Product";

const Page = () => {
  return (
    <main className="container my-0 mx-auto bg-white p-6 -mr-2.5">
      <div className="-mr-2.5">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Ваши лоты</h2>
        </div>
        <div className="flex flex-row flex-wrap">
          <Product/>
          <Product/>
          <Product/>
          <Product/>
        </div>
      </div>
    </main>
  );
}

export default Page;
