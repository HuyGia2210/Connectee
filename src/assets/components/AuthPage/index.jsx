import Footer from "../Footer";
import LoginForm from "../LoginForm";
import HeaderNav from "./../HeaderNav/index";
import Illustration from "./../Illustration/index";
import Introsection from "./../IntroSection/index";
import "../../../App.css";

export default function AuthPage() {
  return (
    <>
      <div className="homePage">
        <HeaderNav />
        <div className="grid grid-cols-2 grid-rows-2">
          <div className="col-span-1 row-span-2">
            <Introsection />
            <LoginForm />
          </div>
          <div className="col-span-1 row-span-2 border">
            <Illustration />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
