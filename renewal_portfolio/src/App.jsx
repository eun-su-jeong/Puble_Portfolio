import './styles/global.scss';
import Header from "@/components/Header/Header.jsx";
import {useState} from "react";
import Intro from "@/components/Intro/Intro.jsx";

function App() {
    const [showIntro, setShowIntro] = useState(true);

  return (
    <>
        {showIntro ?(
            <Intro onFinish={() => setShowIntro(false)} />
        ):(
           <>
               <Header />
               <main>
                   <section>
                       <h2>프로젝트</h2>
                   </section>
               </main>
               <footer>
                   <p>&copy; 2025 EUNSUJEONG. All Rights Reserved.</p>
               </footer>
           </>
        )}
    </>
  )
}

export default App
