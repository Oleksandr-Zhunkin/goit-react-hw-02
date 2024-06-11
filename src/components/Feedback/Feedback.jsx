export const Feedback = ({ points }) => {
  return (
    <ul>
      {points.map(([feedbackType, value]) => (
        <li key={feedbackType}>
          <p>
            {feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}:{" "}
            {value}
          </p>
        </li>
      ))}
    </ul>
  );
};
export default Feedback;
