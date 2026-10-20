export const getImageUrl = (path: string) => {
  if (!path) return "https://picsum.photos/seed/placeholder/800/600";
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  // Sesuaikan dengan folder di Hostinger
  return `https://panwebtes.katongpung.com/public/uploads/${path}`;
};

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch (e) {
    return dateString;
  }
};
