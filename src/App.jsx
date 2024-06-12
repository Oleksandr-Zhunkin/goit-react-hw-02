import { useEffect, useState } from "react";
import "./App.css";
import Section from "./components/Section/Section";
import Container from "./components/Container/Container";
import Descriptions from "./components/Descriptions/Descriptions";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";

const defaultOptions = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [options, setOptions] = useState(() => {
    const options = JSON.parse(window.localStorage.getItem("key_statistics"));

    const totalValues = Object.values(options).reduce(
      (acc, value) => acc + value,
      0
    );
    if (totalValues > 0) {
      return options;
    }
    return defaultOptions;
  });

  useEffect(() => {
    window.localStorage.setItem("key_statistics", JSON.stringify(options));
  }, [options]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType !== "reset") {
      setOptions({ ...options, [feedbackType]: options[feedbackType] + 1 });
    } else {
      setOptions(defaultOptions);
    }
  };

  const totalFeedback = Object.values(options).reduce(
    (acc, value) => acc + value,
    0
  );

  const positiveFeedback =
    100 - Math.round((options.bad / totalFeedback) * 100);

  return (
    <>
      <Section>
        <Container>
          <Descriptions />
          <Options
            options={
              totalFeedback === 0
                ? Object.keys(options)
                : [...Object.keys(options), "reset"]
            }
            updateFeedback={updateFeedback}
          />
          {(totalFeedback > 0 && (
            <Feedback
              points={[
                ...Object.entries(options),
                ["total", totalFeedback],
                ["positive", positiveFeedback + "%"],
              ]}
            />
          )) || <Notification />}
        </Container>
      </Section>
    </>
  );
};

export default App;
