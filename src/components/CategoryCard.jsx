import "../styles/CategoryCard.css";
import { trimCategoryName } from "../utils/trimName";

export function CategoryCard({
  categoryName,
  category,
  functionHandle,
  color,
}) 

{
  return (
    <>
      <div>
        <div
          onClick={() => functionHandle(category)}
          style={{ backgroundColor: color }}
          className="categories-card flex justify-between w-60 items-center rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <p className="text-[var(--bg-color)] text-center pl-3 pr-10 py-2 cursor-pointer">
            {trimCategoryName(categoryName)} 
          </p>
          <i className="bx  bx-arrow-right "></i>
        </div>
      </div>
    </>
  );
}
