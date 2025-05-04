import { useState } from "react";
import Footer from "../Footer";
import LoginForm from "../LoginForm";
import HeaderNav from "../HeaderNav/index";
import Illustration from "../Illustration/index";
import Introsection from "../IntroSection/index";
import "../../../../src/App.css";
import SignUpForm from "../SignUpForm";

export default function AuthPage() {
  const [showSignup, setShowSignup] = useState(false);

  const handleSwitchToSignup = () => {
    setShowSignup(true);
  };

  const handleBackToLogin = () => {
    setShowSignup(false);
  };

  return (
    <>
      <div className="homePage min-h-screen overflow-y-auto">
        <HeaderNav />
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="col-span-1 row-span-2">
            <Introsection />
            {showSignup ? (
              <SignUpForm onBack={handleBackToLogin} />
            ) : (
              <LoginForm onSwitchToSignup={handleSwitchToSignup} />
            )}
          </div>
          <div className="col-span-1 row-span-2">
            <Illustration />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
