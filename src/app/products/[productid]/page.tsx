interface Params {
  productid: string;
}

export default function Product({params}: { params: Params }) {
    return (
      <div>
        
        <p>This is the about product {params.productid}</p>
      </div>
    );
  }