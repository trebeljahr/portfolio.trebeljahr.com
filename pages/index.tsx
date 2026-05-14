import { AboutClients } from "components/about/AboutClients";
import { AboutMeBio } from "components/about/AboutMeBio";
import { ContactSection } from "components/contact";
import { ToastContainer } from "react-toastify";
import PagesMetaHead from "../components/PagesMetaHead";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import AppBanner from "../components/shared/AppBanner";

export default function Home() {
  return (
    <div className="container mx-auto">
      <PagesMetaHead
        title="Rico Trebeljahr - Full-Stack Engineer Portfolio"
        description="Explore Rico Trebeljahr's full-stack engineering portfolio: web games, 3D demos, production systems, writing, and contact details."
        image="/images/profile.jpg"
        imageAlt="Portrait of Rico Trebeljahr"
      />
      <AppBanner />

      <AboutMeBio />

      <ProjectsGrid />

      <AboutClients />

      <ContactSection />

      <ToastContainer />
    </div>
  );
}
