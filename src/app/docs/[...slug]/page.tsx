interface Author {
  name: string;
}

interface Book {
  title: string;
  authors?: Author[];
}

export default async function Docs({ params }: { params: { slug: string } }) {
  // Fetch book details based on ISBN (slug)
  const book = await getBook(Number(params.slug));

  return (
    <div>
      {book ? (
        <div>
          <h2>{book.title}</h2>
          <p><strong>Authors:</strong> {book.authors?.map((author) => author.name).join(", ")}</p>
        </div>
      ) : (
        <p>Book not found.</p>
      )}
    </div>
  );
}

// Function to fetch book details
async function getBook(isbn: number): Promise<Book | null> {
  try {
    const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`);
    const data = await response.json();
    return data[`ISBN:${isbn}`] || null;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}
