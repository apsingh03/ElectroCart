import { useState, useCallback } from "react";
import { clientShowFilteredProductsAsync } from "../../Redux/ClientSlices/clientProductSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const useProductsFilterFunctions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    brand: [],
    color: [],
    size: [],
    price: { gte: null, lte: null },
  });

  // console.log("selectedFilters - ", selectedFilters);

  const [productsIsFilteringLoader, setproductsIsFilteringLoader] =
    useState(false);

  const handleFilterChange = async (updatedFilters) => {
    // console.log("handleFilterChange - ", updatedFilters);
    setSelectedFilters(updatedFilters);
    updateURL(updatedFilters);

    setproductsIsFilteringLoader(true);

    await dispatch(
      clientShowFilteredProductsAsync({
        filters: updatedFilters,
      })
    );

    setproductsIsFilteringLoader(false);
  };

  const removeFilter = (filterType, filterValue) => {
    const updatedFilters = { ...selectedFilters };
    if (filterType === "price") {
      updatedFilters.price[filterValue] = null;
    } else {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (value) => value !== filterValue
      );
    }

    handleFilterChange(updatedFilters);
  };
  // this is wprking
  const handleCheckboxChange = (e, filterType, filterValue) => {
    const updatedFilters = { ...selectedFilters };
    // console.log(
    //   " handleCheckboxChange --> ",
    //   filterType,
    //   filterValue,
    //   updatedFilters
    // );
    if (e.target.checked) {
      updatedFilters[filterType] = [...updatedFilters[filterType], filterValue];
    } else {
      updatedFilters[filterType] = updatedFilters[filterType].filter(
        (value) => value !== filterValue
      );
    }
    handleFilterChange(updatedFilters);
  };

  const debouncedHandleFilterChange = useCallback(
    debounce(handleFilterChange, 300),
    []
  );

  const handlePriceChange = (e, priceType) => {
    const updatedFilters = { ...selectedFilters };
    updatedFilters.price[priceType] = e.target.value;

    // handleFilterChange(updatedFilters);
    // Debounce the filter change handling
    debouncedHandleFilterChange(updatedFilters);
  };

  const handleSizeChange = (e, sizeType) => {
    // console.log("sizeType - ", sizeType);
    e.preventDefault();

    const updatedFilters = { ...selectedFilters };
    if (!updatedFilters.size.includes(sizeType)) {
      updatedFilters.size.push(sizeType);
    } else {
      updatedFilters.size = updatedFilters.size.filter(
        (size) => size !== sizeType
      );
    }

    handleFilterChange(updatedFilters);
  };

  const updateURL = (filters) => {
    // console.log("filters - ", filters);
    const searchParams = new URLSearchParams();

    filters.category.forEach((value) =>
      searchParams.append("filter.category", value)
    );
    filters.brand.forEach((value) =>
      searchParams.append("filter.brand", value)
    );
    filters.color.forEach((value) =>
      searchParams.append("filter.color", value)
    );

    filters.size.forEach((value) => searchParams.append("filter.size", value));
    if (filters.price.gte)
      searchParams.set("filter.price.gte", filters.price.gte);
    if (filters.price.lte)
      searchParams.set("filter.price.lte", filters.price.lte);

    // console.log("searchParams - ", searchParams.toString());
    navigate({ search: searchParams.toString() });
  };

  return {
    selectedFilters,
    setSelectedFilters,
    productsIsFilteringLoader,
    setproductsIsFilteringLoader,
    handleFilterChange,
    removeFilter,
    handleCheckboxChange,
    handlePriceChange,
    handleSizeChange,
    updateURL,
  };
};
