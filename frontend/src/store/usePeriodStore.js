import { create } from "zustand";

const usePeriodStore = create((set) => ({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),

    addMonth : (month) => {
        set({month: month});
    },
    addYear : (year) => {
        set({year: year});
    }

}));

export default usePeriodStore