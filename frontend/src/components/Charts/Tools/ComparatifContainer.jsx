import React from 'react';
import BarFixeCategoryMonth from "./BarFixeCategoryMonth.jsx";
import BarOccasionnelleCategoryMonth from "./BarOccasionnelleCategoryMonth.jsx";
import BarRevenuCategoryMonth from "./BarRevenuCategoryMonth.jsx";

const ComparatifContainer = () => {
    return (
        <>
            <BarFixeCategoryMonth/>
            <BarOccasionnelleCategoryMonth/>
            <BarRevenuCategoryMonth/>
        </>
    );
};

export default ComparatifContainer;