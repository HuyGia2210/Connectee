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
      <div className="homePage min-h-screen overflow-y-auto flex flex-col">
        <HeaderNav />
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-8 py-6">
          <div className="flex flex-col justify-center md:justify-start max-w-md mx-auto w-full">
            <Introsection />
            {showSignup ? (
              <SignUpForm onBack={handleBackToLogin} />
            ) : (
              <LoginForm onSwitchToSignup={handleSwitchToSignup} />
            )}
          </div>
          <div className="hidden md:block">
            <Illustration />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}