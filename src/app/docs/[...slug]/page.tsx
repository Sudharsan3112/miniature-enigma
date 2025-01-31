import { GetServerSideProps } from 'next';

interface Author {
  name: string;
}

interface Book {
  title: string;
  authors?: Author[];
}

interface DocsPageProps {
  book: Book | null;
}

export default function Docs({ book }: DocsPageProps) {
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

// Fetch book data based on ISBN in getServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string }; // Assuming slug is a string from the URL
  const book = await getBook(Number(slug));

  return {
    props: {
      book,
    },
  };
};

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
