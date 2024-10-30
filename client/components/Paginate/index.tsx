import { Pagination } from "react-bootstrap";
import Link from "next/link";
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { useProductsActions } from "../../hooks";
import { useEffect } from "react";

interface PaginateProps {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: query;
  category?: string;
}

const Paginate: React.FC<PaginateProps> = ({
  pages,
  page,
  isAdmin,
  keyword = "",
  category = "",
}) => {
  const showPageLimit = 3;
  const { fetchProducts } = useProductsActions();
  const route = useRouter();

  const handleRoute = (pageId: number) => {
    try {
      fetchProducts({
        pageId,
        keyword,
        shouldScroll: true,
        categories: category,
        isAdmin,
      });
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      page && params.set("page", String(page));
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }
  }, [page]);

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
