import s from "../Options/Options.module.scss";

export const Options = ({ options, updateFeedback }) => {
  return (
    <ul className={s.list}>
      {options.map((item) => (
        <li key={item}>
          <button
            className={s.btn}
            onClick={() => updateFeedback(item)}
            type="button"
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default Options;
