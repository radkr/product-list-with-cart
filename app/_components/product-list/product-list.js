import dbConnect from "@/app/_lib/database";
import Product from "@/app/_models/product";

export default async function ProductList() {
  await dbConnect();
  const products = await Product.find();
  console.log("Products: ", products);
  return (
    <>
      <h1>Desserts</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
}
