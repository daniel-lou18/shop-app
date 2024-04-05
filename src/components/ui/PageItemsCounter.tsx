type PageItemsCounterProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};
function PageItemsCounter({
  currentPage,
  itemsPerPage,
  totalItems,
}: PageItemsCounterProps) {
  return (
    <div className="text-xs text-muted-foreground">
      <strong>{`${currentPage === 1 ? "" : currentPage - 1}1-${
        currentPage * itemsPerPage > totalItems ? totalItems : currentPage + "0"
      }`}</strong>{" "}
      de <strong>{totalItems}</strong> produits
    </div>
  );
}

export default PageItemsCounter;
