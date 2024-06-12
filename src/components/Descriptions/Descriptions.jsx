import s from "../Descriptions/Descriptions.module.scss";

export const Descriptions = () => {
  return (
    <div>
      <h1 className={s.title}>Sip Happens Café</h1>
      <p className={s.descr}>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
    </div>
  );
};
export default Descriptions;
