import { useMemo, useContext, memo } from "react";
import { BiLike, BiX } from "react-icons/bi";
import { Employee } from "@/interfaces";

import { setHappinessEmoji } from "@/utilities";
import { happyEmoji, sadEmoji, neutralEmoji } from "@/assets";

import "./style.scss";

import EmployeeContext from "@/context/EmployeesContext";
import { Box } from "@chakra-ui/react";

const Card = ({
  isCardModal,
  employee,
}: {
  isCardModal: boolean;
  employee: Employee;
}) => {
  const { changeToFavorite, addFavoriteEmployee, removeFromFavorite } =
    useContext(EmployeeContext);

  const emoji = useMemo(() => {
    const listEmojiImage = {
      happy: happyEmoji,
      neutral: neutralEmoji,
      sad: sadEmoji,
    };

    const happiness = setHappinessEmoji(employee.levelOfHappiness);

    return happiness && listEmojiImage[happiness];
  }, [employee, setHappinessEmoji]);

  return (
    <Box
      className={`card-container ${isCardModal ? "is-modal" : ""}`}
      onClick={() => {
        if (isCardModal) {
          removeFromFavorite(employee.id);
        } else {
          addFavoriteEmployee(employee);
          changeToFavorite(employee.id);
        }
      }}
    >
      <div className="card-body">
        <div className="card-info">
          <div className="card-info-title emoji">
            <span>Happiness:</span>
            <img src={emoji} alt="Emoji" />
          </div>
          <div className="card-info-title">
            <span>Name:</span>
            <span>{employee.name}</span>
          </div>
          <div className="card-info-title">
            <span>Company:</span>
            <span>{employee.company}</span>
          </div>
          <div className="card-info-title">
            <span>Category:</span>
            <span>{employee.category}</span>
          </div>
        </div>
        <div className="card-img">
          <img
            src={`/images/${employee["company-image"]}`}
            alt={employee["company-image"]}
          />
        </div>
      </div>

      {employee.isFavorite ? (
        isCardModal ? (
          <button className={`card-actions remove`}>
            <BiX />
          </button>
        ) : (
          <button className={"card-actions added"}>
            <BiLike />
          </button>
        )
      ) : (
        <button className={`card-actions ${isCardModal ? "remove" : ""}`}>
          {isCardModal ? <BiX /> : <BiLike />}
        </button>
      )}
    </Box>
  );
};

export default memo(Card);
