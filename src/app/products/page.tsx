export default function ProductsList() {
    const array = [1, 2, 3]; // Example array
    return (
      <div>
        <h1>Products list page</h1>
        <ul>
          {array.map((item, index) => (
            <li key={index}>
              <h2>Product {item}</h2>
            </li>
          ))}
        </ul>
      </div>
    );
  }