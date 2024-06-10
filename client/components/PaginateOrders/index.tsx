import { Pagination } from "react-bootstrap";
import Link from "next/link";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { useOrderActions, useProductsActions } from "../../hooks";

interface PaginateOrdersProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
}

const PaginateOrders: React.FC<PaginateOrdersProps> = ({
  pages,
  page,
  isAdmin = false,
}) => {
  const showPageLimit = 3;
  const { fetchOrders } = useOrderActions();

  const handleRoute = (pageId: number) => {
    
    try {
    
      fetchOrders(pageId.toString());
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
    const orientation = page === pages ? -1 : 1;
    const condition =
      orientation === 1 ? showPageLimit + page : page - showPageLimit;

    for (
      let i = page;
      orientation === 1 ? i <= condition : i >= condition;
      i += orientation
    ) {
      if (i > 0 && i <= pages) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            onClick={() => handlePagination(i)}
            active={i === page}
          >
            {i}
          </Pagination.Item>
        );
      }
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

export default PaginateOrders;
