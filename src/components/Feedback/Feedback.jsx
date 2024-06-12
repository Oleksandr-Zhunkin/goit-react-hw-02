import s from "../Feedback/Feedback.module.scss";
import clsx from "clsx";

export const Feedback = ({ points, widthStyle }) => {
  return (
    <ul className={s.list}>
      {points.map(([feedbackType, value]) => (
        <li key={feedbackType}>
          <p
            className={clsx({ [s[feedbackType]]: feedbackType }, s.descr)}
            style={
              typeof value === "number"
                ? { width: `${15 + value}%`, maxWidth: "100%" }
                : { width: widthStyle }
            }
          >
            {feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}:{" "}
            {value}
          </p>
        </li>
      ))}
    </ul>
  );
};
export default Feedback;
