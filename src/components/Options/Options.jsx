export const Options = ({ options, updateFeedback, total }) => {
  return (
    <ul>
      {options.map((item) => (
        <li key={item}>
          <button onClick={() => updateFeedback(item)} type="button">
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        </li>
      ))}
    </ul>
  );
};
export default Options;
