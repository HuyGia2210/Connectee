import Footer from "../Footer";
import LoginForm from "../LoginForm";
import HeaderNav from "../HeaderNav";
import Illustration from "../Illustration";
import IntroSection from "../IntroSection";
import "../../../App.css";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <HeaderNav />

      {/* Content main */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center px-8 py-12 flex-grow gap-10">
        {/* Left side: Intro + Form */}
        <div className="flex flex-col space-y-8 max-w-xl">
          <IntroSection />
          <LoginForm />
        </div>

        {/* Right side: Illustration */}
        <Illustration />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
