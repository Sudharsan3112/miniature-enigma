

export default function Productreview({params}: { params: {productid: string,reviewid:string}}) {
  return (
    <div>
      
      <p>This is the about Productreview of product id: {params.productid} </p>
      <h3>Review of product id: {params.productid} is {params.reviewid} </h3>
    </div>
  );
}