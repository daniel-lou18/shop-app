type PageItemsCounterProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  text: string;
};
function PageItemsCounter({
  currentPage,
  itemsPerPage,
  totalItems,
  text,
}: PageItemsCounterProps) {
  return (
    <div className="text-xs text-muted-foreground">
      <strong>{`${currentPage === 1 ? "" : currentPage - 1}1-${
        currentPage * itemsPerPage > totalItems ? totalItems : currentPage + "0"
      }`}</strong>{" "}
      de <strong>{totalItems}</strong> {text}
    </div>
  );
}

export default PageItemsCounter;
