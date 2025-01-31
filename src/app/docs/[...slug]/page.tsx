export default async function Docs({ params }: { params: { slug: number } }) {
    const book = await getBook(params.slug);
  
    return (
      <div>
        {book ? (
          <div>
            <h2>{book.title}</h2>
            <p><strong>Authors:</strong> {book.authors?.map((author: any) => author.name).join(", ")}</p>
            {book.cover && <img src={book.cover.large} alt={book.title} />}
          </div>
        ) : (
          <p>Book not found.</p>
        )}
      </div>
    );
  }
  
  // Function to fetch book details
  async function getBook(isbn: number) {
    try {
      const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
      const data = await response.json();
      return data[`ISBN:${isbn}`] || null;
    } catch (error) {
      console.error("Error fetching book:", error);
      return null;
    }
  }
  