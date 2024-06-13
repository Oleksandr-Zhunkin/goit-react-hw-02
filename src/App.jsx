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

    if (options) {
      try {
        const totalValues = Object.values(options).reduce(
          (acc, value) => acc + value,
          0
        );

        if (totalValues > 0) {
          return options;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return defaultOptions;
  });

  const [widthStyle, setWidthStyle] = useState("0%");

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

  const positiveFeedback = Math.round(
    ((options.good + options.neutral) / totalFeedback) * 100
  );

  useEffect(() => {
    const newWidth = `${positiveFeedback}%`;
    setWidthStyle(newWidth);
  }, [positiveFeedback]);

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
              widthStyle={widthStyle}
            />
          )) || <Notification />}
        </Container>
      </Section>
    </>
  );
};

export default App;
