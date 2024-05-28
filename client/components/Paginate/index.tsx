import { Pagination } from "react-bootstrap";
import Link from "next/link";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { useProductsActions } from "../../hooks";

interface PaginateProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: query;
}

const Paginate: React.FC<PaginateProps> = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) => {
  const showPageLimit = 3;
  const { fetchProducts } = useProductsActions();
  const handleRoute = (pageId: number) => {
    try {
      fetchProducts( {pageId, shouldScroll: true} );
    } catch (err) {
      console.log(err);
    } finally {
      return 1;
    }
  };

  const handlePagination = (index: number) => {
    handleRoute(index);
  };

  const renderPaginationItems = () => {
    const paginationItems = [];
    let orientation = page === pages ? -1 : 1;
    const condition = orientation ? showPageLimit + page : page - showPageLimit;

    for (let i = page; i <= condition; null) {
      if (pages - i >= 0) {
        paginationItems.push(
          <Pagination.Item
            onClick={() => handlePagination(i)}
            active={i === page}
          >
            {i}
          </Pagination.Item>
        );
      }
      if (orientation) {
        i++;
      } else i--;
    }

    return paginationItems;
  };

  return pages > 1 ? (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Pagination>
        <Pagination.First onClick={() => handleRoute(1)} />
        <Pagination.Prev onClick={() => handleRoute(page - 1)} />
        {renderPaginationItems()}
        <Pagination.Next
          onClick={() => {
            page !== pages ? handleRoute(page + 1) : "";
          }}
        />
        <Pagination.Last onClick={() => handleRoute(pages)} />
      </Pagination>
    </div>
  ) : (
    <></>
  );
};

export default Paginate;
