import React, { useState } from "react";
import BoughtList from "./BoughtList";
import SoldList from "./SoldList";
import BorrowedList from "./BorrowedList";
import LentList from "./LentList";

const ProductType = () => {
  const [toggleState, setToggleState] = useState(1);
  const changeTab = (tabs) => {
    setToggleState(tabs);
  };
  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered fixed right-0 left-0 text-[90px] font-bold bg-slate-800 py-2">
        <a
          role="tab"
          className={`tab ${toggleState === 1 && "tab-active"}`}
          onClick={() => {
            changeTab(1);
          }}
        >
          Bought
        </a>
        <a
          role="tab"
          className={`tab ${toggleState === 2 && "tab-active"}`}
          onClick={() => {
            changeTab(2);
          }}
        >
          Sold
        </a>
        <a
          role="tab"
          className={`tab ${toggleState === 3 && "tab-active"}`}
          onClick={() => {
            changeTab(3);
          }}
        >
          Borrowed
        </a>
        <a
          role="tab"
          className={`tab ${toggleState === 4 && "tab-active"}`}
          onClick={() => {
            changeTab(4);
          }}
        >
          Lent
        </a>
      </div>

      {toggleState === 1 ? (
        <BoughtList />
      ) : toggleState === 2 ? (
        <SoldList />
      ) : toggleState === 3 ? (
        <BorrowedList />
      ) : (
        <LentList />
      )}
    </div>
  );
};

export default ProductType;
