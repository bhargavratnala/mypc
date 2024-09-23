import '../assets/css/projects.css';

function Projects() {
  const projects = [
    {
      title: "ACM CodeSpace",
      image: "https://bhargavratnala.github.io/images/acm_codespace.png",
      link: "https://gmritchapter.acm.org/codespace/"
    },
    {
      title: "Prims Algorithm",
      image: "https://bhargavratnala.github.io/images/prims_algo.png",
      link: "https://bhargavratnala.github.io/prims-algorithm/"
    },
    {
      title: "TOC Simulator",
      image: "https://bhargavratnala.github.io/images/toc_visualizer.png",
      link: "https://bhargavratnala.github.io/TOCmodelDemo/"
    },
  ];

  return (
    <div className="projectsPage">
      <h1 className="projectsTitle">My Projects</h1>
      <div className="projectsList">
        {projects.map((project, index) => (
          <div className="projectCard" key={index}>
            <img src={project.image} alt={project.title} className="projectImage" />
            <div className="projectInfo">
              <h2 className="projectTitle">{project.title}</h2>
              <a href={project.link} className="projectLink" target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default Projects