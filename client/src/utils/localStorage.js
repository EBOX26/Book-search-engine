// Get saved book ids from localStorage
export const getSavedBookIds = () => {
  // Retrieve saved book ids from localStorage and parse JSON
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

// Save book ids to localStorage
export const saveBookIds = (bookIdArr) => {
  // If there are book ids, save them to localStorage; otherwise, remove the key
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

// Remove a specific book id from localStorage
export const removeBookId = (bookId) => {
  // Retrieve saved book ids from localStorage
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  // If there are no saved book ids, return false
  if (!savedBookIds) {
    return false;
  }

  // Filter out the specified book id and update localStorage
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
