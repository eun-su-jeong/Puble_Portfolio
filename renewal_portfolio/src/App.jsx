import './styles/global.scss';
import Intro from "@/components/Intro/Intro.jsx";
import Header from "@/components/Header/Header.jsx";
import Home from "@/pages/Home.jsx";
import {useState} from "react";
import Footer from "@/components/Footer/Footer.jsx";

function App() {
    const [showIntro, setShowIntro] = useState(true);

  return (
    <>
        {showIntro ?(
            <Intro onFinish={() => setShowIntro(false)} />
        ):(
           <div className={'layout'}>
               <Header />
               <Home/>
               <Footer/>
           </div>
        )}
    </>
  )
}

export default App
