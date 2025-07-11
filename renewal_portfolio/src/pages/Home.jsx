import MainSection from "@/components/Main/MainSection.jsx";
import AboutSection from "@/components/About/AboutSection.jsx";
import SkillSection from "@/components/Skills/SkillSection.jsx";
import ProjectSection from "@/components/Project/ProjectSection.jsx";
import Contact from "@/components/Contact/Contact.jsx";

const Home = () => {
    return(
        <main>
            <MainSection/>
            <AboutSection/>
            <SkillSection/>
            <ProjectSection/>
            <Contact/>
        </main>
    )
}
export default Home;