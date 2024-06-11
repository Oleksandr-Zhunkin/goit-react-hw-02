import { useState } from "react";
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
  const [options, setOptions] = useState(defaultOptions);

  const updateFeedback = (feedbackType) => {
    setOptions({ ...options, [feedbackType]: options[feedbackType] + 1 });
  };

  const totalFeedback = Object.values(options).reduce(
    (acc, value) => acc + value,
    0
  );

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
            <Feedback points={Object.entries(options)} />
          )) || <Notification />}
        </Container>
      </Section>
    </>
  );
};

export default App;
