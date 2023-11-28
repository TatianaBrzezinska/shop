import { SignUpForm, SignInForm } from "../../components";

import "./authentication.styles.scss";

export const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
