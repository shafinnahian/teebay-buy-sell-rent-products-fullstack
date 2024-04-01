import React, { useState } from 'react';

const Category = () => {
    const engineers = [{id: 1, name:"AAA"}, {id: 2, name:"BBB"}, {id: 3, name:"CCC"}, {id: 4, name:"DDD"}]
    const [selectedEngineers, setSelectedEngineers] = useState([]);

const handleCheckboxChange = (event, engineer) => {
    if (event.target.checked) {
      setSelectedEngineers((prevSelected) => [
        ...prevSelected,
        { userID: engineer.ID, Name: engineer.name },
      ]);
    } else {
      setSelectedEngineers((prevSelected) =>
        prevSelected.filter((e) => e.userID !== engineer.ID)
      );
    }
  };
  return (
    <div>
        {engineers.map((engineer) => {
                    return (
                    <div class="flex flex-row gap-3">
                        <span
                        onChange={(event) => handleCheckboxChange(event, engineer)}
                        >
                        {engineer.name}
                        </span>
                    </div>
                    );
                })}
    </div>
  )
}

export default Category
