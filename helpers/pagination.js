// untuk tampilan data di set sampai 8 dan page dimulai dari 1

const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
  };
  
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: response } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, response, totalPages, currentPage };
  };
  
  module.exports = { getPagination, getPagingData };
  